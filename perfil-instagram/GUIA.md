# Perfil de Instagram de Chairio

Todo lo necesario para dejar el perfil listo. La API de Instagram no deja cambiar la foto, la biografía ni los ajustes, así que esto se hace a mano desde la app (unos 15 minutos).

Las imágenes se regeneran con `node perfil-instagram/generar.mjs`.

---

## 1. Foto de perfil

| Archivo | Uso |
|---|---|
| `foto-perfil.png` | **La recomendada.** Silla negra sobre lima: es el icono de la app y destaca en el feed oscuro. |
| `foto-perfil-oscura.png` | Alternativa: silla lima sobre negro. |

Instagram la recorta en círculo; la silla está centrada para que no se corte.

**Dónde:** Perfil → Editar perfil → Cambiar foto.

---

## 2. Nombre de usuario y nombre

- **Usuario:** `@chairio` (o `@chairio.es` si está cogido). Corto, igual que la web.
- **Nombre** (sale en negrita y **cuenta para la búsqueda de Instagram**):

  ```
  Chairio · Reservas de barbería
  ```

  Así aparece cuando alguien busca «reservas barbería» o «barbería», no solo «chairio».

---

## 3. Biografía (máx. 150 caracteres)

**Recomendada** (131 caracteres). Dice qué es, qué ganas como cliente, qué hay para barberías y dónde estamos:

```
💈 Reserva en tu barbería sin llamar
✂️ Hazte socio: tus cortes con cuota al mes
💼 ¿Barbería? Desde 12,99 €/mes + IVA
📍 Cartagena 👇
```

Alternativas:

```
Tu barbería de siempre, con cuota fija 💈
Reserva sin llamar · Hazte socio
¿Tienes barbería? Desde 12,99 €/mes + IVA
📍 Cartagena 👇
```

```
Reserva tu corte en dos toques 📅
Hazte socio de tu barbería ✂️
Para barberías: agenda, socios y tu página
📍 Cartagena 👇
```

Las tres cumplen la guía de estilo: tuteo, todo en presente, sin precios de membresía (los pone cada barbería) y sin prometer nada que la app no haga.

---

## 4. Enlaces (Editar perfil → Enlaces → Añadir enlace externo)

Instagram deja poner hasta 5. Con dos basta: uno para cada público. Llevan UTM para ver en las estadísticas cuántas visitas vienen de Instagram.

| Título | URL |
|---|---|
| Reserva tu cita | `https://chairio.es/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| Para barberías | `https://chairio.es/para-barberias?utm_source=instagram&utm_medium=social&utm_campaign=bio` |

El primero es el que se ve en grande en el perfil; ponlo el primero.

---

## 5. Configuración de la cuenta

### Cuenta profesional (ya lo es, porque la automatización publica por la API)
- **Tipo:** Empresa (no Creador: la API de publicación lo necesita).
- **Categoría:** «Aplicación» o «Programa informático» (escribe «app» en el buscador de categorías). Si no te convence, «Servicio de internet».
- **Mostrar categoría en el perfil:** sí.
- **Botones de contacto:** solo **Email** → `contacto@chairio.es`. Sin teléfono ni dirección (no hay local físico de Chairio).
- **Botón de acción** («Reservar», «Pedir»…): no. Esos botones son para socios de reservas de Meta; los enlaces de la biografía ya cumplen esa función.

### Seguridad (lo primero, es la cuenta de la empresa)
- **Autenticación en dos pasos** con app de autenticación (no SMS): Centro de cuentas → Contraseña y seguridad.
- Revisa en **Centro de cuentas** que la página de Facebook y el Business Manager vinculados son los que usa la automatización (`IG_USER_ID`). No los desvincules o se para la publicación.
- Guarda los **códigos de recuperación** fuera del móvil.

### Mensajes
- **Preguntas frecuentes** (Herramientas para empresas → Preguntas frecuentes). Salen como botones al abrir un chat:
  1. ¿Cómo reservo? → «Entra en chairio.es, busca tu barbería y elige hora. Es gratis.»
  2. ¿Qué es ser socio? → «Pagas una cuota al mes a tu barbería y tienes tus cortes incluidos. Sin permanencia.»
  3. Tengo una barbería → «Mira los planes en chairio.es/para-barberias. Crear la cuenta y preparar tu página es gratis.»
  4. Otra duda → «Escríbenos a contacto@chairio.es y te respondemos.»
- **Respuestas guardadas** con esos mismos textos.
- **Solicitudes de mensajes:** permitir de todo el mundo (los clientes potenciales no te siguen aún).

### Comentarios y privacidad
- **Cuenta pública.**
- **Ocultar comentarios ofensivos:** activado. Filtro avanzado: activado.
- **Permitir compartir publicaciones en historias y reels de otros:** activado (difusión gratis).
- **Etiquetas y menciones:** de todo el mundo, para que las barberías puedan etiquetarte.

---

## 6. Historias destacadas

Portadas en `destacadas/`. Para cada una: sube una historia, añádela a destacadas y, en «Editar portada», elige el PNG correspondiente.

| Orden | Título (máx. 15) | Portada | Qué poner dentro |
|---|---|---|---|
| 1 | Reservar | `reservar.png` | La reserva paso a paso con las capturas de demo del reel ya publicado. |
| 2 | Socios | `socios.png` | Qué es ser socio: cuota al mes, cortes incluidos, sin permanencia. |
| 3 | Barberías | `barberias.png` | Para dueños: agenda, membresías, página propia y QR. Planes desde 12,99 € + IVA. |
| 4 | Cómo va | `como-va.png` | Los reels de funciones (los de la automatización). |
| 5 | Dudas | `dudas.png` | Las preguntas frecuentes de arriba, una por historia. |

Solo con capturas de las cuentas de demo, nunca con datos reales.

### Historias para rellenarlas (`historias/`)

Ya hechas, en formato historia (1080 × 1920, JPG: es lo que acepta la API de Instagram). Se generan con `node perfil-instagram/historias.mjs`. Los textos salen de las preguntas frecuentes de la web y de /para-barberias; las capturas, de posts ya publicados con la barbería de demo.

| Destacada | Historias | Contenido |
|---|---|---|
| Reservar | 5 | Portada, entra en tu barbería, elige hora, «Mis citas» con QR, es gratis |
| Socios | 5 | Qué es, cuota al mes, tu cuenta, sin permanencia, hazte socio |
| Barberías | 6 | Para ti, agenda, página propia, socios, 3 pasos, planes y precios |
| Cómo va | 1 + 21 | Portada (`como-va/`) y las funciones, una por historia (`como-va-funciones/`): 9 para clientes y 9 para barberías, con capturas de la app de demo (`capturas/`) |
| Dudas | 6 | Las preguntas frecuentes de la web y contacto |

Cómo subirlas (las historias se publican y se añaden a destacadas a mano: la API no lo permite):
1. Sube las de una destacada **en orden** (01, 02…) como historias.
2. En la **última** de cada una pon un **sticker de enlace** encima del botón lima: `chairio.es` en Reservar, Socios y Dudas; `chairio.es/para-barberias` en Barberías (con las UTM de los enlaces de la biografía, cambiando `campaign=bio` por `campaign=destacadas`).
3. Pulsa «Destacar» → elige la destacada. En las siguientes, «Destacar» → la misma.
4. «Cómo va»: sube la portada y después, en cada reel publicado, «Compartir» → «Añadir a tu historia» → destacar en «Cómo va». Haz lo mismo con cada reel nuevo de la automatización.
5. Si las subes todas el mismo día, reparte: Instagram muestra las historias en cola a tus seguidores y 23 seguidas cansan. Puedes archivarlas (se quedan en destacadas) o subirlas en dos o tres días.

---

## 7. Posts fijados (los 3 de arriba del perfil)

Imágenes en `fijados/` (4:5, el texto va centrado para que se lea entero en la rejilla). Publícalas **en este orden inverso** (3, 2, 1) y fíjalas (⋯ → Fijar en el perfil), para que queden 1-2-3 de izquierda a derecha.

**1 · `1-que-es-chairio.png`**
```
Tu barbería de siempre, ahora en el móvil 💈

Con Chairio reservas tu turno sin llamar y, si quieres, te haces socio de tu barbería con una cuota al mes y tus cortes incluidos.

Reserva en chairio.es

#chairio #barberia #barbershop #barbero #cortedepelo #cartagena #barberiacartagena #regiondemurcia
```

**2 · `2-clientes.png`**
```
¿Sigues llamando para pedir turno? 📅

Eliges barbería, servicio y hora en dos toques. Tu cita queda en «Mis citas» con su QR para cuando llegues. Y es gratis.

Reserva en chairio.es

#chairio #barberia #barbershop #barbero #cortedepelo #cartagena #barberiacartagena #regiondemurcia #citas
```

**3 · `3-barberias.png`**
```
¿Tienes barbería? Esto es para ti ✂️

Reservas online, membresías con cobro mensual para tus socios y tu página propia con QR para compartir. Crear la cuenta y preparar tu página es gratis; los planes van desde 12,99 € al mes + IVA.

Da de alta tu barbería en chairio.es/para-barberias

#chairio #barberia #barbershop #barbero #barberiacartagena #cartagena #regiondemurcia #negociolocal
```

---

## 8. Lista de comprobación

- [ ] Foto de perfil
- [ ] Usuario y nombre
- [ ] Biografía
- [ ] 2 enlaces con UTM
- [ ] Categoría y botón de email
- [ ] Autenticación en dos pasos y códigos de recuperación
- [ ] Preguntas frecuentes y respuestas guardadas en mensajes
- [ ] Filtros de comentarios
- [ ] 5 destacadas con portada y sus historias (`historias/`)
- [ ] 3 posts fijados
- [ ] (Web) Enlace a Instagram en el pie de chairio.es y en los datos estructurados (`sameAs`), para SEO
