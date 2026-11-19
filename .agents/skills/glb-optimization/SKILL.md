---
name: glb-optimization
description: Evaluar y optimizar copias GLB para la web de ATELIER SNEAKERS cuando la tarea autorice explícitamente la optimización del modelo seleccionado.
---

# Optimización de copias GLB

- Consultar `AGENTS.md`. Esta skill no autoriza por sí misma ejecutar optimizaciones; respetar las restricciones de la tarea activa.
- Usar una copia identificada del modelo seleccionado en `blender/work/` o un derivado en `blender/exports/`. Nunca escribir en los originales de `assets-source/sneakers/`.
- Registrar tamaño, SHA-256 y características relevantes del modelo de entrada. Definir un objetivo medible de peso o carga según el encargo, sin imponer presupuestos arbitrarios.
- Utilizar herramientas ya instaladas. Elegir solo transformaciones autorizadas y comprobar la compatibilidad de compresión y decodificadores con la escena existente.
- Escribir cada resultado en un archivo nuevo de `blender/exports/`, sin sobrescribir fuentes. Comparar apariencia, materiales, texturas y carga con la copia de referencia; documentar pérdidas o incompatibilidades.
- Publicar el derivado en `public/models/` únicamente si entra en el alcance solicitado y supera la validación. Registrar tamaños antes y después y conservar la trazabilidad; no cambiar la interfaz sin encargo.
