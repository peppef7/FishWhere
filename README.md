# Dove Pescare

Web app per iPhone che ti dice dove e quando andare a pescare in apnea. Scegli un punto della costa sulla mappa satellitare e vedi, per i prossimi 7 giorni e ora per ora, un voto da 0 a 100 con il motivo.

## Cosa fa
- **Mappa satellitare** (Esri World Imagery) con 8 spot già pronti, il tasto **La mia posizione** o un tocco su qualsiasi punto della costa.
- **Griglia 7 giorni × ore di luce** colorata dal voto e le **3 finestre migliori**.
- **Perché quel voto**: mare, visibilità, specie, vento, luce, periodi solunari, marea e pressione, ognuno con il suo contributo.
- **Condizioni**: temperatura dell'acqua (con la muta consigliata), onda e periodo, vento con il nome locale (Maestrale, Libeccio…), visibilità stimata, alba e tramonto.
- **Marea e periodi solunari** del giorno in un grafico.
- **Specie**: probabilità d'incontro per spigola, sarago, orata, dentice, cernia, ricciola, leccia amia, occhiata e cefalo, con profondità tipica e misura minima.
- Funziona anche **offline**: mostra le ultime previsioni scaricate per quello spot.

## Come si calcola il voto
Somma pesata di otto fattori: mare 22%, visibilità 18%, specie 17%, vento 15%, luce 10%, solunare 8%, marea 5%, pressione 5%. Il peggiore tra mare, vento e visibilità riduce il totale fino al 45%.
- L'**esposizione** dello spot si calcola dalla linea di costa (16 direzioni fino a 8 km): un vento o un'onda da una direzione ridossata pesa poco.
- La **visibilità** si stima da mareggiate e piogge delle 48 ore precedenti.
- Sole e luna sono calcolati sul telefono (alba, tramonto, fase, transiti).
- Con onda effettiva oltre 1,5 m, vento oltre 40 km/h o raffiche oltre 55 km/h il voto resta sotto 15. Di notte è 0: la pesca subacquea notturna è vietata.

Dati: [Open-Meteo](https://open-meteo.com) (meteo e mare, gratuito, senza chiave), Esri (satellite), Natural Earth (costa).

## Installarla sull'iPhone
1. Pubblica il sito con GitHub Pages: **Settings › Pages › Deploy from a branch**, branch `main`, cartella `/ (root)`.
2. Apri l'indirizzo con **Safari**.
3. Tocca **Condividi › Aggiungi alla schermata Home**.

## Attenzione
Le stime sono indicative. Prima di entrare in acqua controlla aree marine protette e ordinanze locali, usa sempre la boa segnasub e non pescare mai da solo.

## File
- `index.html`: l'app completa (una sola pagina, generata)
- `manifest.webmanifest`, `sw.js`, `icons/`: installazione sulla Home e funzionamento offline
- `sorgente/`: il sorgente (`app.html`), lo script che genera `index.html` (`build.js`) e quello che estrae la linea di costa (`coast.js`). Per rigenerare: `npm i leaflet@1.9.4 world-atlas@2 topojson-client@3`, poi `node coast.js && node build.js`: la nuova app è in `dist/index.html`, da copiare nella radice.
