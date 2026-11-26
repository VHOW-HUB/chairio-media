// Genera las historias para rellenar las destacadas (1080×1920).
// Textos sacados de la web (preguntas frecuentes y /para-barberias); capturas de la app actual con la barbería
// de demo (capturas/, solo datos ficticios). Si cambia la app, se repiten las capturas y se vuelve a generar.
// Uso: node perfil-instagram/historias.mjs
import { createRequire } from 'node:module'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const { chromium } = createRequire(import.meta.url)('playwright')

const AQUI = dirname(fileURLToPath(import.meta.url))
const LIMA = '#d4ff3a', NEGRO = '#0a0a0a', GRIS = '#b5b8ba', TENUE = '#7e8287'

const logo = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${LIMA}"/><g fill="${NEGRO}"><rect x="14" y="9" width="15" height="8" rx="4"/><path d="M16 21.5a4.5 4.5 0 0 1 5.3-3.6l1.4.3a4.5 4.5 0 0 1 3.6 5.3L24 36h-9.5z"/><rect x="14.5" y="32" width="31" height="10" rx="5"/><rect x="27.5" y="41" width="7.5" height="7"/><rect x="18" y="47" width="26" height="8" rx="4"/><path d="M42 37l7.5 9" stroke="${NEGRO}" stroke-width="7" stroke-linecap="round"/></g></svg>`

// Una historia. Zona segura: el texto entre y=250 y y=1580 (arriba la barra de progreso, abajo «Enviar mensaje»).
// Una captura de la app (390 px de ancho a 2,5×, en capturas/) dentro de un móvil, cortada abajo con un degradado.
const pantalla = (archivo) => {
  const src = 'data:image/png;base64,' + readFileSync(join(AQUI, 'capturas', archivo)).toString('base64')
  return `<div style="position:absolute;left:50%;top:${TOP_MOVIL}px;transform:translateX(-50%);width:640px;height:1385px;border-radius:72px;
    border:12px solid #1c1c1f;box-shadow:0 0 0 2px rgba(255,255,255,.12),0 40px 140px rgba(212,255,58,.2);overflow:hidden;background:#000;
    -webkit-mask-image:linear-gradient(#000 62%,transparent 92%)"><img src="${src}" style="width:100%;display:block"></div>`
}
const TOP_MOVIL = 700

const historia = ({ tag, n, total, titulo, lima, texto, cta, app, grande }) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;overflow:hidden;color:#f0f0f0;font-family:Inter,sans-serif;
background:radial-gradient(circle at 85% 6%,rgba(212,255,58,.22),rgba(0,0,0,0) 42%),#000;position:relative}
.d{font-family:Geist,Inter,sans-serif;font-weight:700;letter-spacing:-.045em}</style></head><body>
<div style="position:absolute;inset:0;padding:250px 96px 0;display:flex;flex-direction:column;${app ? '' : 'justify-content:center;padding-bottom:340px'}">
  <div style="display:flex;align-items:center;justify-content:space-between;${app ? '' : 'position:absolute;top:250px;left:96px;right:96px'}">
    <div style="display:flex;align-items:center;gap:18px">${logo(64)}<span style="font:500 28px Geist,Inter;letter-spacing:.14em;text-transform:uppercase;color:${LIMA}">${tag}</span></div>
    ${total > 1 ? `<span style="font:500 28px Geist,Inter;color:${TENUE}">${n}/${total}</span>` : ""}
  </div>
  <div style="${app ? 'margin-top:60px' : ''}">
    <div class="d" style="font-size:${grande ? 132 : app ? 76 : 104}px;line-height:1.02">${titulo}${lima ? `<br><span style="color:${LIMA}">${lima}</span>` : ''}</div>
    ${texto ? `<div style="margin-top:40px;font-size:${app ? 34 : 42}px;line-height:1.38;color:${GRIS}">${texto}</div>` : ''}
    ${cta ? `<div style="margin-top:64px"><span style="display:inline-block;background:${LIMA};color:${NEGRO};font:600 40px Geist,Inter;padding:26px 44px;border-radius:999px">${cta}</span></div>` : ''}
  </div>
</div>
${app ? pantalla(app) : ''}
</body></html>`

const DESTACADAS = {
  reservar: ['Reservar', [
    { titulo: 'Reserva sin llamar.', lima: 'En dos toques.', texto: 'Así pides cita en tu barbería desde el móvil.', grande: true },
    { titulo: '1. Entra en tu barbería', texto: 'Busca la tuya en chairio.es y abre su página: horario, fotos y servicios.', app: 'ficha.png' },
    { titulo: '2. Elige servicio y hora', lima: 'y reserva.', texto: 'Ves los huecos libres al momento. Sin esperar a que te cojan el teléfono.' },
    { titulo: '3. Tu cita, en «Mis citas»', texto: 'Cuando llegues, abre la cita y enseña tu QR.', app: 'qr.png' },
    { titulo: 'Es gratis.', lima: 'Pagas el corte en el local.', texto: 'A su precio de siempre.', cta: 'Reserva en chairio.es' },
  ]],
  socios: [ 'Socios', [
    { titulo: '¿Qué es ser socio?', lima: 'Tu barbería, con cuota fija.', grande: false },
    { titulo: 'Pagas una cuota al mes', lima: 'y tus cortes van incluidos.', texto: 'Cada barbería pone sus membresías y sus precios. Compensa si vas a menudo.' },
    { titulo: 'Todo en tu cuenta', texto: 'Tu membresía, cuándo se renueva y tu próxima cita.', app: 'membresias.png' },
    { titulo: 'Sin permanencia.', texto: 'Te das de baja cuando quieras: la baja se aplica al final del periodo que ya has pagado.' },
    { titulo: 'Hazte socio', lima: 'de tu barbería.', cta: 'chairio.es' },
  ]],
  barberias: ['Barberías', [
    { titulo: '¿Tienes barbería?', lima: 'Esto es para ti.', grande: true },
    { titulo: 'Reservas online', lima: 'y tu agenda al día.', texto: 'Servicios y precios, horario, descansos y cierres. Y con el plan Pro, tu equipo.' },
    { titulo: 'Tu página propia', texto: 'Con tus fotos y tu QR para compartir. Sales en el buscador de Chairio.', app: 'escaparate.png' },
    { titulo: 'Socios con cuota', lima: 'cada mes.', texto: 'Ofrece membresías y cóbralas con Stripe: ingresos fijos todos los meses.' },
    { titulo: 'En 3 pasos', texto: '1. Creas tu cuenta y preparas tu página (gratis).<br>2. Activas tu plan y conectas Stripe.<br>3. La revisamos y la publicamos.' },
    { titulo: 'Básico 12,99 €', lima: 'Pro 17,99 €', texto: 'Al mes, IVA no incluido. En Pro, 7,99 € más por cada barbero.', cta: 'chairio.es/para-barberias' },
  ]],
  'como-va': ['Cómo va', [
    { titulo: 'Así funciona', lima: 'Chairio.', texto: 'Aquí van todas las funciones, una a una. 👉', grande: true },
  ]],
  // Funciones de la app, una por historia, con capturas de la barbería de demo. Van detrás de la portada de «Cómo va».
  'como-va-funciones': ['Cómo va', [
    { titulo: 'Para clientes', lima: 'Lo que puedes hacer.', texto: 'Desde buscar barbería hasta enseñar tu QR al llegar.', grande: true },
    { titulo: 'Encuentra tu barbería', texto: 'Por nombre, ciudad o calle. Ves si está abierta y guardas tus favoritas con el ♡.', app: 'buscar2.png' },
    { titulo: 'Su página, con todo', texto: 'Fotos, horario, teléfono, cómo llegar y sus servicios con precio.', app: 'ficha.png' },
    { titulo: 'Elige qué te haces', texto: 'Puedes juntar varios servicios en la misma cita.', app: 'reservar.png' },
    { titulo: 'Elige día y hora', texto: 'Los huecos libres al momento, hasta dos semanas vista.', app: 'reservar2.png' },
    { titulo: 'Tu cita, a mano', texto: 'Cómo llegar, llamar, añadirla a tu calendario y cancelar gratis hasta 5 horas antes.', app: 'cita.png' },
    { titulo: 'Al llegar, tu QR', texto: 'La barbería lo lee y listo. Cambia cada pocos segundos: una captura no sirve.', app: 'qr.png' },
    { titulo: 'Hazte socio', texto: 'Eliges membresía y tus cortes van incluidos. Cada barbería pone sus planes.', app: 'socio2.png' },
    { titulo: 'Tu membresía', texto: 'Cuándo se renueva, cuántos cortes llevas y la baja cuando quieras.', app: 'membresias.png' },
    { titulo: 'Avisos en el móvil', texto: 'Te avisamos de tus citas y tu membresía. Y puedes instalar Chairio como una app.', app: 'avisos.png' },
    { titulo: 'Para barberías', lima: 'Tu panel.', texto: 'Agenda, socios, equipo y tu página, desde el móvil.', grande: true },
    { titulo: 'Tu barbería, de un vistazo', texto: 'Nada más entrar, las citas de hoy.', app: 'panel.png' },
    { titulo: 'Agenda por día o semana', texto: 'Por barbero. Y apuntas a mano las citas que te llegan por teléfono.', app: 'agenda2.png' },
    { titulo: 'Escanea el QR', texto: 'Con la cámara o un lector USB: la cita queda como «Asistió».', app: 'escanear.png' },
    { titulo: 'Servicios y precios', texto: 'Duración, precio y cuáles entran en la membresía.', app: 'servicios.png' },
    { titulo: 'Horario y cierres', texto: 'Tus horas y descansos. Y los festivos o vacaciones: ese día nadie puede reservar.', app: 'horario.png' },
    { titulo: 'Tus socios', texto: 'Quién es socio, de qué membresía y cuántos cortes lleva este mes.', app: 'socios.png' },
    { titulo: 'Tu equipo', texto: 'Con el plan Pro, cada barbero con su cuenta, su horario y sus vacaciones.', app: 'equipo.png' },
    { titulo: 'Tu escaparate', texto: 'Las fotos que verán tus clientes en tu página.', app: 'escaparate.png' },
    { titulo: 'Compártelo en Instagram', texto: 'Una imagen para tus historias con tu foto, tu enlace y tu QR.', app: 'escaparate2.png' },
    { titulo: 'Pruébalo', lima: 'en chairio.es', texto: 'Clientes: reserva gratis en chairio.es<br>Barberías: chairio.es/para-barberias', cta: 'chairio.es' },
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
    await page.screenshot({ path: join(AQUI, 'historias', carpeta, `${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 92 })
  }
  console.log('✓', carpeta, lista.length)
}
await browser.close()
