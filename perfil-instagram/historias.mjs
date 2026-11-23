// Genera las historias para rellenar las destacadas (1080×1920).
// Textos sacados de la web (preguntas frecuentes y /para-barberias); capturas recortadas de posts ya
// publicados en posts/, que solo tienen datos de demo.
// Uso: node perfil-instagram/historias.mjs
import { createRequire } from 'node:module'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const { chromium } = createRequire(import.meta.url)('playwright')

const AQUI = dirname(fileURLToPath(import.meta.url))
const POSTS = join(AQUI, '..', 'posts')
const LIMA = '#d4ff3a', NEGRO = '#0a0a0a', GRIS = '#b5b8ba', TENUE = '#7e8287'

const logo = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${LIMA}"/><g fill="${NEGRO}"><rect x="14" y="9" width="15" height="8" rx="4"/><path d="M16 21.5a4.5 4.5 0 0 1 5.3-3.6l1.4.3a4.5 4.5 0 0 1 3.6 5.3L24 36h-9.5z"/><rect x="14.5" y="32" width="31" height="10" rx="5"/><rect x="27.5" y="41" width="7.5" height="7"/><rect x="18" y="47" width="26" height="8" rx="4"/><path d="M42 37l7.5 9" stroke="${NEGRO}" stroke-width="7" stroke-linecap="round"/></g></svg>`

// Recorta el móvil de una imagen de feed (1080×1350): el marco va de x≈258 a 822 y de y≈438 al final.
const movil = (post, archivo) => {
  const src = 'data:image/png;base64,' + readFileSync(join(POSTS, post, archivo)).toString('base64')
  const k = 1.3, x = 258, y = 438
  return `<div style="position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:${564 * k}px;height:${912 * k}px;overflow:hidden;
    background:url(${src}) ${-x * k}px ${-y * k}px/${1080 * k}px ${1350 * k}px no-repeat;
    -webkit-mask-image:linear-gradient(#000 70%,transparent)"></div>`
}

// Una historia. Zona segura: el texto entre y=250 y y=1580 (arriba la barra de progreso, abajo «Enviar mensaje»).
const historia = ({ tag, n, total, titulo, lima, texto, cta, captura, grande }) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;overflow:hidden;color:#f0f0f0;font-family:Inter,sans-serif;
background:radial-gradient(circle at 85% 6%,rgba(212,255,58,.22),rgba(0,0,0,0) 42%),#000;position:relative}
.d{font-family:Geist,Inter,sans-serif;font-weight:700;letter-spacing:-.045em}</style></head><body>
<div style="position:absolute;inset:0;padding:250px 96px 0;display:flex;flex-direction:column;${captura ? '' : 'justify-content:center;padding-bottom:340px'}">
  <div style="display:flex;align-items:center;justify-content:space-between;${captura ? '' : 'position:absolute;top:250px;left:96px;right:96px'}">
    <div style="display:flex;align-items:center;gap:18px">${logo(64)}<span style="font:500 28px Geist,Inter;letter-spacing:.14em;text-transform:uppercase;color:${LIMA}">${tag}</span></div>
    ${total > 1 ? `<span style="font:500 28px Geist,Inter;color:${TENUE}">${n}/${total}</span>` : ""}
  </div>
  <div style="${captura ? 'margin-top:70px' : ''}">
    <div class="d" style="font-size:${grande ? 132 : captura ? 84 : 104}px;line-height:1.02">${titulo}${lima ? `<br><span style="color:${LIMA}">${lima}</span>` : ''}</div>
    ${texto ? `<div style="margin-top:40px;font-size:${captura ? 36 : 42}px;line-height:1.38;color:${GRIS}">${texto}</div>` : ''}
    ${cta ? `<div style="margin-top:64px"><span style="display:inline-block;background:${LIMA};color:${NEGRO};font:600 40px Geist,Inter;padding:26px 44px;border-radius:999px">${cta}</span></div>` : ''}
  </div>
</div>
${captura ? movil(...captura) : ''}
</body></html>`

const CLI = '2026-11-22-pr-1-prueba', RES = '2026-11-22-siempre-reservar-sin-llamar'
const DESTACADAS = {
  reservar: ['Reservar', [
    { titulo: 'Reserva sin llamar.', lima: 'En dos toques.', texto: 'Así pides cita en tu barbería desde el móvil.', grande: true },
    { titulo: '1. Entra en tu barbería', texto: 'Busca la tuya en chairio.es y abre su página: horario, fotos y servicios.', captura: [CLI, 'feed-1.png'] },
    { titulo: '2. Elige servicio y hora', lima: 'y reserva.', texto: 'Ves los huecos libres al momento. Sin esperar a que te cojan el teléfono.' },
    { titulo: '3. Tu cita, en «Mis citas»', texto: 'Cuando llegues, abre la cita y enseña tu QR.', captura: [RES, 'feed-2.png'] },
    { titulo: 'Es gratis.', lima: 'Pagas el corte en el local.', texto: 'A su precio de siempre.', cta: 'Reserva en chairio.es' },
  ]],
  socios: [ 'Socios', [
    { titulo: '¿Qué es ser socio?', lima: 'Tu barbería, con cuota fija.', grande: false },
    { titulo: 'Pagas una cuota al mes', lima: 'y tus cortes van incluidos.', texto: 'Cada barbería pone sus membresías y sus precios. Compensa si vas a menudo.' },
    { titulo: 'Todo en tu cuenta', texto: 'Tu membresía, cuándo se renueva y tu próxima cita.', captura: [CLI, 'feed-2.png'] },
    { titulo: 'Sin permanencia.', texto: 'Te das de baja cuando quieras: la baja se aplica al final del periodo que ya has pagado.' },
    { titulo: 'Hazte socio', lima: 'de tu barbería.', cta: 'chairio.es' },
  ]],
  barberias: ['Barberías', [
    { titulo: '¿Tienes barbería?', lima: 'Esto es para ti.', grande: true },
    { titulo: 'Reservas online', lima: 'y tu agenda al día.', texto: 'Servicios y precios, horario, descansos y cierres. Y con el plan Pro, tu equipo.' },
    { titulo: 'Tu página propia', texto: 'Con tus fotos y tu QR para compartir. Sales en el buscador de Chairio.', captura: [CLI, 'feed-3.png'] },
    { titulo: 'Socios con cuota', lima: 'cada mes.', texto: 'Ofrece membresías y cóbralas con Stripe: ingresos fijos todos los meses.' },
    { titulo: 'En 3 pasos', texto: '1. Creas tu cuenta y preparas tu página (gratis).<br>2. Activas tu plan y conectas Stripe.<br>3. La revisamos y la publicamos.' },
    { titulo: 'Básico 14,99 €', lima: 'Pro 19,99 €', texto: 'Al mes, IVA no incluido. En Pro, 9,99 € más por cada barbero.', cta: 'chairio.es/para-barberias' },
  ]],
  'como-va': ['Cómo va', [
    { titulo: 'Así funciona', lima: 'Chairio.', texto: 'Aquí van todas las funciones, una a una. 👉', grande: true },
  ]],
  dudas: ['Dudas', [
    { titulo: '¿Tengo que pagar', lima: 'para reservar?', texto: 'No. Reservas gratis y pagas el corte en el local, a su precio de siempre. Las membresías son opcionales.' },
    { titulo: '¿Hasta cuándo puedo', lima: 'cancelar una cita?', texto: 'Gratis hasta 5 horas antes, contando solo las horas en que la barbería está abierta. Más tarde, o si no vas, cuenta como falta.' },
    { titulo: '¿Puedo darme de baja', lima: 'cuando quiera?', texto: 'Sí, sin permanencia. La baja se aplica al final del periodo pagado y hasta entonces sigues usando tu membresía.' },
    { titulo: '¿Puedo ser socio', lima: 'de varias barberías?', texto: 'Sí, una membresía en cada barbería. Cada una con sus citas y sus reglas.' },
    { titulo: '¿Y si la barbería', lima: 'cierra ese día?', texto: 'Te avisamos y esa cita no cuenta como falta ni como cancelación.' },
    { titulo: '¿Más dudas?', lima: 'Escríbenos.', texto: 'Por mensaje aquí o en contacto@chairio.es', cta: 'chairio.es' },
  ]],
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
for (const [carpeta, [tag, lista]] of Object.entries(DESTACADAS)) {
  mkdirSync(join(AQUI, 'historias', carpeta), { recursive: true })
  for (const [i, h] of lista.entries()) {
    await page.setContent(historia({ ...h, tag, n: i + 1, total: lista.length }), { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: join(AQUI, 'historias', carpeta, `${String(i + 1).padStart(2, '0')}.png`) })
  }
  console.log('✓', carpeta, lista.length)
}
await browser.close()
