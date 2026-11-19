import { Environment, Lightformer } from '@react-three/drei'

export function StudioLighting({ active }: { active: boolean }) {
  return (
    <>
      <hemisphereLight args={['#fff8ed', '#a9987d', 0.35]} />
      <directionalLight position={[0.3, 0.6, 0.4]} intensity={1.5} color="#fffaf2" />
      {/* A locally generated, single-frame reflection environment. No external HDRI. */}
      <Environment resolution={128} frames={active ? 1 : 0} environmentIntensity={0.65}>
        <color attach="background" args={['#b2aaa0']} />
        <Lightformer position={[-2, 3, 2]} target={[0, 0, 0]} scale={[3, 4]} intensity={2} />
        <Lightformer position={[0.5, 1, 4]} target={[0, 0, 0]} scale={[4, 4]} intensity={2} />
      </Environment>
    </>
  )
}
