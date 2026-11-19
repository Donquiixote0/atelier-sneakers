import type { ShowcaseProduct } from '../types/product'

export const CAMERA_DIRECTION = [0.45, 0.30, 0.84] as const

export function getCameraDistance(aspect: number, dimensions: ShowcaseProduct['dimensions']) {
  // Preserve the approved AF1 view, adding room for taller/wider silhouettes.
  const fit = Math.max(dimensions.length / 0.3, dimensions.height / 0.139203, dimensions.width / 0.108559)
  return Math.max(0.48, 0.59 / Math.max(aspect, 0.4)) * fit
}
