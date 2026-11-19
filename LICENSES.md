# Licencias de los modelos 3D

## Verificación del 19 de noviembre de 2026

**Las tres publicaciones declaran actualmente CC BY 4.0, verificado mediante la API pública oficial de Sketchfab.** Coincide con `asset.extras.license` de los tres GLB originales. Las páginas HTML no fueron accesibles mediante la herramienta web (incluidos HTTP 403), pero la consulta HTTPS directa a la API sí respondió. La revisión de licencia y descripción finalizó a las 16:21:47 UTC. Esto sustituye el estado anterior de licencia pendiente; no se basa únicamente en metadatos locales.

Los tres endpoints devolvieron `license.slug: by`, `license.label: CC Attribution`, `license.url: http://creativecommons.org/licenses/by/4.0/` e `isDownloadable: true`. UID, título y `viewerUrl` coinciden con los originales. Las URL siguientes fueron extraídas literalmente de `asset.extras.source`, no deducidas del nombre de archivo; el UID es su sufijo de 32 caracteres, confirmado por la API.

| Modelo | Autor actual / crédito | Publicación original y revisión manual | Licencia | Estado / pendiente |
| --- | --- | --- | --- | --- |
| Air Force 1 | Riaan Fitzgerald | [Obra](https://sketchfab.com/3d-models/nike-air-force-1-white-with-gold-coin-charm-1a9c71c276a44a71ba2f19f2ecaeb793) | CC BY 4.0 | Verificada por API; conservar atribución |
| Sneaker Graffiti | McLogics, usuario fec00752 | [Obra](https://sketchfab.com/3d-models/sneaker-727370d6df3e47bfabc30ac1b10fb445) | CC BY 4.0 | Verificada por API; fec00752 sigue siendo el usuario del autor |
| CARAPACE 01 | Atahan DANACI; perfil «6», usuario Atahan3D | [Obra](https://sketchfab.com/3d-models/carapace-01-futuristic-exoskeleton-sneaker-39c3463488a7463c8d4abf8ef864f8fc) | CC BY 4.0 | Verificada por API; crédito público alineado |

## Identidad de los archivos

Originales en `assets-source/sneakers/`; activos en `public/models/`, según `src/data/showcaseProduct.ts`. Solo se leyeron los originales.

### Air Force 1

- Original: `nike_air_force_1_white_with_gold_coin_charm.glb`.
- Activo: `atelier_af1_gold_hero_lossless_v002.glb`.
- Título original: `Nike Air Force 1 White with Gold Coin Charm`.
- Autor en metadatos: `Riaan Fitzgerald (https://sketchfab.com/FitzgeraldCreativeStudios)`; coincide con la cuenta actual.
- UID: `1a9c71c276a44a71ba2f19f2ecaeb793`.
- [Evidencia API oficial](https://api.sketchfab.com/v3/models/1a9c71c276a44a71ba2f19f2ecaeb793).
- SHA-256 original: `a5ddd247bcc31de0081c8c3ac88202bf4c579ab9e5c9cec741e7fd5ff84a9e6d`.

### Sneaker Graffiti

- Original: `sneaker.glb`.
- Activo: `atelier_sneaker_graffiti_lossless_v002.glb`.
- Título original: `Sneaker`; «Sneaker Graffiti» es el nombre del catálogo local.
- Autor en metadatos: `fec00752 (https://sketchfab.com/fec00752)`; la API mantiene ese usuario y muestra ahora `McLogics` como nombre visible.
- UID: `727370d6df3e47bfabc30ac1b10fb445`.
- [Evidencia API oficial](https://api.sketchfab.com/v3/models/727370d6df3e47bfabc30ac1b10fb445).
- SHA-256 original: `3feb5a2762849f5cde38e63f56f7c05dcef96f77903e7861b0f57292d9400b6c`.

### CARAPACE 01

- Original: `carapace_01__futuristic_exoskeleton_sneaker.glb`.
- Activo: `atelier_carapace_01_lossless_v002.glb`.
- Título original: `CARAPACE 01 // Futuristic Exoskeleton Sneaker`.
- Autor en metadatos: `6 (https://sketchfab.com/Atahan.Danaci)`. La API conserva el nombre visible `6`, con usuario actual `Atahan3D` y perfil `https://sketchfab.com/Atahan3D`.
- UID: `39c3463488a7463c8d4abf8ef864f8fc`.
- [Evidencia API oficial, incluida la descripción](https://api.sketchfab.com/v3/models/39c3463488a7463c8d4abf8ef864f8fc).
- SHA-256 original: `42db5913f6a6834b4905eac60d0e4c865c7b9a32bcb0ea942f56cccfd2393b3f`.
- La descripción solicita expresamente: **«Credit required: Atahan DANACI»**. Autoriza uso personal y comercial con atribución y pide no redistribuir ni revender la obra presentándola como propia. La frase está cualificada por esa apropiación de autoría; no se registra como una prohibición general de compartir bajo CC BY.

## Condiciones y atribución comprobadas

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) permite compartir y adaptar, también comercialmente, manteniendo el crédito, el enlace a la licencia y la indicación de cambios. Deben conservarse los avisos suministrados y no imponerse restricciones adicionales ni sugerirse patrocinio. [Texto legal, secciones 2 y 3](https://creativecommons.org/licenses/by/4.0/legalcode.en).

No se encontró una cláusula NC, ND ni una prohibición general de redistribución en las licencias o descripciones consultadas. Air Force 1 y Sneaker no presentan instrucciones adicionales de atribución en sus descripciones. CARAPACE sí exige el nombre indicado arriba. La comprobación identifica la licencia ofrecida por el publicador; no acredita derechos de marca, que CC BY no concede.

`src/data/showcaseProduct.ts` centraliza las atribuciones y `src/components/layout/ShowroomFooter.tsx` las presenta para las tres zapatillas en el desplegable accesible «Créditos 3D», cerrado inicialmente. Incluye autor, enlace a la obra, enlace a CC BY 4.0 e indicación de modificaciones. El pie indica que el showroom es independiente y no afiliado a Nike. Se reutiliza la verificación anterior; no se repitió la investigación de licencias.

- Air Force 1: **Riaan Fitzgerald**, [obra](https://skfb.ly/pNW7X).
- Graffiti: **McLogics** (usuario fec00752), [obra](https://sketchfab.com/3d-models/sneaker-727370d6df3e47bfabc30ac1b10fb445).
- CARAPACE: **Atahan DANACI**, perfil de Sketchfab **6**, [obra](https://skfb.ly/pP7Gp). El nombre solicitado ya figura en la web.
- Enlace de licencia para las tres: https://creativecommons.org/licenses/by/4.0/. Los enlaces cortos de las obras fueron proporcionados expresamente por el usuario para esta integración; se conservan también las URL originales verificadas en la tabla anterior. No se incluyen parámetros de seguimiento.

Modificaciones indicadas en la web y documentadas en el proyecto: escala, orientación y centrado para los tres; intensidad emisiva de Air Force 1 reducida de 1 a 0; compresión sin pérdida con Meshopt y conversión a WebP sin pérdida de una textura en Air Force 1, 30 en Graffiti y dos en CARAPACE. Se conservaron geometría, UV y resoluciones. Conservar este registro junto a cualquier distribución de los GLB.

## Estado de publicación

La verificación de las tres licencias está resuelta por fuente oficial y las atribuciones solicitadas están integradas. `.gitignore` permite únicamente los tres GLB activos identificados en este documento; excluye originales, versiones antiguas y trabajo Blender. El usuario autorizó el primer commit local después de las validaciones, sin crear remoto ni ejecutar push. La publicación en Vercel queda para otra etapa.
