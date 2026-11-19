import { Suspense, type RefObject } from 'react'
import { ContactShadows } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { SneakerModel } from './SneakerModel'
import { StudioLighting } from './StudioLighting'
import { ShowcaseControls } from './ShowcaseControls'
import type { Group } from 'three'
import type { ShowcaseProduct } from '../types/product'

interface ShowcaseSceneProps {
  active: boolean
  animate: boolean
  reducedMotion: boolean
  controlsRef: RefObject<OrbitControlsImpl | null>
  onReady: () => void
  model?: Group
  product: ShowcaseProduct
}

export function ShowcaseScene({ active, animate, reducedMotion, controlsRef, onReady, model, product }: ShowcaseSceneProps) {
  return (
    <>
      <StudioLighting active={active} />
      <Suspense fallback={null}>
        {model && <group key={product.id} name={`showcase-product-${product.id}`}>
        <SneakerModel model={model} animate={animate} onReady={onReady} />
        </group>}
        {/* Keep the shadow targets alive across selections; refresh on model changes. */}
        <ContactShadows position={[0, -0.09 - Math.max(0, product.dimensions.height - 0.139203) / 2, 0]} scale={0.85} far={0.3}
          opacity={0.35} blur={2.5} resolution={256} frames={1} color="#746047" />
      </Suspense>
      <ShowcaseControls controlsRef={controlsRef} reducedMotion={reducedMotion} product={product} />
    </>
  )
}
