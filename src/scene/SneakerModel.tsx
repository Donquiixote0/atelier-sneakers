import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { Group } from 'three'

interface SneakerModelProps { model: Group; animate: boolean; onReady: () => void }

export function SneakerModel({ model, animate, onReady }: SneakerModelProps) {
  const floating = useRef<Group>(null)
  const phase = useRef(0)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(onReady, [onReady])
  useEffect(() => {
    if (!animate && floating.current) {
      floating.current.position.y = 0
      phase.current = 0
      invalidate()
    }
  }, [animate, invalidate])

  useFrame((_, delta) => {
    if (!animate || !floating.current) return
    phase.current += Math.min(delta, 0.05)
    floating.current.position.y = Math.sin(phase.current * 0.7) * 0.0018
  })

  return (
    <group position={[0, 0.008, 0]} dispose={null}>
      <group ref={floating}><primitive object={model} /></group>
    </group>
  )
}
