# AVANCE — ATELIER SNEAKERS

Fecha: 2026-11-19.

## Organización inicial completada

- Organización de directorios completada. De las 17 rutas solicitadas, se crearon 16; `public/models/` ya existía. Se crearon además los cuatro directorios de las skills.
- Rutas disponibles: `.agents/skills/`, `assets-source/sneakers/`, `blender/work/`, `blender/exports/`, `public/models/`, `public/images/`, `public/environments/`, `src/scene/`, `src/components/layout/`, `src/components/product/`, `src/animations/`, `src/store/`, `src/data/`, `src/hooks/`, `src/utils/`, `src/types/` y `tests/`.
- Los nueve GLB se trasladaron de `assets-source/` a `assets-source/sneakers/` sin conflictos. Recuento inicial: 9; recuento final en destino: 9; GLB restantes en la raíz de origen: 0.
- Nombres, extensiones, tamaños y hashes SHA-256 coinciden antes y después. No se modificaron geometría, materiales ni texturas; no se ejecutaron optimizaciones.
- `AGENTS.md` y `AVANCE.md` no existían: creados como archivos Markdown.
- Creadas las cuatro skills locales: `sneaker-model-prep`, `glb-optimization`, `sneaker-showcase` y `visual-qa`.
- `.gitignore` conserva las reglas existentes para `node_modules` y `dist`; se añadieron originales, respaldos de Blender y temporales.
- Interfaz y dependencias sin cambios. Sin reinstalaciones, commits ni push.
- Las carpetas vacías existen localmente; Git no registra directorios vacíos.

## Verificación

- Integridad de modelos: 9 de 9 SHA-256 idénticos.
- Skills: los cuatro `SKILL.md` superaron la validación estructural de frontmatter, nombre, descripción, cuerpo y ausencia de marcadores pendientes, además de revisión de alcance y protección de originales. El validador oficial `quick_validate.py` no pudo ejecutarse por falta de PyYAML; se utilizó una comprobación alternativa con la biblioteca estándar de Python, sin instalar dependencias.
- Estructura: comprobadas las 17 carpetas solicitadas y ambos documentos como archivos.
- Git: `git status --short` y `git rev-parse --is-inside-work-tree` funcionan; `git diff --check` no reportó errores sobre cambios rastreados. Los archivos del proyecto aparecen todavía sin seguimiento, como en la inspección inicial; no se añadieron al índice ni se crearon commits.
- Exclusiones: `git check-ignore` confirmó originales, `node_modules/`, `dist/`, respaldos `.blend1`/`.blend2` y temporales.
- Compilación: `npm run build` completado correctamente (TypeScript y Vite; 20 módulos transformados). Solo se regeneraron los artefactos de compilación previstos; código de interfaz y dependencias sin editar.

## Registro SHA-256

Los siguientes valores se calcularon antes y después del traslado y resultaron idénticos.

| Archivo | Bytes | SHA-256 antes = después |
| --- | ---: | --- |
| 3d_shoe.glb | 25027144 | `2EA5083093A4EF371386FFDDCF63C465CF814A23539BB9576EF85E2897F7778A` |
| air_force.glb | 9640148 | `39813C95D694EC91B5CBF4087D5D232594D1359BE2F21A6136988C7DF523822F` |
| carapace_01__futuristic_exoskeleton_sneaker.glb | 43484436 | `42DB5913F6A6834B4905EAC60D0E4C865C7B9A32BCB0EA942F56CCCFD2393B3F` |
| modern_casual_sneakers.glb | 70442052 | `7650A97624551472358771B27D7071E4D32575862F898E136B1D9CB26F99B681` |
| nike_air_force_1_white_with_gold_coin_charm.glb | 22799668 | `A5DDD247BCC31DE0081C8C3AC88202BF4C579AB9E5C9CEC741E7FD5FF84A9E6D` |
| nike_air_uptempo_sneaker3d_scanned_low_poly.glb | 8402400 | `5F30A15F3137B83A28E39310DA6BB3B8FDC135744CECA3CE8ED5473FDEBC85B9` |
| nike_running_shoe.glb | 15192592 | `951D4FCBCD359B2A135F4D1236E7D556A4F6BF7DB39F00B94FD4319ED5AFEF68` |
| on_cloudrunner_whiteorange.glb | 42424296 | `2CBD3312950A85FDF7305F9D72560F108AEC585B04BFEE4EE733682EF6F4E02E` |
| sneaker.glb | 15997940 | `3FEB5A2762849F5CDE38E63F56F7C05DCEF96F77903E7861B0F57292D9400B6C` |

## Preparación inicial: protagonista v001 en Blender

- Modelo seleccionado por el usuario: `assets-source/sneakers/nike_air_force_1_white_with_gold_coin_charm.glb`.
- Blender MCP conectado a Blender 5.3.0. Importación en una escena independiente, conservando la escena previa.
- Copia guardada sin sobrescrituras en `blender/work/atelier_af1_gold_hero_v001.blend` (56.409.326 bytes). El archivo contiene únicamente la escena de trabajo y sus recursos, con cuatro texturas 2048×2048 empaquetadas y notas internas de trazabilidad.
- Preparación mediante objetos padre, sin aplicar transformaciones a los vértices: escala uniforme 0,1580041735; giro de 180° sobre Z de Blender y traslación del centro de la caja envolvente al origen.
- Dimensiones de presentación: 0,300000 × 0,108559 × 0,139203 m (largo × ancho × alto). Los 30 cm son una referencia de presentación, no una medida física verificada.
- En Blender: punta +X, vertical +Z y lateral con moneda hacia -Y. Con la conversión estándar glTF Y-up prevista: punta +X, vertical +Y y moneda hacia +Z; dimensiones XYZ de 0,300000 × 0,139203 × 0,108559 m. No se ha exportado ningún GLB.
- Control `ATELIER_AF1_GOLD` en (0, 0, 0), escala (1, 1, 1); normalización reversible en `AF1_Normalization`. Centro de la caja envolvente en el origen, con tolerancia numérica inferior a 0,000001 m; no se ha apoyado la suela en el plano cero.
- Revisadas las vistas lateral, frontal, superior y tres cuartos en previsualización de materiales. Cordones, suela y moneda dorada conservados.
- Verificación posterior: coordenadas y topología de las tres mallas (257.984 triángulos), UV, asignaciones, nodos y valores del material, y bytes de las cuatro texturas empaquetadas coinciden con el estado importado. SHA-256 del GLB original sin cambios.
- Material `material_0` sin modificar. Mapa emisivo `Image_2` conectado con intensidad 1,0; puede reducir el contraste del blanco bajo iluminación de estudio.
- Propuesta pendiente de autorización: cambiar únicamente `Emission Strength` de 1,0 a 0,0, conservando el mapa y el resto del material. No aplicada.
- Sin Decimate, Remesh, reducción de texturas, cambios web ni exportaciones. No se requiere recompilar la web para esta preparación de Blender.

## Exportación completada: v002 y primer GLB funcional

- Nueva copia independiente: `blender/work/atelier_af1_gold_hero_v002.blend` (56.425.497 bytes). Se cargó v001 desde disco en una escena separada; no se sobrescribió v001 ni se modificó el original descargado.
- Corrección autorizada aplicada: únicamente `Emission Strength` de 1,0 a 0,0. Comparación de nodos, conexiones y valores confirma que no hay otros cambios PBR.
- GLB validado: `public/models/atelier_af1_gold_hero_v002.glb`, 22.655.072 bytes (22,66 MB decimales). Se conserva el exportado nativo idéntico en `blender/exports/atelier_af1_gold_hero_v002_blender.glb`.
- SHA-256 del GLB publicado: `d52a9890122fd2932f2767c11ab5f31e33a2db2a19b39e19280bdf978972725f`.
- SHA-256 de v001, sin cambios: `6e28a07b58dd2a16cff409d730e943e4efc38a8559c8e191c79d84eba9894af8`. SHA-256 de v002: `5f18726de0611de6dea29bbd888924dc6b6229ff3cc4928a05e7b1693c355a47`. Original GLB verificado contra su hash registrado.
- Conservados: tres mallas, 257.984 triángulos, cinco capas UV y cuatro texturas 2048×2048. Los bytes de las cuatro imágenes exportadas son idénticos a los empaquetados en la copia de Blender, incluido el mapa emisivo desactivado.
- Comparación de cada esquina de triángulo y de las cinco capas UV entre Blender y GLB: error máximo 0. El exportador separa 425 vértices adicionales para atributos por esquina (150.109 en GLB); no altera la geometría ni reduce detalle.
- Emisión efectiva nula en Three.js: el GLB omite `emissiveFactor`, cuyo valor predeterminado es negro. Conserva `emissiveTexture`; que Three.js muestre intensidad predeterminada 1 no implica emisión cuando el color emisivo es (0, 0, 0).
- Orientación y escala verificadas en Three.js: punta +X, vertical +Y, moneda hacia +Z; dimensiones XYZ aproximadas 0,300000 × 0,139203 × 0,108559 m, centro en el origen dentro de tolerancia 0,000001 m.
- QA visual de Blender: lateral, frontal, superior y tres cuartos; blanco, cordones, suela, sombreado y detalle dorado conservados tras la corrección.
- Validación local con Three.js y GLTFLoader ya instalados: carga y render de las cuatro texturas correctos. Comparación en tres vistas con la referencia original normalizada y emisión desactivada: diferencia RGB media máxima 0,1061 sobre 255, visualmente equivalente. La copia en `public/models/` es idéntica por SHA-256 al archivo probado.
- El aviso del exportador sobre muestreo de texturas no produce cambios efectivos: filtros idénticos y repetición predeterminada equivalente al original. La página temporal registró un 404 de recurso auxiliar, sin afectar la carga del GLB ni sus texturas.
- Notas internas `ATELIER_V002_VALIDATION.json` incluidas en el `.blend`, con hashes, verificación y atribución original: Riaan Fitzgerald, CC-BY-4.0, fuente Sketchfab registrada.
- Sin Decimate, Remesh, reducción de texturas, compresión destructiva, dependencias nuevas, cambios de diseño web ni push. No se recompiló la web porque solo se prepararon recursos.

## Primera escena 3D funcional completada

- Implementada la página mínima en React + TypeScript + R3F + Drei, con Tailwind ya instalado. Fondo beige cálido, jerarquía tipográfica sencilla, una sola zapatilla y créditos del modelo.
- `src/scene/ShowcaseViewer.tsx`: Canvas, indicador de carga, recuperación de errores, detección de WebGL 2, controles accesibles y pausa de movimiento.
- `src/scene/ShowcaseScene.tsx`: composición de modelo, luces, sombra y controles. `SneakerModel.tsx`: useGLTF con Suspense y flotación vertical de ±1,8 mm sobre un desplazamiento de presentación de 8 mm; no modifica geometría, materiales ni transformaciones internas del GLB.
- `src/scene/StudioLighting.tsx`: hemisferio y luz direccional suave, entorno de reflejos generado localmente una sola vez a resolución 128. `ContactShadows` a resolución 256, calculada una sola vez; sin postprocesado ni HDRI externo.
- `src/scene/ShowcaseControls.tsx` y `showcaseConfig.ts`: cámara de tres cuartos que muestra el lateral con moneda, encuadre adaptable, órbita horizontal completa y zoom acotado. El objetivo de cámara se desplaza 12 mm hacia abajo para encuadrar la sombra; la escala de la zapatilla se mantiene intacta.
- `src/hooks/useReducedMotion.ts`: preferencia del sistema reactiva. Se desactivan flotación y amortiguación con movimiento reducido; el Canvas renderiza bajo demanda al pausar o reducir el movimiento.
- Renovados `src/App.tsx`, `src/App.css` y `src/index.css`. Fuera de `src/`: solo configuración mínima de Tailwind en `vite.config.ts`, metadatos/idioma/icono embebido en `index.html` y este registro. Sin dependencias nuevas, catálogo, carrito ni modelos adicionales.
- `npm run build` completado después de los últimos cambios. Advertencia no bloqueante: bundle JavaScript cercano a 1,30 MB (aprox. 362 kB gzip), superior al umbral de 500 kB; no se ha optimizado el modelo.
- Revisión visual con Edge local en segundo plano: escritorio 1440 px y móvil emulado 390 px. Zapatilla y moneda visibles, blanco con sombreado, sin desbordamiento horizontal. El navegador integrado no pudo iniciarse por un error del entorno aislado; se utilizó Edge mediante Playwright ya instalado.
- Pruebas completadas: carga lenta con indicador visible; carga de las tres mallas y 257.984 triángulos; giro completo; arrastre; rueda; botones de zoom y ambos límites; restablecer; teclado; flotación; pausa; cambios dinámicos de prefers-reduced-motion; pellizco y giro táctiles emulados; fallo de carga y reintento satisfactorio.
- En la carga normal: cero errores de navegador, cero respuestas HTTP fallidas y cero solicitudes a recursos externos. Se verificaron SHA-256 del GLB publicado y de ambos `.blend`: intactos.
- Límites de validación: no se probó en teléfonos físicos, Safari/Firefox ni con red móvil real. El recurso sigue pesando 22,66 MB; falta evaluar rendimiento en hardware móvil real. La sombra estática aproxima la flotación sutil.

## Primera interfaz editorial premium completada

- Reutilizado `ShowcaseViewer` sin modificar ninguno de los seis archivos de `src/scene/`: iluminación, materiales, orientación, cámara, controles y flotación intactos. Solo se ajusta el tamaño del contenedor mediante CSS para la nueva distribución.
- `src/components/layout/ShowroomHeader.tsx` y `ShowroomFooter.tsx`: cabecera minimalista, navegación por anclas (Showroom, La pieza, Archivo) y créditos existentes. Los créditos se despliegan sin aumentar la altura de la página en escritorio.
- `src/components/product/ProductPanel.tsx` y `SizeSelector.tsx`: nombre, descripción, detalles y selector EU con radios nativos, navegación por teclado y estado local. Las tallas se presentan explícitamente como selección visual sin disponibilidad confirmada; no se utiliza Zustand porque no hay estado compartido que lo requiera.
- `src/components/product/CatalogPanel.tsx` y `CatalogCard.tsx`: panel derecho translúcido, tarjeta de la pieza actual y dos espacios claramente pendientes. No se inventan productos ni precios y no se solicitan otros GLB. La tarjeta actual enlaza al visor.
- `src/types/product.ts` y `src/data/showcaseProduct.ts`: datos tipados separados de la presentación; las tarjetas admiten imagen y datos reales cuando estén disponibles. Las tarjetas pendientes no ejecutan ninguna carga ni acción de compra.
- `src/animations/useEditorialEntrance.ts`: entradas GSAP de opacidad y desplazamiento de 12 px, con limpieza de estilos y respeto dinámico de prefers-reduced-motion. No se anima ni reconstruye la escena 3D desde esta capa.
- Actualizados `src/App.tsx` y `src/App.css`: tres columnas en escritorio y visor primero en móvil; beige, crema y acentos dorados. Ninguna dependencia nueva, backend, carrito, pagos ni publicación.
- `npm run build` completado tras los ajustes finales. Permanece la advertencia no bloqueante de tamaño del bundle (aproximadamente 1,37 MB, 391 kB gzip); no se realizaron optimizaciones de modelos.
- QA local con Edge: sin desplazamiento horizontal o vertical en 1440×900, 1366×768 y 1280×720. Revisados también 1024×768, 390×844 y 320×740: sin desbordamiento horizontal, con desplazamiento vertical necesario para el contenido apilado. Inspección visual de escritorio y móvil completada.
- Comprobados: selector de talla por clic y teclado, confirmación visual, navegación por anclas, enlace del archivo al visor, giro, zoom, restablecimiento y arrastre. Cambiar talla no reinicia la cámara. Se solicita un solo GLB; no hubo errores de ejecución ni respuestas fallidas en la carga normal.
- Entradas GSAP verificadas desde opacidad parcial hasta opacidad 1, con transformaciones temporales eliminadas. Al activar movimiento reducido, todos los paneles permanecen visibles sin animación.
- Integridad: los seis archivos de `src/scene/`, el GLB publicado y las versiones Blender v001/v002 conservan exactamente sus hashes previos a esta etapa.
- Pendiente de validación adicional: dispositivos móviles físicos y navegadores distintos de Edge; no forman parte de las pruebas emuladas completadas.

## Dos modelos adicionales preparados

- Copias independientes guardadas con escenas y texturas empaquetadas: `blender/work/atelier_sneaker_graffiti_v001.blend` y `blender/work/atelier_carapace_01_v001.blend`. Cada archivo incluye un registro interno de preparación, validación, hashes y atribución original (CC-BY-4.0).
- Normalización reversible mediante objetos Empty: longitud de 30 cm, punta hacia +X y centro geométrico de la caja envolvente en el origen. Se conservan las transformaciones internas; no se aplicaron cambios a geometría ni materiales. Los GLB utilizan Y como eje vertical.
- Sneaker: dimensiones largo × ancho × alto de **30 × 11,18 × 13,98 cm**; 11 mallas, 123.740 triángulos, 11 materiales y 30 texturas de 2048 × 2048. Exportación de prueba: `blender/exports/atelier_sneaker_graffiti_v001.glb`, **16.476.608 bytes (16,48 MB)**.
- CARAPACE 01: dimensiones de **30 × 11,01 × 17,69 cm**; 5 mallas, 309.587 triángulos, un material y dos texturas de 4096 × 4096. Exportación de prueba: `blender/exports/atelier_carapace_01_v001.glb`, **47.970.348 bytes (47,97 MB)**. No incluye mapa normal en el original; se conserva su configuración PBR.
- Apariencia revisada en Blender desde lateral, frontal, superior y tres cuartos. No se detectaron problemas que requirieran corregir materiales. Se mantienen los detalles y el acabado original de ambos modelos.
- Validación de los GLB exportados: posiciones de vértices y UV equivalentes, mismo número de triángulos y materiales, factores PBR y transformación de textura conservados, dimensiones y centrado verificados. Texturas con idénticos píxeles y resolución: dos PNG de Sneaker fueron recodificados sin pérdida por el exportador; los otros 30 archivos de imagen de ambos modelos conservan sus bytes originales.
- SHA-256 de los originales verificados antes y después, sin cambios: `sneaker.glb` = `3feb5a2762849f5cde38e63f56f7c05dcef96f77903e7861b0f57292d9400b6c`; `carapace_01__futuristic_exoskeleton_sneaker.glb` = `42db5913f6a6834b4905eac60d0e4c865c7b9a32bcb0ea942f56cccfd2393b3f`.
- Verificados por SHA-256 los 27 archivos preexistentes protegidos de `src/`, Blender y `public/models/`: intactos. No se modificó la interfaz ni la Air Force 1; no se integraron modelos, instalaron dependencias ni realizaron optimizaciones. No se ejecutó build porque no hubo cambios web.
- Pendiente: evaluar rendimiento web antes de integrar estas pruebas, especialmente CARAPACE por su peso y densidad, y Sneaker por sus 30 mapas 2K. No se ha comprobado su carga en el visor; esta etapa solo prepara los recursos.

## Catálogo interactivo de tres zapatillas completado

- Integrados Air Force 1, Sneaker Graffiti y CARAPACE 01 en las tarjetas existentes. Los dos derivados nuevos se copiaron a `public/models/atelier_sneaker_graffiti_v001.glb` (16.476.608 bytes) y `public/models/atelier_carapace_01_v001.glb` (47.970.348 bytes), con SHA-256 idénticos a sus fuentes de `blender/exports/`.
- `src/types/product.ts` y `src/data/showcaseProduct.ts`: datos tipados con modelo, dimensiones en metros, descripción y atribución. `src/App.tsx` comparte la selección entre visor, ficha, catálogo y créditos; no se añadió un store innecesario. Las tarjetas son botones accesibles con estado seleccionado. Las tallas conservan su carácter de demostración visual.
- Reutilizados `CatalogPanel`, `CatalogCard`, `ShowroomFooter` y los componentes de `src/scene/`. Se mantiene la iluminación y la escala física de cada GLB; la distancia de cámara y la altura de la sombra se ajustan a las dimensiones del producto. Solo se modificaron detalles de CSS necesarios para tarjetas, carga y ajuste a escritorio de poca altura.
- `src/animations/useModelTransition.ts`: salida GSAP de 180 ms, estado de carga y entrada de 320 ms cuando el modelo está disponible. Movimiento reducido elimina estas duraciones y la flotación. Las selecciones durante la salida sustituyen el destino pendiente.
- `src/scene/useSelectedModel.ts`: carga bajo demanda con fetch cancelable y GLTFLoader; un solo modelo montado, sin precarga ni caché de tres escenas. Los resultados tardíos se descartan y liberan. El modelo saliente se separa del render antes de liberar geometrías, materiales, texturas e ImageBitmap. Los recursos de la sombra se reutilizan.
- QA con Edge local: carga y selección de los tres modelos, actualización de nombre/descripción/créditos, talla visual conservada, salida/carga/entrada, cambios rápidos, cancelación de una descarga pendiente, error HTTP simulado y reintento, foco de teclado, movimiento reducido, giro, zoom, arrastre, rueda y restablecimiento. Giro y pellizco táctiles emulados también comprobados.
- Revisión visual completada a 1440×900, 1280×720 y 390×844: materiales y detalles visibles, CARAPACE encuadrada, sin desbordamiento horizontal. Escritorio sin desplazamiento vertical; móvil con desplazamiento necesario para los paneles apilados. Corregido un desbordamiento de 16 px en escritorio bajo.
- Corregida y verificada la liberación de recursos durante cambios sucesivos: CARAPACE mantiene 9 geometrías y 8 texturas en el renderizador, incluidos los recursos de estudio, tanto en primera carga como después de recorrer el catálogo varias veces. Solo existe un Canvas y un grupo de producto montado. Las 5 mallas y 309.587 triángulos de CARAPACE y las 11 mallas y 123.740 triángulos de Graffiti se verificaron en la escena.
- `tests/catalog-interaction.mjs`: prueba de regresión con Playwright existente, ejecutable contra Vite local con `node tests/catalog-interaction.mjs`. Evidencias y verificaciones complementarias en `.tmp/` (ignorado por Git). En la versión compilada se verificó una única petición inicial de Air Force 1 y ninguna petición de Graffiti al seleccionar directamente CARAPACE. Sin errores de ejecución en carga normal.
- `npm run build` y `npm run lint` completados después de los cambios finales. Persiste la advertencia no bloqueante del bundle: aproximadamente 1,35 MB, 384 kB gzip. Git responde correctamente. SHA-256 de los 17 recursos preexistentes protegidos comprobados: originales, copias Blender, exportaciones y Air Force 1 publicados intactos.
- Pendiente: CARAPACE necesita evaluar una futura versión optimizada por sus 47,97 MB, 309.587 triángulos y mapas 4K; Graffiti también requiere evaluar sus 30 mapas 2K en móviles reales. No se comprimió ni optimizó ningún GLB. Las pruebas locales y los gestos emulados no sustituyen dispositivos físicos, redes móviles reales ni Safari/Firefox. Sin dependencias nuevas, carrito, backend ni push.

## Optimización sin pérdida integrada

- Aplicada la optimización autorizada mediante glTF Transform y herramientas ya instaladas. Fuentes activas anteriores: `public/models/atelier_af1_gold_hero_v002.glb`, `atelier_sneaker_graffiti_v001.glb` y `atelier_carapace_01_v001.glb`; todas conservadas intactas.
- Creada una primera pasada `lossless_v001` y una segunda `lossless_v002`, sin sobrescribir archivos. Solo se integró la segunda, con mejor peso. Derivados en `blender/exports/` y copias idénticas por SHA-256 en `public/models/`:

| Modelo | GLB integrado | Antes | Después | Reducción |
| --- | --- | ---: | ---: | ---: |
| Air Force 1 | `atelier_af1_gold_hero_lossless_v002.glb` | 22.655.072 bytes | 12.371.492 bytes | 45,39 % |
| Sneaker Graffiti | `atelier_sneaker_graffiti_lossless_v002.glb` | 16.476.608 bytes | 11.054.404 bytes | 32,91 % |
| CARAPACE 01 | `atelier_carapace_01_lossless_v002.glb` | 47.970.348 bytes | 31.202.200 bytes | 34,96 % |

- Técnica: compresión Meshopt de buffers sin cuantización ni filtros con pérdida; reordenación exacta de vértices/índices y eliminación de accessors duplicados; WebP sin pérdida únicamente cuando produce un archivo menor y los píxeles decodificados son idénticos. AF1 conserva tres PNG y convierte una textura; Graffiti convierte 30 y CARAPACE dos. Resoluciones 2K/4K originales intactas. Sin simplificación, Decimate, Remesh, reducción de triángulos ni cambios de materiales, UV o dimensiones.
- Comprobación estructural: atributos exactos por cada esquina de triángulo, misma conectividad y orientación de caras, mismos materiales PBR, samplers, transformaciones de textura y nodos. Meshopt puede rotar cíclicamente los índices de una cara sin modificarla; la validación contempla esa equivalencia. Reordenar buffers no altera sus valores ni las asociaciones UV.
- En la web solo se cambiaron las tres URLs de `src/data/showcaseProduct.ts` y se conectó el decodificador Meshopt incluido en Three.js dentro de `src/scene/useSelectedModel.ts`. Sin dependencias nuevas, CDN, cambios de interfaz, iluminación, encuadre ni sistema de transiciones. El catálogo mantiene un único modelo montado y libera los recursos salientes.
- Comparación A/B en el estudio existente: tres cuartos, lateral, superior, acercamiento y móvil emulado para cada modelo. Sin diferencias visuales apreciables en blanco, dorado, cordones, costuras, suelas, grafismos o exoesqueleto. La diferencia RGB media máxima entre capturas fue 0,041 sobre 255; pequeñas diferencias de rasterizado, con píxeles de textura idénticos. Vistas de escritorio 1440×900 y 1280×720 y móvil 390×844 correctas, sin desbordamiento horizontal.
- Tiempos desde petición hasta visor listo, con caché desactivada, Edge local y movimiento reducido. Una muestra por archivo y condición; cifras orientativas, no prueba estadística ni red móvil física:

| Modelo | HTTP local antes → después | 20 Mbps / 40 ms emulados antes → después |
| --- | ---: | ---: |
| Air Force 1 | 0,39 → 0,28 s | 9,43 → 5,43 s |
| Sneaker Graffiti | 1,79 → 1,30 s | 8,21 → 5,40 s |
| CARAPACE 01 | 0,82 → 0,86 s | 20,13 → 13,07 s |

- Muestreo interactivo de un segundo: aproximadamente 60 FPS tanto antes como después, en la GPU AMD local. No se atribuye una mejora de FPS; el beneficio medido es principalmente la transferencia. CARAPACE mostró 36 ms adicionales en la muestra local y unos 7 s menos con ancho de banda limitado. La resolución de las texturas en GPU y el número de triángulos no disminuyen.
- Validación final: `npm run build` y `npm run lint` correctos. `tests/catalog-interaction.mjs` actualizado y completado con los nuevos GLB: selección de tres piezas, ficha, transiciones, cambios rápidos, cancelación, fallo/reintento, rotación, zoom, teclado, movimiento reducido, memoria estable y distribución móvil. Comprobada también la carga de los tres modelos en la versión compilada: una petición por modelo seleccionado, sin recursos externos ni errores de ejecución.
- Git operativo. Verificados 20 hashes protegidos del registro, incluidos todos los GLB originales y archivos `.blend`; ningún cambio. Se conservan también todos los derivados anteriores. Persiste la advertencia no bloqueante del bundle de JavaScript: aproximadamente 1,38 MB, 392 kB gzip.
- Trazabilidad: `blender/work/optimize-catalog.mjs`, `blender/work/reorder-catalog.mjs`, `blender/exports/catalog-lossless-v001.json`, `catalog-lossless-v002.json` y `catalog-lossless-validation-v002.json`. Pruebas A/B y de transferencia en `tests/optimization-visual.mjs` y `tests/optimization-network.mjs`; capturas y mediciones detalladas en `.tmp/optimization/`, ignorado por Git.
- Las tres versiones v002 están integradas; ningún modelo quedó pendiente de integración. Las v001 son candidatos previos conservados, no activos. Pendiente: móviles físicos, redes reales y Safari/Firefox. CARAPACE sigue pesando 31,20 MB y Graffiti mantiene 30 mapas 2K; una futura reducción de memoria GPU requerirá otra decisión de calidad. No se aplicó compresión con pérdida ni se ejecutó push.

## Visor separado y render condicionado a visibilidad

- Aplicadas únicamente las dos optimizaciones autorizadas: separación del visor y pausa real del render oculto. Sin cambios en modelos, composición visual, resolución de texturas, dependencias ni cargador de GLB.
- `src/scene/LazyShowcaseViewer.tsx`: React.lazy + Suspense cargan automáticamente `ShowcaseViewer` en un chunk independiente. El fallback reutiliza el beige y el indicador existentes; reserva la altura del visor, controles e instrucciones. En la prueba de producción, posición y altura del fallback y del visor fueron idénticas (643,80 px de altura), sin salto de distribución. El fallo de descarga del chunk queda contenido en el visor y permite recuperar mediante recarga; no hay pasos adicionales en la carga normal.
- `src/App.tsx` utiliza el nuevo envoltorio. Vite genera exactamente dos chunks JavaScript, sin configuración manual de fragmentos:

| JavaScript | Antes, minificado / gzip | Después, minificado / gzip |
| --- | ---: | ---: |
| Entrada inicial | 1.378.480 / 388.101 bytes | 305.069 / 100.489 bytes |
| Visor automático independiente | Incluido en la entrada | 1.076.737 / 289.525 bytes |

- Reducción de la entrada inicial: aproximadamente 77,9 % minificada y 74,1 % gzip. Gzip medido con Node y confirmado en las respuestas de la vista previa compilada. El peso total del motor 3D no desaparece: su chunk se descarga automáticamente después de iniciar la interfaz. La advertencia de 500 kB permanece para el chunk 3D; la entrada inicial ya queda por debajo del umbral.
- `src/hooks/useViewerActivity.ts`: IntersectionObserver sobre el área del Canvas y suscripción a `visibilitychange`. `src/scene/ShowcaseViewer.tsx` conserva montado el Canvas y utiliza `frameloop="never"` cuando está fuera de pantalla o la pestaña está oculta; al volver invalida un cuadro. Conserva `always` para flotación visible y `demand` cuando está pausada o se solicita movimiento reducido. La visibilidad no reinicia ni modifica la preferencia de flotación.
- `src/scene/ShowcaseScene.tsx` transmite la actividad a `StudioLighting.tsx`. Se suspende también la generación del cubemap de Drei con `frames=0` mientras está oculto: esta captura se ejecutaba fuera del bucle principal y producía 18 cuadros al cambiar un modelo oculto. La corrección conserva el entorno montado y su apariencia, con cero cuadros en ese caso.
- Medición con Edge: aproximadamente 60 cuadros durante un segundo visible, cero durante un segundo fuera de pantalla y reanudación al regresar. Cero cuadros con señal de pestaña oculta emulada, manteniendo el rAF del navegador activo para comprobar que la pausa procede de la aplicación. Cámara, objetivo, zoom, selección y opacidad se conservaron. Se comprobó también la selección de CARAPACE estando oculto: carga sin render, presentación correcta al volver.
- Pausa manual y movimiento reducido conservados al salir y regresar; con `demand` se refresca la escena al reactivarla y después queda inactiva. No se desmonta ni vuelve a descargar un modelo por cambios de visibilidad.
- Validación final: `npm run build` y `npm run lint` correctos. `tests/catalog-interaction.mjs` pasó con los tres modelos, cambios rápidos, transiciones GSAP, cancelaciones, errores/reintentos, rotación, zoom, arrastre, rueda, teclado y tamaño móvil. Nueva prueba `tests/viewer-activity.mjs` para chunks, fallback, cuadros renderizados, conservación de cámara, pausa manual y movimiento reducido. Prueba adicional de fallo y recuperación del chunk completada.
- Revisión visual de escritorio 1440×900 y móvil emulado 390×844, además de las comprobaciones de distribución a 1280×720: sin cambios apreciables de materiales, iluminación o encuadre ni desbordamiento horizontal. Capturas y mediciones en `.tmp/viewer-activity/`; prueba de regresión del catálogo en `.tmp/catalog-qa.json`.
- Originales, archivos Blender, exportaciones optimizadas y copias activas de `public/models/` comprobados por SHA-256: intactos. Git operativo; sin instalaciones ni push. Pendiente: móviles físicos y otros navegadores. La comprobación de pestaña oculta usa una señal DOM emulada, no una prueba de gestión de ventanas en un dispositivo físico.

## Contraste y selección móvil corregidos

- Cambios focalizados en `src/App.css` y `src/App.tsx`. Descripción, instrucciones del visor y nota de tallas utilizan `#6e6455` sobre el beige `#eee8de`: contraste calculado con los colores computados del navegador de **4,764:1** en los tres casos. Superan el mínimo AA de 4,5:1 para texto normal; antes eran aproximadamente 4,13:1, 3,40:1 y 3,14:1. Se conservan fondo, tipografía y composición. Esta comprobación se limita a los tres textos solicitados.
- En la distribución móvil existente (hasta 640 px), seleccionar una tarjeta devuelve el visor a pantalla mediante desplazamiento suave. Con `prefers-reduced-motion` el desplazamiento es inmediato. Si el visor ya está completamente visible, no se desplaza. El foco permanece en la tarjeta; la carga y las transiciones siguen su curso sin temporizadores ni reinicios añadidos. En escritorio no se activa este comportamiento. Volver a seleccionar la misma zapatilla no vuelve a descargarla.
- `npm run build` y `npm run lint` completados correctamente. `tests/catalog-interaction.mjs` pasó: tres modelos, ficha, cambios rápidos, transiciones GSAP, cancelación, error/reintento, talla conservada, teclado, giro, zoom, arrastre, rueda y movimiento reducido, sin errores de ejecución normales.
- Nueva prueba `tests/mobile-selection.mjs` completada sobre la versión compilada: contraste, retorno gradual real, foco conservado con puntero y teclado, indicador de carga con descarga retrasada, movimiento reducido, ausencia de descargas al reseleccionar y escritorio sin desplazamiento automático. Revisión visual a 1440×900 y móvil emulado 390×844, más comprobación a 320×740; sin desbordamiento horizontal. Evidencias en `.tmp/mobile-selection/`.
- `tests/viewer-activity.mjs` adaptado para verificar la selección con pestaña oculta, dado que la selección móvil ahora devuelve el visor a pantalla. Prueba completada: cero cuadros fuera de pantalla y con señal de pestaña oculta emulada, reanudación correcta, cámara y pausa conservadas, fallback sin salto de distribución. Sin cambios en el sistema de render ni en la carga 3D.
- Sin modificaciones de GLB, texturas, Blender ni dependencias; sin commit ni push. Persiste la advertencia no bloqueante del tamaño del chunk 3D. Las pruebas se realizaron en Edge local con móvil emulado; quedan pendientes dispositivos físicos y otros navegadores.

## Preparación de Git y entrega, antes de verificar las licencias

- Conservados los tres GLB activos referenciados por `src/data/showcaseProduct.ts`: `atelier_af1_gold_hero_lossless_v002.glb` (12.371.492 bytes), `atelier_sneaker_graffiti_lossless_v002.glb` (11.054.404 bytes) y `atelier_carapace_01_lossless_v002.glb` (31.202.200 bytes). Sus SHA-256 no cambiaron y coinciden con sus copias en la compilación final.
- Trasladados únicamente los tres GLB inactivos desde `public/models/` a `blender/exports/public-backup-2026-11-19/`: `atelier_af1_gold_hero_v002.glb`, `atelier_sneaker_graffiti_v001.glb` y `atelier_carapace_01_v001.glb`. Total retirado de la entrega: 87.102.028 bytes (87,10 MB decimales). Destino nuevo, comprobado dentro del proyecto, sin conflictos ni sobrescrituras. Recuento final: tres activos y tres respaldados. SHA-256 antes/después idéntico para cada movimiento; registro en `sha256-manifest.json` dentro del respaldo.
- `.gitignore` sin secciones duplicadas: excluye originales `assets-source/`, trabajo y exportaciones Blender, `.blend` y respaldos, `dist/`, dependencias, temporales, cachés, informes locales, `.vercel/` y archivos de entorno. Añadida una exclusión temporal de `public/models/*.glb` para impedir incorporación accidental al índice mientras la redistribución no esté verificada. No se ha añadido ningún archivo al índice.
- `LICENSES.md` registra autores, publicaciones originales, estado y pasos para desbloquear los tres modelos. El 19-11-2026 no se pudo acceder a las publicaciones de Sketchfab ni a sus endpoints públicos mediante la herramienta web (incluidos errores HTTP 403). La declaración CC BY 4.0 en metadatos sigue pendiente de verificación en origen. No se realizó el primer commit, ni se creó un remoto ni se publicó. Una futura clonación todavía no incluiría los GLB hasta resolver licencias y retirar su exclusión temporal.
- `npm run build` y `npm run lint` correctos. `dist/` contiene exactamente los tres modelos activos, HTML, dos chunks JavaScript, CSS y dos SVG heredados. Ya no contiene GLB inactivos ni fuentes de Blender. Tamaños finales: `public/` **54.642.649 bytes (54,64 MB)**; `dist/` **56.045.548 bytes (56,05 MB)**. Se conservan `favicon.svg` e `icons.svg` sin referencias actuales (14.553 bytes entre ambos), pues el traslado autorizado se limitó a GLB; queda pendiente decidir su archivo. Persiste la advertencia conocida del chunk 3D mayor de 500 kB.
- `tests/mobile-selection.mjs` completado contra la versión compilada: carga de los tres modelos, selección, indicador de carga, teclado/foco, movimiento reducido y escritorio sin desplazamiento automático. Sin errores de ejecución ni desbordamiento horizontal. Capturas revisadas a 1440×900 y 390×844, más comprobación a 320×740: composición, encuadre y materiales conservados. No se repitió la batería completa de controles/error, validada en la etapa anterior, porque no cambió el código de aplicación.
- Git operativo, rama sin commits e índice vacío. `git status --short` muestra fuentes y documentación sin seguimiento; las carpetas excluidas y los GLB no aparecen. `git diff --stat` y `git diff --cached --stat` vacíos: todavía no existe una base versionada para comparar; no significa que el proyecto carezca de archivos pendientes. Sin cambios de diseño, lógica, geometría, texturas ni archivos Blender; sin instalaciones.

## Verificación de licencias en origen

- 19-11-2026: extraídos en modo lectura autor, título, URL, UID y licencia de los tres originales. La consulta HTTPS directa a la API oficial de Sketchfab confirmó CC BY 4.0 en los tres UID, aunque la herramienta web no pudo abrir las páginas HTML. `LICENSES.md` registra los datos, SHA-256, enlaces de evidencia y diferencias de perfiles actuales.
- La descripción de CARAPACE solicita acreditar a `Atahan DANACI` y no presentar la obra como propia. La licencia está verificada; queda pendiente alinear el crédito visible actual `6 / Atahan.Danaci` con ese nombre. Los créditos existentes incluyen autor, obra, licencia e indicación de cambios. No se alteraron modelos, interfaz, exclusiones de Git ni el índice.

## Estado actual: atribuciones finalizadas y primer commit preparado

- Reutilizado `ShowroomFooter` y su desplegable nativo, ahora «Créditos 3D», cerrado inicialmente y con las tres atribuciones disponibles sin cambiar de modelo. Los datos permanecen centralizados en `src/data/showcaseProduct.ts`: Riaan Fitzgerald, McLogics y Atahan DANACI (perfil de Sketchfab: 6).
- Integrados los enlaces indicados por el usuario: `https://skfb.ly/pNW7X`, la URL original de Sneaker y `https://skfb.ly/pP7Gp`; licencia CC BY 4.0 enlazada para cada obra. Sin parámetros de seguimiento. `LICENSES.md` actualizado sin repetir la investigación ya completada.
- Créditos con modificaciones reales: escala, orientación y centrado; emisión de Air Force 1 de 1 a 0; compresión Meshopt sin pérdida y conversión WebP sin pérdida de una, 30 y dos texturas respectivamente. Geometría, UV y resoluciones conservadas. Ningún GLB ni archivo Blender se modificó en esta etapa.
- Panel beige discreto, limitado en altura y con desplazamiento interno. En escritorio conserva la posición flotante; en móvil se abre dentro del flujo del pie para evitar recortes fuera de pantalla. Apertura/cierre nativos por teclado, enlaces diferenciados y foco visible.
- `.gitignore` permite únicamente los tres GLB activos `lossless_v002` en `public/models/`, manteniendo excluidos todos los demás GLB, originales, archivos Blender, exportaciones, respaldos, dependencias, compilación y temporales.
- Validación previa al commit: `npm run build` y `npm run lint` correctos. Comprobados en la versión compilada los tres créditos, seis enlaces exactos, apertura/cierre por teclado, foco, acceso al contenido y ausencia de desbordamiento horizontal. Revisión visual a 1440×900 y 390×844; sin errores de ejecución. Se conserva la advertencia conocida del chunk 3D mayor de 500 kB. Evidencias locales en `.tmp/credits-*.png`, excluidas de Git.
- Primer commit local autorizado con mensaje `feat: initial atelier sneakers showroom`: fuentes, configuración, lockfile, documentación, skills, pruebas y únicamente los tres GLB activos. Este registro se actualiza antes del commit. Sin dependencias nuevas, remoto ni push.

## Próxima etapa

Preparar una futura publicación en Vercel solo cuando se solicite. Mantener las atribuciones y los tres GLB activos. Quedan como mejoras separadas la revisión en dispositivos físicos y la decisión sobre los recursos heredados sin uso; no ampliar esta etapa ni ejecutar push.

