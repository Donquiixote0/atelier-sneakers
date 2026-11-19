import { useEffect, useState } from 'react'
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'
import { BufferGeometry, Material, Mesh, Texture } from 'three'

// Each request owns its resources. No global GLTF cache or speculative downloads.
function disposeModel(gltf: GLTF) {
  // The Canvas reconciles separately from the DOM. Detach before disposal so a
  // final frame cannot upload the departing model's buffers/textures again.
  for (const scene of gltf.scenes) scene.removeFromParent()
  const geometries = new Set<BufferGeometry>()
  const materials = new Set<Material>()
  const textures = new Set<Texture>()
  for (const scene of gltf.scenes) scene.traverse((object) => {
    if (!(object instanceof Mesh)) return
    geometries.add(object.geometry)
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material)
  })
  for (const material of materials) {
    for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value)
    material.dispose()
  }
  const bitmaps = new Set<ImageBitmap>()
  for (const texture of textures) {
    if (typeof ImageBitmap !== 'undefined' && texture.image instanceof ImageBitmap) bitmaps.add(texture.image)
    texture.dispose()
  }
  for (const bitmap of bitmaps) bitmap.close()
  for (const geometry of geometries) geometry.dispose()
}

interface LoadedModel { url: string; attempt: number; gltf?: GLTF; error?: Error }

export function useSelectedModel(url: string, attempt: number) {
  const [result, setResult] = useState<LoadedModel | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    let disposed = false
    let owned: GLTF | undefined
    async function load() {
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`GLB: HTTP ${response.status}`)
        const bytes = await response.arrayBuffer()
        if (disposed) return
        // Parsing may finish after cancellation; those resources are disposed too.
        const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)
          .parseAsync(bytes, new URL('.', new URL(url, window.location.href)).href)
        if (disposed) { disposeModel(gltf); return }
        owned = gltf
        setResult({ url, attempt, gltf })
      } catch (error) {
        if (!disposed) setResult({ url, attempt, error: error instanceof Error ? error : new Error('GLB no disponible') })
      }
    }
    void load()
    return () => {
      disposed = true
      controller.abort()
      if (owned) disposeModel(owned)
    }
  }, [url, attempt])
  return result?.url === url && result.attempt === attempt ? result : null
}
