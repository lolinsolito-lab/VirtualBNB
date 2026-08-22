STRUTTURA DEL PROGETTO — VirtualBNB
=====================================

Questo è il build di produzione del sito, riformattato per essere leggibile
e modificabile. NON è il progetto sorgente React originale (quello con i
singoli file .jsx per componente) — quello esisteva solo sul PC dove è
stato creato e non era incluso nello zip caricato.

COSA TROVI QUI:
- index.html         -> pagina principale, meta tag SEO, config Tailwind
- assets/index.js     -> tutto il codice JS (React + librerie + il tuo codice app)
                         formattato con indentazione leggibile (16.414 righe)
- assets/index.css    -> tutto il CSS compilato, formattato (1.398 righe)
- robots.txt, sitemap.xml, favicon.svg -> invariati

DOVE TROVARE IL TUO CODICE (non le librerie):
Il file assets/index.js contiene PRIMA React/ReactDOM/librerie (minificate
e irreversibilmente prive dei nomi originali delle variabili), POI il
codice della tua app. Il tuo codice/testi specifici iniziano circa alla
riga 13.500 (cerca "VirtualBNB" per orientarti).

LIMITI IMPORTANTI:
- I nomi di variabili/funzioni della TUA app sono anch'essi minificati
  (es. una funzione che gestiva il form contatti potrebbe chiamarsi "Ic"
  invece di "ContactForm"). La formattazione rende il codice leggibile
  riga per riga, ma NON restituisce i nomi originali — quelli sono persi
  perché il file non includeva una source map.
- Se hai ancora da qualche parte sul PC la cartella del progetto sorgente
  originale (quella con file .jsx separati, package.json, vite.config.js),
  usare QUELLA con Antigravity sarà molto più semplice ed efficace che
  lavorare su questo build ricostruito.

Se in futuro vuoi rigenerare un build pulito da questa cartella, ti serve
comunque ricostruire un progetto Vite+React da zero (npm create vite@latest)
e reincollarci dentro i pezzi di codice — questa cartella da sola non è
un progetto Vite eseguibile con "npm run dev".
