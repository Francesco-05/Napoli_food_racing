# Napoli Food Racing by Morè · landing page

Landing page di **napolifoodracing.it**: l'area food del Napoli Racing Show, 27-28-29 novembre 2026 al Tennis Club Napoli.

## Cosa c'è qui
- `sito/`: il sito pronto, così come va online (`index.html`, `assets/`, `robots.txt`, `sitemap.xml`).
- `sorgente/`: da dove si genera `sito/index.html`. Si modifica `sorgente/template.html`, poi si lancia `python3 sorgente/build.py` (serve Pillow: `pip install pillow`).
- `.github/workflows/deploy-aruba.yml`: il caricamento automatico su Aruba.

## Come va online
Ogni modifica a `sito/` sul ramo `main` viene caricata da sola sull'hosting Aruba via FTP (scheda **Actions** del repo per vedere com'è andata).
Si può anche rilanciare a mano: Actions › Carica su Aruba › Run workflow.

Una volta sola, in **Settings › Secrets and variables › Actions**, servono due secret:
- `FTP_USERNAME`: utente FTP di Aruba (nel pannello, formato `1234567@aruba.it`)
- `FTP_PASSWORD`: la stessa password del pannello Aruba

Facoltativo (scheda Variables): `FTP_SERVER` se il server non è `ftp.napolifoodracing.it`, `FTP_DIR` per caricare in una cartella diversa dalla radice.

## Come si comporta la pagina
Cambia da sola in base alla data (ora di Roma): pre-gara, countdown (24-26/11), live (27-29/11), fine (dal 30/11).
Per provare le fasi: aggiungi all'indirizzo `#fase-countdown`, `#fase-live`, `#fase-chiuso` o `#fase-fine`.
