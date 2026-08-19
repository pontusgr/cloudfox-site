/**
 * Applicerar Cloudfox-tilläggen på en nyexporterad version av guiden.
 * Körs om varje gång källfilen uppdateras — allt nedan är idempotent och
 * fallerar högljutt om ett ankare försvunnit, i stället för att tyst hoppa över.
 *
 * Arbetsgång vid ny version av guiden:
 *   1. cp <ny-export>.html public/guider/claude-code/index.html
 *   2. node verktyg/uppdatera-claude-code-guide.mjs      (körs från repo-roten)
 *   3. generera om PDF:en med Edge headless:
 *      msedge --headless --no-pdf-header-footer --print-to-pdf="...kom-igang-med-claude-code.pdf" file:///...index.html
 *   4. npm run build && git commit && git push
 */
import { readFileSync, writeFileSync } from 'node:fs';

const p = 'public/guider/claude-code/index.html';
let s = readFileSync(p, 'utf8');

const kraev = (fragment, namn) => {
  if (!s.includes(fragment)) throw new Error(`Ankaret saknas: ${namn}`);
};

// ---------- 1. SEO- och delningstaggar ----------
kraev('<title>Kom igång med Claude Code</title>', 'title');
const beskrivning =
  'En guide för dig som inte är professionell utvecklare. Efter en timme har du en fungerande uppsättning av Claude Code och något du faktiskt använder igen.';
s = s.replace(
  '<title>Kom igång med Claude Code</title>',
  `<title>Kom igång med Claude Code — guide för dig som inte är utvecklare | Cloudfox</title>
<meta name="description" content="${beskrivning}">
<meta name="author" content="Pontus Granborg, Cloudfox">
<link rel="canonical" href="https://www.cloudfox.se/guider/claude-code/">
<link rel="icon" href="/favicon.svg">

<meta property="og:type" content="article">
<meta property="og:locale" content="sv_SE">
<meta property="og:site_name" content="Cloudfox">
<meta property="og:title" content="Kom igång med Claude Code">
<meta property="og:description" content="${beskrivning}">
<meta property="og:url" content="https://www.cloudfox.se/guider/claude-code/">
<meta property="og:image" content="https://www.cloudfox.se/og-image.png">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Kom igång med Claude Code">
<meta name="twitter:description" content="${beskrivning}">
<meta name="twitter:image" content="https://www.cloudfox.se/og-image.png">`,
);

// ---------- 2. CSS: knapp, logotyplänk, utskriftsregler ----------
const cssAnkare = `  .brand{display:flex;align-items:center;gap:12px;flex-wrap:wrap;`;
kraev(cssAnkare, 'brand-CSS');
const cssSlut = s.indexOf('}', s.indexOf(cssAnkare)) + 1;
s =
  s.slice(0, cssSlut) +
  `
  .brand-hoger{margin-left:auto}
  .brand-lank{text-decoration:none;color:inherit;display:inline-flex;align-items:center;
    border-radius:6px;transition:opacity .12s ease}
  .brand-lank:hover{opacity:.72}
  .slutlank{color:var(--accent);text-decoration:none;border-bottom:1px solid currentColor}
  .slutlank:hover{opacity:.75}
  .pdf-knapp{
    display:inline-flex;align-items:center;gap:8px;text-decoration:none;
    font-size:14px;font-weight:600;color:var(--accent);
    background:var(--accent-soft);border:1px solid var(--border);
    border-radius:999px;padding:8px 16px;transition:filter .12s ease}
  .pdf-knapp:hover{filter:brightness(.97)}
  .pdf-knapp svg{flex:none}

  @media print{
    :root{--bg:#fff;--surface:#fff;--text:#000;--muted:#444;--border:#ccc;
      --accent:#1a3d5f;--accent-soft:#f2f6fa;--code-bg:#f6f6f4;--brand:#000}
    body{background:#fff}
    .wrap{max-width:none;padding:0}
    .pdf-knapp{display:none}
    a{color:#000;text-decoration:none}
    a[href^="http"]::after{content:" (" attr(href) ")";font-size:.85em;color:#555}
    h1,h2,h3{break-after:avoid-page;page-break-after:avoid}
    pre,.key,.note,.step,.callout,.danger-note,.danger-block,figure,table{break-inside:avoid-page;page-break-inside:avoid}
    footer{break-before:avoid-page}
    @page{margin:18mm 16mm}
  }` +
  s.slice(cssSlut);

// ---------- 3. Sidhuvudet: klickbar logotyp + PDF-knapp ----------
const brandGammal = `<div class="brand">
  <span class="brand-mark">cloudfox<span class="dot">.</span></span>
  <span class="brand-tag">Vi får AI att fungera i produktion</span>
</div>`;
kraev(brandGammal, 'brand-blocket');
s = s.replace(
  brandGammal,
  `<div class="brand">
  <a class="brand-lank" href="https://www.cloudfox.se" title="Till cloudfox.se">
    <span class="brand-mark">cloudfox<span class="dot">.</span></span>
  </a>
  <span class="brand-tag">Vi får AI att fungera i produktion</span>
  <span class="brand-hoger">
    <a class="pdf-knapp" href="kom-igang-med-claude-code.pdf" download>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Ladda ner som PDF
    </a>
  </span>
</div>`,
);

// ---------- 4. Naturlig länk i avslutningen ----------
const slutGammal = `<p>Hör av dig när något strular eller när du vill ta nästa steg.</p>`;
kraev(slutGammal, 'avslutningen');
s = s.replace(
  slutGammal,
  `<p>Hör av dig när något strular eller när du vill ta nästa steg — vi bygger
AI-flöden som körs i produktion hos medelstora industri- och grossistbolag.
Mer om hur vi jobbar finns på <a class="slutlank" href="https://www.cloudfox.se">cloudfox.se</a>.</p>`,
);

// ---------- 5. Länkar utan omdirigering (cloudfox.se svarar 307 till www) ----------
s = s.replaceAll('href="https://cloudfox.se"', 'href="https://www.cloudfox.se"');

writeFileSync(p, s);
console.log('Tilläggen applicerade på guiden.');
