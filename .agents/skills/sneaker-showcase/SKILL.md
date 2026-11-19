---
name: sneaker-showcase
description: Implementar la presentación web de la zapatilla seleccionada en ATELIER SNEAKERS con React, TypeScript, Vite, Three.js, R3F y Drei cuando se solicite trabajar en la interfaz o escena.
---

# Presentación de la zapatilla

- Leer `AGENTS.md` y `AVANCE.md`; comprobar qué modelo fue seleccionado y qué cambios de interfaz están autorizados. La organización de carpetas no activa implementación visual.
- Mantener una estética clara, minimalista y premium, con jerarquía tipográfica, espacio en blanco e iluminación que permita apreciar el producto.
- Cargar los derivados aprobados desde `public/models/`; no importar ni servir directamente los originales de `assets-source/`.
- Distribuir escena en `src/scene/`, estructura en `src/components/layout/`, producto en `src/components/product/` y animaciones en `src/animations/`. Incorporar estado compartido solo cuando sea necesario.
- Adaptar encuadre e interacción a móvil y escritorio, ofrecer estados de carga y error y respetar movimiento reducido y navegación por teclado en los controles.
- Reutilizar dependencias y patrones existentes. Verificar `npm run build` y revisar visualmente los cambios autorizados; registrar limitaciones sin ampliar el alcance.
