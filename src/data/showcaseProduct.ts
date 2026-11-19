import type { CatalogEntry, ShowcaseProduct } from '../types/product'

export const showcaseProduct: ShowcaseProduct = {
  id: 'af1-white-gold',
  brand: 'Nike',
  name: 'Air Force 1',
  edition: 'White Gold Charm',
  monogram: 'AF1',
  modelUrl: `${import.meta.env.BASE_URL}models/atelier_af1_gold_hero_lossless_v002.glb`,
  dimensions: { length: 0.3, width: 0.108559, height: 0.139203 },
  credit: {
    author: 'Riaan Fitzgerald',
    source: 'https://skfb.ly/pNW7X',
    changes: 'Escala, orientación y centrado ajustados; intensidad emisiva reducida de 1 a 0. Compresión sin pérdida con Meshopt y conversión de una textura a WebP sin pérdida; geometría, UV y resoluciones conservadas.',
  },
  description: 'Una silueta inconfundible. Blanco sobre blanco, líneas limpias y una moneda dorada que cambia el acento de un clásico.',
  details: [
    { label: 'Color', value: 'Blanco / Dorado' },
    { label: 'Detalle', value: 'Moneda colgante' },
    { label: 'Perspectiva', value: 'Exploración 360°' },
  ],
  // UI demonstration only; these values are not stock or verified product sizing.
  previewSizes: [38, 39, 40, 41, 42, 43, 44, 45],
}

export const catalogEntries: readonly CatalogEntry[] = [
  { kind: 'product', product: showcaseProduct },
  { kind: 'product', product: {
    id: 'sneaker-graffiti', brand: 'Nike', name: 'Sneaker Graffiti', edition: 'Color en movimiento', monogram: 'SG',
    description: 'La silueta urbana como lienzo. Trazos de color, contrastes y una textura vivida invitan a descubrir cada ángulo.',
    modelUrl: `${import.meta.env.BASE_URL}models/atelier_sneaker_graffiti_lossless_v002.glb`,
    dimensions: { length: 0.3, width: 0.111810, height: 0.139777 },
    credit: { author: 'McLogics', source: 'https://sketchfab.com/3d-models/sneaker-727370d6df3e47bfabc30ac1b10fb445', changes: 'Escala, orientación y centrado ajustados. Compresión sin pérdida con Meshopt y conversión de 30 texturas a WebP sin pérdida; geometría, UV y resoluciones conservadas.' },
    details: [{ label: 'Acabado', value: 'Gráfico multicolor' }, { label: 'Detalle', value: 'Textura original' }, { label: 'Perspectiva', value: 'Exploración 360°' }],
    previewSizes: showcaseProduct.previewSizes,
  } },
  { kind: 'product', product: {
    id: 'carapace-01', brand: 'Diseño conceptual', name: 'CARAPACE 01', edition: 'Futuristic Exoskeleton', monogram: 'C01',
    description: 'Una estructura escultórica que envuelve el pie. Volúmenes orgánicos y una silueta elevada exploran otra forma de imaginar la zapatilla.',
    modelUrl: `${import.meta.env.BASE_URL}models/atelier_carapace_01_lossless_v002.glb`,
    dimensions: { length: 0.3, width: 0.110134, height: 0.176864 },
    credit: { author: 'Atahan DANACI', profileName: '6', source: 'https://skfb.ly/pP7Gp', changes: 'Escala, orientación y centrado ajustados. Compresión sin pérdida con Meshopt y conversión de dos texturas a WebP sin pérdida; geometría, UV y resoluciones conservadas.' },
    details: [{ label: 'Forma', value: 'Exoesqueleto' }, { label: 'Detalle', value: 'Volumen escultórico' }, { label: 'Perspectiva', value: 'Exploración 360°' }],
    previewSizes: showcaseProduct.previewSizes,
  } },
]
