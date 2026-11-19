# ATELIER SNEAKERS

## Dirección del proyecto

- Stack: React + TypeScript + Vite + Three.js + React Three Fiber (R3F) + Drei.
- Estilo visual claro, minimalista y premium; priorizar la zapatilla, el espacio en blanco y una iluminación cuidada.
- Mantener los cambios dentro del alcance de la tarea; no editar archivos ajenos a ella.
- Optimizar créditos y tokens: inspecciones breves y dirigidas, reutilizar resultados y evitar análisis repetidos, renders o herramientas sin necesidad.
- No usar subagentes salvo autorización explícita posterior del usuario.

## Protección de modelos

- Los originales descargados viven en `assets-source/sneakers/`. Conservar nombres, extensiones y contenido; no eliminarlos ni sobrescribirlos.
- Trabajar siempre mediante copias en `blender/work/`; guardar derivados en `blender/exports/` y versiones web aprobadas en `public/models/`.
- Antes y después de cualquier traslado autorizado de originales, comprobar recuento y SHA-256. Ante conflictos de nombres, detenerse sin sobrescribir.
- Modificar geometría, materiales o texturas y ejecutar optimizaciones GLB requiere que la tarea lo autorice expresamente; disponer de una skill no autoriza esas acciones.

## Organización

- `public/images/` y `public/environments/`: imágenes y entornos utilizados por la web.
- `src/scene/`: escena 3D; `src/components/layout/` y `src/components/product/`: componentes de estructura y producto.
- `src/animations/`, `src/store/`, `src/data/`, `src/hooks/`, `src/utils/` y `src/types/`: responsabilidades separadas del código.
- `tests/`: pruebas pertinentes al comportamiento implementado.
- Skills locales en `.agents/skills/`: `sneaker-model-prep`, `glb-optimization`, `sneaker-showcase` y `visual-qa`. Leer la skill relevante cuando se aplique.
- Registrar avances y siguiente etapa en `AVANCE.md`; comprobar Git y ejecutar `npm run build` cuando corresponda a la tarea.
- No reinstalar dependencias, realizar cambios destructivos ni ejecutar `git push` sin una instrucción explícita que lo autorice.

## Alcance de la etapa actual

Organización del proyecto, sin cambiar la interfaz ni procesar los modelos. La próxima etapa es seleccionar la zapatilla protagonista; no iniciarla como parte de la organización.
