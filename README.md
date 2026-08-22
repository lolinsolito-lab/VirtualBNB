# VirtualBNB

**Property Management d'Eccellenza Milano**

Sito web ufficiale di [VirtualBNB](https://www.virtualbnb.it) — il sistema AI-driven per la gestione di affitti brevi a Milano, fondato da Michael Jara (Insolito Experiences).

## Stack Tecnologico

- **React 18** + **Vite** — build ultra-veloce
- **Framer Motion** — animazioni fluide
- **Tailwind CSS** — design system dark luxury
- **Google Fonts** — Cormorant Garamond, DM Sans, DM Mono
- **Make.com** webhook — form analisi gratuita
- **Vercel** — hosting

## Sviluppo Locale

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build di produzione
npm run build

# Anteprima del build
npm run preview
```

## Struttura del Progetto

```
src/
├── App.jsx                    # App root
├── main.jsx                   # Entry point
├── index.css                  # Design system CSS
└── components/
    ├── Navbar.jsx             # Navigazione fissa
    ├── SplashScreen.jsx       # Splash screen animato
    ├── sections/
    │   ├── Hero.jsx           # Hero section
    │   ├── ComeFunziona.jsx   # Il Metodo VirtualBNB (4 step)
    │   ├── Servizi.jsx        # 6 differenziatori + Guaranteed Yield
    │   ├── Risultati.jsx      # Case study reali
    │   ├── Prezzi.jsx         # 3 piani (Essenziale, Smart, Premium)
    │   ├── Confronto.jsx      # Confronto con mercato tradizionale
    │   ├── Corporate.jsx      # Network Executive B2B
    │   ├── OwnerPortal.jsx    # Dashboard interattiva simulata
    │   ├── AnalisiForm.jsx    # Form analisi gratuita (Make.com)
    │   ├── Vision.jsx         # Michael Jara + principi fondatori
    │   └── Contatti.jsx       # Contatti
    └── ui/
        ├── Footer.jsx         # Footer + modal Privacy/Termini/Cookie
        └── CookieBanner.jsx   # Banner GDPR
```

## Deploy su Vercel

1. Push su GitHub
2. Vai su [vercel.com](https://vercel.com) → Import Project
3. Seleziona il repository
4. Vercel rileverà automaticamente Vite
5. Click "Deploy"

---

© 2026 VirtualBNB · Insolito Experiences · P.IVA IT14379200968 · Milano, Italia
