// Genera las imágenes del perfil de Instagram de Chairio (foto, portadas de destacadas y posts fijados).
// Uso: node perfil-instagram/generar.mjs  (necesita Playwright con Chromium)
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = dirname(fileURLToPath(import.meta.url))
const LIMA = '#d4ff3a', NEGRO = '#0a0a0a', GRIS = '#b5b8ba', TENUE = '#7e8287'

// Silla del logo (la misma de src/app/icon.svg), sin el fondo redondeado.
const silla = (color, size) => `<svg width="${size}" height="${size}" viewBox="11.5 6 44 52"><g fill="${color}"><rect x="14" y="9" width="15" height="8" rx="4"/><path d="M16 21.5a4.5 4.5 0 0 1 5.3-3.6l1.4.3a4.5 4.5 0 0 1 3.6 5.3L24 36h-9.5z"/><rect x="14.5" y="32" width="31" height="10" rx="5"/><rect x="27.5" y="41" width="7.5" height="7"/><rect x="18" y="47" width="26" height="8" rx="4"/><path d="M42 37l7.5 9" stroke="${color}" stroke-width="7" stroke-linecap="round"/></g></svg>`
const logo = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${LIMA}"/>${silla(NEGRO, 64).replace(/<svg[^>]*>|<\/svg>/g, '')}</svg>`

// Iconos de trazo para las destacadas.
const trazo = (d) => `<svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="${LIMA}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
const ICONOS = {
  reservar: trazo('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="m9 15 2 2 4-4"/>'),
  socios: trazo('<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 9.2h19M5.5 15h4"/><path d="M16.00 10.70 L16.94 13.01 L19.42 13.19 L17.52 14.79 L18.12 17.21 L16.00 15.90 L13.88 17.21 L14.48 14.79 L12.58 13.19 L15.06 13.01z"/>'),
  barberias: trazo('<circle cx="6" cy="6.5" r="2.8"/><circle cx="6" cy="17.5" r="2.8"/><path d="M8.3 8.2 20 18.5M8.3 15.8 20 5.5"/>'),
  'como-va': trazo('<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 9.5v5l4-2.5z"/>'),
  dudas: trazo('<circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.3a2.8 2.8 0 1 1 3.6 2.7c-.6.2-.9.7-.9 1.3v.7"/><circle cx="12" cy="17" r=".4" fill="' + LIMA + '"/>'),
}

const base = (w, h, body, fondo = '#000') => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;background:${fondo};color:#f0f0f0;font-family:Inter,sans-serif;overflow:hidden}
.d{font-family:Geist,Inter,sans-serif;font-weight:700;letter-spacing:-.045em}</style></head><body>${body}</body></html>`

const centro = (inner, extra = '') => `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;${extra}">${inner}</div>`

// Posts fijados: portada 4:5, con el texto dentro de la zona que se ve en la rejilla (3:4).
const fijado = ({ eyebrow, l1, l2, sub, cta }) => base(1080, 1350, `
<div style="width:100%;height:100%;padding:150px 96px;display:flex;flex-direction:column;justify-content:space-between;
background:radial-gradient(circle at 88% 8%,rgba(212,255,58,.24),rgba(0,0,0,0) 46%),#000">
  <div style="display:flex;align-items:center;gap:22px">${logo(84)}<span class="d" style="font-size:54px">chairio</span></div>
  <div>
    <div style="font:500 30px Geist,Inter;letter-spacing:.14em;text-transform:uppercase;color:${LIMA};margin-bottom:34px">${eyebrow}</div>
    <div class="d" style="font-size:104px;line-height:1">${l1}</div>
    <div class="d" style="font-size:104px;line-height:1.05;color:${LIMA}">${l2}</div>
    <div style="margin-top:40px;font-size:38px;line-height:1.35;color:${GRIS}">${sub}</div>
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between">
    <span style="background:${LIMA};color:${NEGRO};font:600 34px Geist,Inter;padding:22px 38px;border-radius:999px">${cta}</span>
  </div>
</div>`)

const PIEZAS = {
  'foto-perfil.png': [1080, 1080, base(1080, 1080, centro(silla(NEGRO, 600)), LIMA)],
  'foto-perfil-oscura.png': [1080, 1080, base(1080, 1080, centro(silla(LIMA, 600)), '#000')],
  ...Object.fromEntries(Object.entries(ICONOS).map(([k, svg]) => [`destacadas/${k}.png`, [1080, 1920,
    base(1080, 1920, centro(svg, 'background:radial-gradient(circle at 50% 50%,rgba(212,255,58,.16),rgba(0,0,0,0) 38%),#000'))]])),
  'fijados/1-que-es-chairio.png': [1080, 1350, fijado({ eyebrow: 'Qué es Chairio', l1: 'Tu barbería de siempre,', l2: 'con cuota fija.', sub: 'Reservas tu turno desde el móvil y, si quieres, te haces socio de tu barbería con una cuota al mes.', cta: 'chairio.es' })],
  'fijados/2-clientes.png': [1080, 1350, fijado({ eyebrow: 'Para clientes', l1: 'Reserva sin llamar.', l2: 'En dos toques.', sub: 'Eliges barbería, servicio y hora. Tu cita queda en «Mis citas» con su QR. Gratis.', cta: 'Reserva en chairio.es' })],
  'fijados/3-barberias.png': [1080, 1350, fijado({ eyebrow: 'Para barberías', l1: 'Agenda, socios', l2: 'y tu página propia.', sub: 'Reservas online, membresías con cobro mensual y tu QR para compartir. Planes desde 12,99 € al mes + IVA.', cta: 'chairio.es/para-barberias' })],
}

const browser = await chromium.launch()
for (const [archivo, [w, h, html]] of Object.entries(PIEZAS)) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const ruta = join(OUT, archivo)
  mkdirSync(dirname(ruta), { recursive: true })
  await page.screenshot({ path: ruta })
  await page.close()
  console.log('✓', archivo)
}
await browser.close()
