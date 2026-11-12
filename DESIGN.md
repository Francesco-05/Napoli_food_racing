---
name: Napoli Food Racing by Morè
description: L'area food del Napoli Racing Show, in stile circolo del tennis.
colors:
  verde-club: "#2A5538"
  verde-scuro: "#1D3D28"
  verde-notte: "#16301F"
  tenda-scura: "#142C1C"
  terra-rossa: "#B9532F"
  terra-ombra: "#8C3B20"
  terra-testo: "#A9482A"
  panna: "#F3EEE2"
  carta: "#FBF8F1"
  bianco: "#FFFFFF"
  pallina: "#DCE35B"
  mappa-prato: "#DCE6D1"
  mappa-mare: "#CFDDD8"
  mappa-edifici: "#EFE8DA"
  mappa-campo-blu: "#4F7396"
typography:
  display:
    fontFamily: "Fraunces9, Fraunces, Georgia, serif"
    fontStyle: italic
    fontSize: "clamp(92px, 14.5vw, 196px)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Fraunces9, Fraunces, Georgia, serif"
    fontStyle: italic
    fontSize: "clamp(56px, 9vw, 112px)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Inter Tight, Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.16em"
    textTransform: uppercase
rounded:
  sm: "6px"
  md: "16px"
  lg: "22px"
  pill: "99px"
spacing:
  gutter: "20px"
  section: "clamp(72px, 10vw, 128px)"
  container: "1160px"
components:
  button-primary:
    backgroundColor: "{colors.panna}"
    textColor: "{colors.verde-scuro}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "54px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.panna}"
    rounded: "{rounded.pill}"
  button-verde:
    backgroundColor: "{colors.verde-club}"
    textColor: "{colors.panna}"
    rounded: "{rounded.pill}"
---

# Design System: Napoli Food Racing by Morè

## Overview

**Creative North Star: "Il circolo a bordo pista"** (proposta: da confermare con Buzz)

Un circolo del tennis elegante che per tre giorni si affaccia su un circuito. Il verde del club, le tende a righe con il festone smerlato, la terra rossa dei campi, la carta color panna delle tessere soci; sopra, l'energia di un Gran Premio: tabellone a palette, semaforo a palline, pista che si disegna, bandiera a scacchi. È tutto disegnato a mano in vettoriale, niente foto.

La pagina è una sequenza di fasce piene, ognuna con un protagonista solo. L'asse è a sinistra, mai tutto centrato. Le animazioni sono momenti scritti (l'intro, il titolo che sale, le palette, il giro di ricognizione sulla mappa), non effetti sparsi.

**Key Characteristics:**
- Fasce piene alternate: verde club, verde scuro, panna/carta, terra rossa, verde notte.
- Titoli in corsivo serif grandi e stretti; informazioni pratiche in sans maiuscolo spaziato.
- La pallina gialla è l'unico giallo della pagina.
- Grana di carta leggera su ogni fondo.

## Colors

Una palette da circolo: verdi profondi, terra rossa e panna, con un solo punto di giallo.

### Primary
- **Verde club** (#2A5538): fondo dominante (hero, piloti, domande).
- **Verde scuro** (#1D3D28): fascia info, header, tabellone, targhette, testo sui fondi chiari.
- **Verde notte** (#16301F): la sera (DJ set).

### Secondary
- **Terra rossa** (#B9532F): fondo d'accento (lire), numeri dei passi, pista disegnata sulla mappa, impulso sull'area food. Ombra #8C3B20.
- **Terra testo** (#A9482A): la terra per il testo piccolo sui fondi chiari (contrasto 5:1 su panna).

### Neutral
- **Panna** (#F3EEE2): testo sui fondi scuri, tende, tessere, fondo "Come funziona".
- **Carta** (#FBF8F1): fondo della mappa.
- **Bianco** (#FFFFFF): titoli sui fondi scuri e testo sulla terra rossa.

### Named Rules
**La regola della pallina.** Il giallo #DCE35B è solo la pallina da tennis (e il focus da tastiera sui fondi scuri). Mai testo giallo lungo, mai fondi gialli.
**La regola della terra.** Niente testo terra rossa sul verde. Sulla terra rossa il testo è bianco (panna non regge il contrasto).

## Typography

**Display Font:** Fraunces 9pt Italic (fallback Georgia)
**Body Font:** Inter Tight (fallback system-ui)

**Character:** il corsivo serif porta la voce del circolo e il dialetto; il sans maiuscolo porta le informazioni, come un tabellone.

### Hierarchy
- **Display** (corsivo, 92–196 px, interlinea 0,88): il titolo dell'hero, una volta sola.
- **Headline** (corsivo, 56–112 px, interlinea 0,86, tracking −3%): i titoli di sezione, spesso in dialetto.
- **Sub** (corsivo, 30–44 px, terra testo sui fondi chiari): la seconda voce del titolo ("Addò se magna?").
- **Body** (Inter Tight 500–600, 17–19 px, interlinea 1,5, massimo 58 caratteri per riga).
- **Label** (Inter Tight 700 maiuscolo, 12–15 px, tracking .14–.24em): date, orari, etichette, bottoni. Mai frasi lunghe in maiuscolo.

### Named Rules
**La regola del dialetto.** Ogni frase in dialetto ha l'italiano subito sotto (`.dial-it`, oppure la frase che segue).
**Niente etichette sopra i titoli.** Il titolo parla da solo (regola di impeccable).

## Elevation

Fondi piatti con grana; la profondità è data da ombre morbide con spostamento e sfocatura (per esempio `0 30px 54px -30px rgba(0,0,0,.55)` sulle tessere). Niente ombre piene a blocco sfalsato (`12px 14px 0`): sono vietate dal brand ("niente ombre piene") e da impeccable.

## Components

- **Bottoni:** pillola alta 54 px (44 px la versione piccola), Inter Tight 700 maiuscolo. Pieno panna, vuoto con bordo panna, verde, linea verde sui fondi chiari. Si alzano di 2 px al passaggio, si schiacciano alla pressione.
- **Tabellone** (hero): targa verde scuro con chiodi, celle data e countdown a palette (split-flap) con fessura scura.
- **Tessere dei piloti:** carta panna, testata colorata con mini tenda, logo partner, campi "Ruolo" e "Arma segreta", timbro.
- **Passi** (Come funziona): tre carte unite da una corsia che si accende con lo scroll.
- **Mappa:** cornice "poster" (doppio filetto verde e panna), barra di stato sotto con la pallina, comando a due voci 'O box / 'A pista.
- **Giradischi:** è un bottone. Ferma e fa ripartire il disco (pausa obbligatoria per animazioni lunghe).

## Motion

- **Momenti scritti:** intro (una volta per visita, saltabile), titolo dell'hero che sale, palette del countdown, giro di ricognizione sulla mappa (una volta quando entra in vista, poi a comando).
- **Solo transform e opacity** per tutto ciò che si muove di continuo. La mappa sposta la telecamera con `transform` sui livelli, non anima il `viewBox`.
- **Niente scroll guidato** che blocca la pagina per più schermate. Le cose legate allo scroll (striscione, corsia, gettoni) si muovono solo mentre si scorre.
- **Riduci movimento:** niente intro, niente giro, mappa già sull'area food, disco fermo.
- **Easing:** `cubic-bezier(.22,1,.36,1)` per le entrate; in-out cubico per i voli della mappa.

## Do's and Don'ts

- **Do** controllare ogni modifica su iPhone (Safari) e su computer con `node strumenti/controllo.js` o con l'anteprima.
- **Do** tenere le misure uguali per elementi uguali (le tessere hanno tutto alle stesse altezze).
- **Don't** usare foto, render, 3D o immagini generate.
- **Don't** inventare stand, prezzi, cambio, DJ, ingressi.
- **Don't** usare glifi Unicode come icone (frecce, stelle): solo SVG.
- **Don't** mettere testo sotto i 12 px.
