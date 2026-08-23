$url = "https://sjqphxmbwaouqyccxzfa.supabase.co"
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcXBoeG1id2FvdXF5Y2N4emZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MTg0NDAsImV4cCI6MjEwMjk5NDQ0MH0.yrFLilS_4BDPhsa0PPW4T3hvFkVY4fwSg-oJJDiHwFU"
$serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcXBoeG1id2FvdXF5Y2N4emZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzQxODQ0MCwiZXhwIjoyMTAyOTk0NDQwfQ.hVAh2RVzhYekWMFqifziMveiZ5kbS5A8cO49q_k7fsw"

function Create-User-Admin($email, $password) {
    $body = @{ email = $email; password = $password; email_confirm = $true } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "$url/auth/v1/admin/users" -Method Post -Headers @{
        "apikey" = $serviceKey
        "Authorization" = "Bearer $serviceKey"
        "Content-Type" = "application/json"
    } -Body $body
    return $response
}

function Login-User($email, $password) {
    $body = @{ email = $email; password = $password } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "$url/auth/v1/token?grant_type=password" -Method Post -Headers @{
        "apikey" = $anonKey
        "Content-Type" = "application/json"
    } -Body $body
    return $response
}

function Insert-Property($ownerId, $title) {
    $body = @{ owner_id = $ownerId; title = $title; address = "Via Test"; type = "appartamento" } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "$url/rest/v1/properties" -Method Post -Headers @{
        "apikey" = $serviceKey
        "Authorization" = "Bearer $serviceKey"
        "Content-Type" = "application/json"
        "Prefer" = "return=representation"
    } -Body $body
    return $response
}

# 1. Crea account reali tramite Supabase Auth API
Write-Host "Creazione Account A..."
try { $userA = Create-User-Admin "p0test-a@virtualbnb-test.internal" "TestPassword123!" } catch { Write-Host "Utente A esiste gia" }
Write-Host "Creazione Account B..."
try { $userB = Create-User-Admin "p0test-b@virtualbnb-test.internal" "TestPassword123!" } catch { Write-Host "Utente B esiste gia" }

# Login for real JWTs
$loginA = Login-User "p0test-a@virtualbnb-test.internal" "TestPassword123!"
$tokenA = $loginA.access_token
$uidA = $loginA.user.id

$loginB = Login-User "p0test-b@virtualbnb-test.internal" "TestPassword123!"
$tokenB = $loginB.access_token
$uidB = $loginB.user.id

# Attendi 2 secondi per permettere al trigger di Supabase di creare le righe in profiles
Start-Sleep -Seconds 2

# Assicuriamoci che i ruoli siano 'owner' aggiornandoli col service_role (per sicurezza)
$updateRoleBody = @{ role = "owner"; full_name = "Test User" } | ConvertTo-Json
Invoke-RestMethod -Uri "$url/rest/v1/profiles?id=eq.$uidA" -Method Patch -Headers @{
    "apikey" = $serviceKey
    "Authorization" = "Bearer $serviceKey"
    "Content-Type" = "application/json"
} -Body $updateRoleBody | Out-Null

Invoke-RestMethod -Uri "$url/rest/v1/profiles?id=eq.$uidB" -Method Patch -Headers @{
    "apikey" = $serviceKey
    "Authorization" = "Bearer $serviceKey"
    "Content-Type" = "application/json"
} -Body $updateRoleBody | Out-Null


# 2. Inserisci due proprieta' di test
Write-Host "Inserimento Proprietà A e B..."
$propA = Insert-Property $uidA "__P0TEST__ Loft Alpha"
$propB = Insert-Property $uidB "__P0TEST__ Loft Beta"

Write-Host "`n================================================"
Write-Host " TEST 1: QUERY DIRETTA (Cross-Account Reading)"
Write-Host "================================================"
# Utente A tenta di leggere tutti i profili
$profilesA = Invoke-RestMethod -Uri "$url/rest/v1/profiles?select=*" -Method Get -Headers @{
    "apikey" = $anonKey
    "Authorization" = "Bearer $tokenA"
}
Write-Host "User A legge tabella 'profiles': trovati $($profilesA.Length) record (atteso: 1). ID trovato: $($profilesA[0].id) (Uguale a UID A: $($profilesA[0].id -eq $uidA))"

# Utente A tenta di leggere tutte le proprieta'
$propsA = Invoke-RestMethod -Uri "$url/rest/v1/properties?select=*" -Method Get -Headers @{
    "apikey" = $anonKey
    "Authorization" = "Bearer $tokenA"
}
Write-Host "User A legge tabella 'properties': trovate $($propsA.Length) righe (atteso: 1). Titolo: $($propsA[0].title)"


Write-Host "`n================================================"
Write-Host " TEST 2: MANIPOLAZIONE ROUTE (Query by ID esatto)"
Write-Host "================================================"
$propB_Id = $propB[0].id
$propsB_by_A = Invoke-RestMethod -Uri "$url/rest/v1/properties?id=eq.$propB_Id" -Method Get -Headers @{
    "apikey" = $anonKey
    "Authorization" = "Bearer $tokenA"
}
Write-Host "User A tenta di leggere esplicitamente ID proprieta' B ($propB_Id)... Risultato: $($propsB_by_A.Length) righe trovate (atteso: 0)"


Write-Host "`n================================================"
Write-Host " TEST 3: ARIA OWNER CHAT (Tool bypass attempt)"
Write-Host "================================================"
# Tentiamo di chiamare l'API chat dell'Owner con il token di User A, chiedendo i dati di B
$chatBody = @{
    messages = @(
        @{ role = "user"; content = "Quali sono i dettagli dell'immobile __P0TEST__ Loft Beta che appartiene a un altro utente?" }
    )
} | ConvertTo-Json -Depth 10

try {
    $chatRes = Invoke-RestMethod -Uri "https://virtual-bnb.vercel.app/api/ownerChat" -Method Post -Headers @{
        "Authorization" = "Bearer $tokenA"
        "Content-Type" = "application/json"
    } -Body $chatBody
    Write-Host "Risposta ARIA:"
    Write-Host $chatRes.content
} catch {
    Write-Host "Errore chiamata ARIA: $_"
}

Write-Host "`nTest Completato. Puoi ora lanciare 02-test-data-cleanup.sql"
