# Napoli Food Racing by Morè: la landing

Questo file è per Claude (e per chiunque lavori sulla repo). Leggilo prima di toccare qualcosa.
Chi chiede le modifiche è **Buzz** (BUZZ Studio): rispondi in italiano, dagli del tu, frasi brevi.

## Contesto in tre righe
- Sito: https://www.napolifoodracing.it (Aruba). Instagram: @napoli_food_racing.
- È la landing dell'area food del Napoli Racing Show, 27·28·29 novembre 2026, ore 9–24, Tennis Club Napoli sul Lungomare.
- Prodotto e fatti confermati: `PRODUCT.md`. Sistema visivo: `DESIGN.md`. Regole complete del brand: skill `napoli-food-racing` di Buzz.

## Come è fatta la repo
- `sorgente/template.html`: **l'unico file da modificare** per testi, stile e animazioni (HTML, CSS e JS in un file solo).
- `sorgente/parts.json`: i disegni vettoriali (mappe, illustrazioni, timbri). I segnaposto `<!--SVG:nome-->` nel template vengono sostituiti da qui.
- `sorgente/build.py`: genera `sito/index.html`. Lancialo dopo ogni modifica: `python3 sorgente/build.py`.
- `sito/`: quello che va online (non modificare `sito/index.html` a mano, viene rigenerato).
- `strumenti/controllo.js`: controllo automatico con WebKit (Safari) e Chromium, screenshot per sezione.
- `.github/workflows/`: `deploy-aruba.yml` (pubblica), `controllo.yml` (controlla).

## Il giro di lavoro
1. Lavora su un ramo, mai direttamente su `main` (per esempio `git checkout -b rifinitura`).
2. Modifica `sorgente/template.html`, poi `python3 sorgente/build.py`.
3. Controlla in locale: `node strumenti/controllo.js` (report in `report/README.md`), oppure guarda tu le sezioni con Playwright a 1440×900 e su iPhone 390×664.
4. `git push` del ramo: parte da solo
   - il **controllo Safari e Chrome**, che pubblica screenshot e report nel ramo `controlli` (https://github.com/Francesco-05/Napoli_food_racing/tree/controlli);
   - l'**anteprima** su https://www.napolifoodracing.it/anteprima/ (nascosta a Google).
5. Buzz guarda l'anteprima sul telefono. **Solo con il suo OK** si porta il ramo su `main`: il push su `main` pubblica il sito vero in circa 30 secondi.

## Regole che non si discutono
- **Mai inventare:** prezzi, cambio euro/lire, nomi dei DJ, specialità non elencate, posizione degli stand, ingressi, piscina, lounge. Sulla mappa resta "Posizioni indicative: la pianta degli stand arriva a breve."
- **Dialetto sempre con l'italiano subito sotto.** Grafie: "Corr'", "Comm'", "Jamme ja'!".
- **"Morè" = logo dorato di Morè**, mai scritto in testo semplice dove si vede, mai ricolorato.
- **Niente foto, render, 3D o immagini generate.** Solo vettoriale disegnato.
- **"Token in lire"**, sempre: nessuno deve pensare di portare le vecchie lire.
- Colori, font e misure: `DESIGN.md`. La pallina gialla è l'unico giallo.

## Regole di mestiere (dalle skill impeccable e design-taste-frontend di Buzz)
- Niente etichette o "eyebrow" sopra i titoli.
- Niente ombre piene sfalsate (`box-shadow: 8px 8px 0`): solo ombre morbide con sfocatura.
- Niente glifi Unicode come icone: solo SVG inline.
- Contrasto testo almeno 4,5:1; testo mai sotto i 12 px; tocchi almeno 44×44 px.
- Un momento animato scritto per sezione, non effetti sparsi; niente scroll guidato che blocca la pagina.
- Animazioni che durano più di 5 secondi: devono potersi fermare (vedi il giradischi).
- Selezione, focus da tastiera e scrollbar sono a tema (già impostati in cima al CSS).
- Prova sempre a 1440, 1024, 768, 390 e 320 px di larghezza.

## Safari e iPhone: le trappole già incontrate
- Su iPhone la barra di Safari che compare e scompare fa scattare `resize`: i ricalcoli devono guardare la larghezza, non l'altezza (vedi `layoutPin`).
- `overflow:hidden` sul body non blocca lo scroll su iPhone: serve anche su `html` (intro).
- Animare il `viewBox` di SVG grandi a ogni frame è pesante su Safari: si muove un livello con `transform` (vedi la mappa).
- Animazioni CSS infinite dentro un SVG grande ridisegnano tutto l'SVG: mettile in un elemento HTML a parte (vedi `.m-pulse`).
- `backface-visibility` va anche con il prefisso `-webkit-`.
- Testa sempre con WebKit: `MOTORI=webkit node strumenti/controllo.js` (in locale serve `npx playwright install webkit`; in GitHub lo fa il workflow).

## Pubblicazione (Aruba)
- Lo spazio FTP di Aruba ospita **anche altri siti**: il workflow tocca solo la cartella `www.napolifoodracing.it/` (e `anteprima/` dentro). Non cambiare `server-dir` e non usare opzioni che cancellano file sul server.
- Le credenziali FTP stanno solo nei secret di GitHub (`FTP_USERNAME`, `FTP_PASSWORD`). Mai scriverle in file, commit o chat.

## Le skill di Buzz
Le skill complete (impeccable con il suo programma, design-taste-frontend, playwright-cli con Safari) sono installate sul Mac di Buzz, nella cartella `Desktop/BUZZ/RACING SHOW`. Da lì, in Claude Code:
- `/impeccable audit` o `/impeccable critique` sulla landing (usa `PRODUCT.md` e `DESIGN.md` di questa repo);
- chiedere a parole "controlla la landing su Safari con playwright".
Da una sessione cloud si possono avviare sul Mac con Remote Control.
