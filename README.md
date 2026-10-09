# LSG — Luxury Selection Gallery

Web catálogo de LSG. Next.js 14 + Tailwind CSS. Sin checkout: cada pieza se consulta por WhatsApp.

## Cómo agregar o editar piezas

Todo está en **`data/pieces.json`**. Cada pieza es un bloque así:

```json
{
  "slug": "loewe-puzzle-small-tan",
  "numero": 10,
  "marca": "Loewe",
  "nombre": "Puzzle Bag Small Tan",
  "categoria": "Bolsos",
  "talle": "Único",
  "condicion": "Impecable",
  "precio": 2100,
  "estado": "disponible",
  "badge": "Pieza única",
  "destacada": true,
  "descripcion": "Texto corto sobre la pieza.",
  "detalles": ["Cuero de becerro", "Incluye dust bag"],
  "fotos": ["/piezas/loewe-puzzle-small-tan-1.jpg", "/piezas/loewe-puzzle-small-tan-2.jpg"]
}
```

| Campo | Qué poner |
|---|---|
| `slug` | Identificador para la URL: minúsculas, sin espacios ni tildes, con guiones. Tiene que ser único. |
| `numero` | Número de la pieza en la galería (se muestra como Nº 010). |
| `categoria` | Calzado, Buzos, Remeras, Tejidos, Pantalones, Abrigos, Bolsos o Accesorios (podés crear otras). |
| `talle` | Ej. `M`, `42`, `32` o `Único`. |
| `condicion` | `Nueva`, `Impecable` o `Con uso`. |
| `precio` | Número en USD, sin puntos ni símbolos (ej. `2100`). |
| `estado` | `disponible`, `reservada` o `vendida` (las vendidas pasan al "archivo"). |
| `badge` | Texto del sello dorado (ej. `"Pieza única"`, `"Edición limitada"`) o `null` para no mostrar ninguno. |
| `destacada` | `true` para que aparezca en "En sala ahora" de la home. |
| `fotos` | Rutas a las fotos dentro de `public/piezas/`. La primera es la portada. |

**Ojo con las comas:** cada bloque va separado por una coma, menos el último.

## Fotos

1. Subí tus fotos a la carpeta `public/piezas/` (JPG o WebP, idealmente vertical 4:5, ej. 1200×1500).
2. Poné las rutas en el campo `fotos` de la pieza: `"/piezas/nombre-de-tu-foto.jpg"`.
3. Podés borrar las fotos de ejemplo cuando ya no las uses.

## WhatsApp y redes

En **`data/site.json`**: número de WhatsApp (solo dígitos, con 549 adelante), Instagram y TikTok.

## Editar desde GitHub (sin instalar nada)

Entrá al repo, abrí `data/pieces.json`, tocá el lápiz ✏️, editá y guardá con "Commit changes". Vercel publica los cambios solo en 1–2 minutos.

## Vista 360° (opcional, por pieza)

1. Sacá entre 24 y 36 fotos de la pieza girándola sobre una base giratoria: misma distancia, misma luz y la cámara fija. Cada foto, un pequeño giro (36 fotos = 10° cada una).
2. Nombralas `01.jpg`, `02.jpg`, … `36.jpg` (formato cuadrado, ideal 1000×1000, fondo oscuro).
3. Subilas a una carpeta, por ejemplo `public/piezas/mi-zapatilla/360/`.
4. En la pieza, agregá:

```json
"vista360": { "carpeta": "/piezas/mi-zapatilla/360", "cuadros": 36, "extension": "jpg" }
```

La ficha muestra la vista 360° (se gira arrastrando o con la barra) y un botón para pasar a las fotos.

## Video e imágenes de fondo

En `data/site.json`:

- `heroVideos`: lista de clips del video del inicio. Se reproducen en orden; cada uno tiene versión `desktop` (computadora) y `mobile` (celular).
- `imagenMirada` y `imagenEncargos`: imágenes de fondo de esas secciones.

Hoy apuntan a material de [Pexels](https://www.pexels.com/license/) (licencia libre para uso comercial). Para usar los tuyos, subí los archivos a `public/media/` y cambiá la ruta, por ejemplo `"desktop": "/media/mi-video.mp4"`. Recomendado: video horizontal, corto (10–20 s), sin audio y de menos de 8 MB.

## Correr en local (opcional)

```bash
npm install
npm run dev
```
