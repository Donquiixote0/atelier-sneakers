import { useEffect, type RefObject } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { CAMERA_DIRECTION, getCameraDistance } from './showcaseConfig'
import type { ShowcaseProduct } from '../types/product'

interface ShowcaseControlsProps {
  controlsRef: RefObject<OrbitControlsImpl | null>
  reducedMotion: boolean
  product: ShowcaseProduct
}

export function ShowcaseControls({ controlsRef, reducedMotion, product }: ShowcaseControlsProps) {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const invalidate = useThree((state) => state.invalidate)
  const distance = getCameraDistance(size.width / size.height, product.dimensions)

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    controls.target.set(0, -0.012, 0)
    camera.position.copy(new Vector3(...CAMERA_DIRECTION).normalize().multiplyScalar(distance)).add(controls.target)
    controls.update()
    controls.saveState()
    invalidate()
  }, [camera, controlsRef, distance, invalidate, product.id])

  return (
    <OrbitControls ref={controlsRef} makeDefault enablePan={false}
      enableDamping={!reducedMotion} dampingFactor={0.08}
      rotateSpeed={0.65} zoomSpeed={0.7}
      minDistance={distance * 0.72} maxDistance={distance * 1.8}
      minPolarAngle={0.2} maxPolarAngle={Math.PI * 0.52} />
  )
}
