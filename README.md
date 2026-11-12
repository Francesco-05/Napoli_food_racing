# Napoli Food Racing by Morè · landing page

Landing page di **napolifoodracing.it**: l'area food del Napoli Racing Show, 27-28-29 novembre 2026 al Tennis Club Napoli.

## I tre indirizzi da ricordare
- **Sito vero:** https://www.napolifoodracing.it
- **Anteprima** (le modifiche in prova, nascoste a Google): https://www.napolifoodracing.it/anteprima/
- **Controlli Safari e Chrome** (screenshot di ogni sezione, computer, iPad, iPhone): https://github.com/Francesco-05/Napoli_food_racing/tree/controlli

## Cosa c'è qui
- `sito/`: il sito pronto, così come va online (`index.html`, `assets/`, `robots.txt`, `sitemap.xml`).
- `sorgente/`: da dove si genera `sito/index.html`. Si modifica `sorgente/template.html`, poi si lancia `python3 sorgente/build.py` (serve Pillow: `pip install pillow`).
- `strumenti/controllo.js`: il controllo automatico con WebKit (il motore di Safari) e Chromium.
- `PRODUCT.md`, `DESIGN.md`, `CLAUDE.md`: il contesto per chi ci lavora (fatti confermati, sistema visivo, regole e trappole). Le skill di Buzz (impeccable e design-taste-frontend) leggono `PRODUCT.md` e `DESIGN.md` da qui.
- `.github/workflows/`: `deploy-aruba.yml` (pubblica), `controllo.yml` (controlla).

## Come si lavora
1. Le modifiche si fanno su un ramo (per esempio `rifinitura`), mai direttamente su `main`.
2. A ogni push del ramo partono da soli il **controllo** (report nel ramo `controlli`) e l'**anteprima** su `/anteprima/`.
3. Si guarda l'anteprima dal telefono. Quando va bene, il ramo si porta su `main` e il sito vero si aggiorna in circa 30 secondi.

### Come chiedere una modifica (per avere il risultato al primo giro)
- Uno **screenshot** dal telefono o dal computer, con un cerchio su cosa non va.
- **Dove l'hai visto:** sito vero o anteprima, iPhone o computer, Safari o Chrome.
- **Cosa vorresti**, anche solo con un riferimento: un sito o un effetto che ti piace.

## Come va online
Ogni modifica a `sito/` sul ramo `main` viene caricata da sola sull'hosting Aruba via FTP (scheda **Actions** del repo per vedere com'è andata). Gli altri rami vanno in `/anteprima/`.
Si può anche rilanciare a mano: Actions › Carica su Aruba › Run workflow.

Una volta sola, in **Settings › Secrets and variables › Actions**, servono due secret:
- `FTP_USERNAME`: utente FTP di Aruba (nel pannello, formato `1234567@aruba.it`)
- `FTP_PASSWORD`: la stessa password del pannello Aruba

Facoltativo (scheda Variables): `FTP_SERVER` se il server non è `ftp.napolifoodracing.it`, `FTP_DIR` per caricare in una cartella diversa da `www.napolifoodracing.it` (lo spazio FTP ospita anche altri domini: il caricamento tocca solo quella cartella).

## Controllare la pagina
- In GitHub: Actions › Controllo Safari e Chrome › Run workflow. Nel campo indirizzo puoi mettere anche il sito vero o l'anteprima.
- In locale: `cd strumenti && npm install && npx playwright install webkit chromium`, poi `node strumenti/controllo.js` dalla cartella principale. Il report finisce in `report/README.md`.

## Come si comporta la pagina
Cambia da sola in base alla data (ora di Roma): pre-gara, countdown (24-26/11), live (27-29/11), fine (dal 30/11).
Per provare le fasi: aggiungi all'indirizzo `#fase-countdown`, `#fase-live`, `#fase-chiuso` o `#fase-fine`.

La mappa parte con un giro di ricognizione quando entra in vista (la pallina corre fino al box, poi zoom sull'area food); i bottoni **'O box** e **'A pista** cambiano vista, **Rifai il giro** lo rifà. Con "riduci movimento" attivo parte già sull'area food. Sul telefono si vedono solo le scritte della mappa che entrano intere.
