# VirtualBNB — Agente AI WhatsApp

Scaffold funzionante per un agente WhatsApp con due flussi:
- **Host/proprietario**: qualificazione conversazionale, cattura lead, ti notifica
- **Ospite**: risponde solo sulla base della scheda del suo appartamento (wifi, check-in, regole, consigli)

Instradamento tramite pulsanti WhatsApp al primo contatto — deterministico, non indovinato dall'AI.

---

## 1. Setup Meta WhatsApp Business (Cloud API)

1. Vai su [developers.facebook.com](https://developers.facebook.com) → crea un'app di tipo **Business**
2. Nell'app, aggiungi il prodotto **WhatsApp**
3. In **API Setup** trovi:
   - un **numero di test** (gratuito, per iniziare — poi si passa al numero verificato reale)
   - il **Temporary Access Token** (dura 24h — per produzione genera un **Permanent Token** da System User in Business Settings)
   - il **Phone Number ID**
4. Copia questi valori in `.env` (vedi `.env.example`)
5. `WHATSAPP_VERIFY_TOKEN` te lo inventi tu — una stringa a caso, serve solo per la handshake del webhook

**Nota business verification**: per usare un numero reale (non quello di test) serve verificare il Business su Meta — può richiedere qualche giorno. Per iniziare a testare puoi usare subito il numero di test fornito da Meta.

---

## 2. Setup Supabase

1. Crea un progetto su [supabase.com](https://supabase.com)
2. SQL Editor → incolla ed esegui `supabase/schema.sql`
3. Settings → API → copia `SUPABASE_URL` e la `service_role key` (non la `anon key` — il webhook gira server-side)
4. Popola manualmente la tabella `properties` con i tuoi 4 immobili (wifi, istruzioni check-in, regole, reservation_codes)

---

## 3. Deploy su Vercel

```bash
npm install
vercel deploy
```

Imposta le env var di `.env.example` in Vercel → Project Settings → Environment Variables.

Dopo il deploy, il webhook sarà su:
```
https://<tuo-dominio>.vercel.app/api/whatsapp/webhook
```

## 4. Collega il webhook a Meta

In Meta App Dashboard → WhatsApp → Configuration:
- **Callback URL**: l'URL sopra
- **Verify Token**: lo stesso valore di `WHATSAPP_VERIFY_TOKEN`
- Clicca **Verify and Save**
- In **Webhook fields**, iscriviti a `messages`

---

## 5. Test

Scrivi al numero di test da WhatsApp. Dovresti ricevere il menu con i due pulsanti.

---

## Cosa NON è ancora incluso (v1 scaffold)

- Verifica della firma del webhook (`X-Hub-Signature-256`) — da aggiungere prima di andare in produzione seria
- Matching automatico ospite→prenotazione da booking platform (oggi è manuale via `reservation_codes`)
- Reset dell'`human_handoff` — oggi va tolto manualmente su Supabase quando hai gestito la conversazione
- Rate limiting / anti-abuso
- Dashboard per vedere lead e conversazioni (oggi si guardano su Supabase Table Editor)

## Struttura

```
api/whatsapp/webhook.js   → entry point pubblico (Vercel function)
lib/router.js             → gestione sessione + instradamento
lib/whatsapp.js           → wrapper WhatsApp Cloud API
lib/aiService.js          → wrapper AI (Claude by default, swappabile)
lib/notify.js             → notifiche a te
lib/agents/guestAgent.js  → flusso ospite
lib/agents/leadAgent.js   → flusso host/lead
supabase/schema.sql       → schema DB
```
