# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML, CSS e JavaScript statici, senza framework. Un solo sorgente (`sorgente/template.html`) che `sorgente/build.py` trasforma in `sito/index.html`. Hosting Aruba (spazio condiviso con altri domini), pubblicato da GitHub Actions via FTP.

## Users

- **Chi passa dal Napoli Racing Show** (27, 28 e 29 novembre 2026, lungomare di Napoli): arriva quasi sempre dal telefono, spesso da Instagram o da un link condiviso, e vuole sapere in pochi secondi dove si mangia, quando, quanto costa entrare e come si paga.
- **Chi ci sta pensando nei giorni prima**: vuole salvare la data, capire chi c'è (i "piloti") e girare il link agli amici.
- **Il cliente (Trattoria Morè) e i partner**: guardano la pagina per vedere come sono rappresentati.

## Product Purpose

Landing di **NAPOLI FOOD RACING by Morè**, l'area food del Napoli Racing Show. Deve far venire voglia di passare e rispondere subito alle domande pratiche: dove (Tennis Club Napoli, sul campo blu subito a sinistra della tribuna), quando (27·28·29 novembre, ore 9–24), ingresso gratuito, pagamento con token in lire, DJ set ogni sera 20–24. Il successo è: gente che arriva al box sapendo già dove andare e come pagare.

## Positioning

L'unica area food del Gran Premio di Napoli, curata da Trattoria Morè come "capo scuderia" con una squadra di partner napoletani, dentro un circolo storico, dove si paga in lire.

## Operating Context

- Il dominio è napolifoodracing.it, l'Instagram è @napoli_food_racing.
- La pagina cambia da sola con le fasi dell'evento (ora di Roma): PRE-GARA, COUNTDOWN negli ultimi tre giorni, LIVE dal 27 al 29, ARRIVO dopo. Per provarle: `#fase-pre`, `#fase-countdown`, `#fase-live`, `#fase-chiuso`, `#fase-fine` in fondo all'indirizzo.
- Tutto il resto della comunicazione (post, story, video) segue la skill `napoli-food-racing` di Buzz.

## Capabilities and Constraints

- Fatti confermati: 27, 28 e 29 novembre, dalle 9 alle 24 tutti e tre i giorni; Tennis Club Napoli, Lungomare; ingresso gratuito; alla cassa vicino all'ingresso si cambiano gli euro in **token in lire** da spendere in tutti gli stand; DJ set ogni sera 20–24.
- Partner, in quest'ordine: Morè (capo scuderia), Poppella (pasticceria, fiocco di neve), Say Slice (pizza al trancio), Abbondanza del Pane (panificio, logo "Abbondante" tondo), Perrella (beverage: acqua, birra, bibite).
- **Non ancora decisi, da non inventare:** prezzi, cambio euro/lire, nomi dei DJ, specialità oltre a quelle elencate, posizione degli stand, ingressi, piscina, lounge. Finché non arriva la pianta: nota "Posizioni indicative: la pianta degli stand arriva a breve."
- Mappe: ricalcate dalla mappa ufficiale del village (PDF del Gran Premio, pagina 12). La mappa "'O box" è uno zoom fedele sul Tennis Club.

## Brand Commitments

- Stile "Tennis Club", approvato dal cliente il 9 novembre 2026: verde club, corsivo serif, tende a righe, terra rossa. Tutto vettoriale e disegnato: niente foto, render, 3D o immagini generate.
- Dialetto corto e noto, **sempre con l'italiano subito sotto**. Grafie corrette: "Corr'", "Comm'", "Jamme ja'!".
- Dove compare la parola "Morè" si usa il logo dorato originale di Morè, mai ridisegnato o ricolorato.
- Loghi partner a un colore (verde sui fondi chiari, panna sui fondi scuri), stessa grandezza ottica.
- Nome ufficiale dell'evento: Napoli Racing Show. "Gran Premio" solo come aggancio.

## Evidence on Hand

- Loghi: `sito/assets/img/` (logo definitivo, emblema, Morè oro, partner verde/panna).
- Mappe vettoriali e illustrazioni: `sorgente/parts.json`.
- PDF del Gran Premio (nella cartella del progetto, non nel sito).
- Mancano: pianta degli stand, prezzi, cambio, nomi dei DJ, foto (e non servono).

## Product Principles

1. Le informazioni pratiche prima di tutto: chi apre la pagina dal telefono deve trovare dove, quando e come si paga senza cercare.
2. La festa si sente, ma non si mette in mezzo: ogni animazione deve funzionare su iPhone e lasciare la pagina utilizzabile se è spenta.
3. Mai inventare: quello che non è confermato non va in pagina.
4. Napoli con eleganza da circolo: la battuta in dialetto, l'italiano sotto, niente volgarità.

## Accessibility & Inclusion

WCAG 2.2 AA: contrasto almeno 4,5:1 per il testo, tocchi da almeno 44 px, tutto usabile da tastiera, animazioni che rispettano "riduci movimento" e che si possono fermare quando durano più di 5 secondi.
