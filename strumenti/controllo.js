#!/usr/bin/env node
/*
  Controllo automatico della landing Napoli Food Racing.
  Apre la pagina con Chromium (Chrome) e WebKit (il motore di Safari) su più schermi,
  raccoglie errori della console, richieste fallite, sbordi orizzontali, bottoni troppo
  piccoli, e salva uno screenshot per sezione. Alla fine scrive report/README.md.

  Uso:
    node strumenti/controllo.js                      -> controlla la cartella sito/ in locale
    node strumenti/controllo.js https://www.napolifoodracing.it/anteprima/
    MOTORI=webkit PROFILI=telefono,computer node strumenti/controllo.js
    OUT=percorso/report node strumenti/controllo.js

  Esce con codice 1 solo se la pagina lancia un errore JavaScript.
*/
const { chromium, webkit, firefox, devices } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const SITO = path.join(ROOT, 'sito');
const OUT = path.resolve(process.env.OUT || path.join(ROOT, 'report'));
const URL_ARG = process.argv[2] && !process.argv[2].startsWith('-') ? process.argv[2] : '';
const MOTORI = (process.env.MOTORI || 'webkit,chromium').split(',').map(s => s.trim()).filter(Boolean);
const PROFILI_RICHIESTI = (process.env.PROFILI || '').split(',').map(s => s.trim()).filter(Boolean);

const PROFILI = {
  computer: { label: 'Computer 1440×900', ctx: { viewport: { width: 1440, height: 900 } } },
  portatile: { label: 'Portatile 1280×720', ctx: { viewport: { width: 1280, height: 720 } } },
  tablet: { label: 'iPad mini 768×1024', ctx: devices['iPad Mini'] },
  telefono: { label: 'iPhone 13 (390×664)', ctx: devices['iPhone 13'] },
  piccolo: { label: 'iPhone SE (320×568)', ctx: devices['iPhone SE'] },
};
// Profili di default per motore: WebKit li prova tutti, Chromium i due principali.
const DEFAULT = { webkit: ['computer', 'portatile', 'tablet', 'telefono', 'piccolo'], chromium: ['computer', 'telefono'], firefox: ['computer'] };

// Sezioni da fotografare (selettore, nome file, passi extra dentro le scene a scorrimento)
const SEZIONI = [
  ['.fascia', 'fascia-info'],
  ['#come-funziona', 'come-funziona'],
  ['#lire', 'lire'],
  ['#piloti', 'piloti', [0.5, 1]],
  ['#dj', 'dj'],
  ['#mappa', 'mappa'],
  ['#domande', 'domande'],
  ['.piede', 'footer'],
];

function servi(dir) {
  const tipi = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ics': 'text/calendar', '.txt': 'text/plain', '.xml': 'application/xml', '.json': 'application/json' };
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(dir, p);
    if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'content-type': tipi[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r({ srv, url: `http://127.0.0.1:${srv.address().port}/` })));
}

const attesa = ms => new Promise(r => setTimeout(r, ms));

async function controllaPagina(page) {
  return page.evaluate(() => {
    const vw = innerWidth, out = { sborda: [], piccoli: [], senzaAlt: [], font: {} };
    const de = document.documentElement;
    out.larghezzaPagina = Math.max(de.scrollWidth, document.body.scrollWidth);
    out.vw = vw;
    // elementi che escono a destra senza un genitore che li ritagli
    const clipped = el => { for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const s = getComputedStyle(a); if (s.overflowX !== 'visible' || s.overflow !== 'visible') return true; } return false; };
    if (out.larghezzaPagina > vw + 1) {
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width && r.right > vw + 1 && !clipped(el)) {
          out.sborda.push(`${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.classList.length ? '.' + [...el.classList].join('.') : ''} (fino a ${Math.round(r.right)}px)`);
          if (out.sborda.length > 8) break;
        }
      }
    }
    for (const el of document.querySelectorAll('a[href],button,summary,[role="tab"],input,select')) {
      const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      if (!r.width || s.visibility === 'hidden' || s.display === 'none' || el.closest('[hidden],[aria-hidden="true"]')) continue;
      if (r.width < 44 || r.height < 44) out.piccoli.push(`${(el.textContent || el.getAttribute('aria-label') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 40)} (${Math.round(r.width)}×${Math.round(r.height)})`);
    }
    out.senzaAlt = [...document.querySelectorAll('img:not([alt])')].map(i => i.src.split('/').pop());
    try { out.font.titoli = document.fonts.check('italic 400 40px Fraunces9'); out.font.testo = document.fonts.check('700 16px "Inter Tight"'); } catch (e) { out.font.errore = String(e); }
    return out;
  });
}

async function vaiA(page, sel, frazione = 0) {
  return page.evaluate(([sel, f]) => {
    const el = document.querySelector(sel); if (!el) return false;
    const hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hh')) || 68;
    const top = el.getBoundingClientRect().top + scrollY - hh;
    const corsa = Math.max(0, el.offsetHeight - (innerHeight - hh));
    window.scrollTo({ top: Math.max(0, top + corsa * f), behavior: 'instant' });
    return true;
  }, [sel, frazione]);
}

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  let server = null, base = URL_ARG;
  if (!base) { if (!fs.existsSync(path.join(SITO, 'index.html'))) throw new Error('Manca sito/index.html: lancia prima python3 sorgente/build.py'); server = await servi(SITO); base = server.url; }
  const motori = { chromium, webkit, firefox };
  const risultati = [];
  let erroriJs = 0;

  for (const nomeMotore of MOTORI) {
    const tipo = motori[nomeMotore]; if (!tipo) { console.log('Motore sconosciuto:', nomeMotore); continue; }
    let browser;
    try { browser = await tipo.launch(); } catch (e) { console.log(`Non riesco ad aprire ${nomeMotore}: ${e.message.split('\n')[0]}`); risultati.push({ motore: nomeMotore, saltato: e.message.split('\n')[0] }); continue; }
    const profili = PROFILI_RICHIESTI.length ? PROFILI_RICHIESTI : DEFAULT[nomeMotore] || ['computer'];
    for (const nomeProfilo of profili) {
      const prof = PROFILI[nomeProfilo]; if (!prof) continue;
      const opz = { ...prof.ctx };
      delete opz.defaultBrowserType;
      if (nomeMotore === 'firefox') { delete opz.isMobile; }
      const ctx = await browser.newContext({ ...opz, locale: 'it-IT', timezoneId: 'Europe/Rome', reducedMotion: 'no-preference' });
      const page = await ctx.newPage();
      const r = { motore: nomeMotore, profilo: nomeProfilo, label: prof.label, console: [], erroriPagina: [], richieste: [], shots: [] };
      page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') r.console.push(`[${m.type()}] ${m.text()}`.slice(0, 400)); });
      page.on('pageerror', e => { r.erroriPagina.push(String(e.message || e).slice(0, 400)); });
      page.on('requestfailed', q => { const u = q.url(); if (!/google|gstatic/.test(u)) r.richieste.push(`${q.failure() && q.failure().errorText} ${u}`); });
      page.on('response', s => { if (s.status() >= 400) r.richieste.push(`${s.status()} ${s.url()}`); });
      const dir = path.join(OUT, `${nomeMotore}-${nomeProfilo}`); fs.mkdirSync(dir, { recursive: true });
      const scatta = async nome => { const f = `${String(r.shots.length).padStart(2, '0')}_${nome}.jpg`; await page.screenshot({ path: path.join(dir, f), type: 'jpeg', quality: 70, scale: 'css' }); r.shots.push(f); };

      // 1) intro + hero, come la vede chi arriva la prima volta
      try {
        await page.goto(base, { waitUntil: 'load', timeout: 45000 });
        await attesa(1100); await scatta('intro');
        await page.waitForFunction(() => document.documentElement.classList.contains('hero-in'), null, { timeout: 12000 }).catch(() => r.console.push('[controllo] la classe hero-in non è arrivata entro 12 s'));
        await attesa(2200); await scatta('hero');
        // 2) sezioni
        for (const [sel, nome, extra] of SEZIONI) {
          if (!(await vaiA(page, sel))) { r.console.push(`[controllo] sezione ${sel} non trovata`); continue; }
          await attesa(1000); await scatta(nome);
          for (const f of extra || []) { await vaiA(page, sel, f); await attesa(900); await scatta(`${nome}-${Math.round(f * 100)}`); }
          // la mappa: prova i comandi se ci sono
          if (sel === '#mappa') {
            const bottoni = await page.$$('#mappa [data-vista]');
            for (const b of bottoni) { const v = await b.getAttribute('data-vista'); if (!(await b.isVisible())) continue; await b.click().catch(() => {}); await attesa(1600); await scatta(`mappa-${v}`); }
          }
        }
        r.check = await controllaPagina(page);
        // 3) pagina intera, piccola, per vedere il ritmo delle sezioni
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await attesa(500);
      } catch (e) { r.erroriPagina.push('[controllo] ' + e.message.split('\n')[0]); }
      erroriJs += r.erroriPagina.filter(x => !x.startsWith('[controllo]')).length;
      risultati.push(r);
      console.log(`${nomeMotore} · ${prof.label}: ${r.erroriPagina.length} errori JS, ${r.console.length} messaggi console, ${r.richieste.length} richieste fallite`);
      await ctx.close();
    }
    await browser.close();
  }
  if (server) server.srv.close();

  // report
  const md = [];
  md.push(`# Controllo landing`, '', `Pagina: ${URL_ARG || 'cartella sito/ (locale)'}  `, `Data: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}  `);
  if (process.env.GITHUB_SHA) md.push(`Commit: ${process.env.GITHUB_SHA.slice(0, 7)} sul branch ${process.env.GITHUB_REF_NAME}  `);
  md.push('', '| Motore | Schermo | Errori JS | Console | Richieste fallite | Sborda di lato | Tocchi < 44px |', '|---|---|---|---|---|---|---|');
  for (const r of risultati) {
    if (r.saltato) { md.push(`| ${r.motore} | saltato | ${r.saltato} | | | | |`); continue; }
    const c = r.check || {};
    md.push(`| ${r.motore} | ${r.label} | ${r.erroriPagina.length} | ${r.console.length} | ${r.richieste.length} | ${c.larghezzaPagina > c.vw + 1 ? `sì (${c.larghezzaPagina}px)` : 'no'} | ${(c.piccoli || []).length} |`);
  }
  for (const r of risultati) {
    if (r.saltato) continue;
    const c = r.check || {};
    md.push('', `## ${r.motore} · ${r.label}`, '');
    const lista = (titolo, arr) => { if (arr && arr.length) { md.push(`**${titolo}**`, ''); arr.forEach(x => md.push(`- ${x.replace(/\|/g, '\\|')}`)); md.push(''); } };
    lista('Errori JavaScript', r.erroriPagina); lista('Console', r.console); lista('Richieste fallite', r.richieste);
    lista('Elementi che sbordano di lato', c.sborda); lista('Bottoni o link più piccoli di 44px', c.piccoli); lista('Immagini senza alt', c.senzaAlt);
    if (c.font && (!c.font.titoli || !c.font.testo)) md.push(`**Font non caricati:** ${JSON.stringify(c.font)}`, '');
    md.push(r.shots.map(f => `<img src="${r.motore}-${r.profilo}/${f}" width="${/telefono|piccolo|tablet/.test(r.profilo) ? 220 : 420}" alt="${f}">`).join(' '));
  }
  fs.writeFileSync(path.join(OUT, 'README.md'), md.join('\n') + '\n');
  fs.writeFileSync(path.join(OUT, 'risultati.json'), JSON.stringify(risultati, null, 1));
  console.log(`Report: ${path.join(OUT, 'README.md')}`);
  process.exit(erroriJs ? 1 : 0);
}
main().catch(e => { console.error(e); process.exit(2); });
