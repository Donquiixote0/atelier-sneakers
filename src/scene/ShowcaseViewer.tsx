import { Component, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ACESFilmicToneMapping } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Minus, Pause, Play, Plus, RotateCcw } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useViewerActivity } from '../hooks/useViewerActivity'
import { ShowcaseScene } from './ShowcaseScene'
import { CAMERA_DIRECTION } from './showcaseConfig'
import { useSelectedModel } from './useSelectedModel'
import { useModelTransition } from '../animations/useModelTransition'
import type { ShowcaseProduct } from '../types/product'

class ViewerBoundary extends Component<{ children: ReactNode; productId: string }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidUpdate(previous: Readonly<{ children: ReactNode; productId: string }>) {
    if (this.state.failed && previous.productId !== this.props.productId) this.setState({ failed: false })
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="viewer-failure" role="alert">
          <h2>No pudimos abrir la zapatilla.</h2>
          <p>Comprueba tu conexión e inténtalo de nuevo.</p>
          <button className="tool-button justify-self-center" onClick={() => {
            this.setState({ failed: false })
          }}>Volver a intentar</button>
        </div>
      )
    }
    return this.props.children
  }
}

function LoadingIndicator({ name }: { name: string }) {
  return (
    <div className="viewer-status" role="status" aria-live="polite">
      <div className="loading-line loading-indeterminate" aria-hidden="true"><span /></div>
      <p>Preparando {name}…</p>
    </div>
  )
}

function supportsWebGL() {
  try {
    const context = document.createElement('canvas').getContext('webgl2')
    context?.getExtension('WEBGL_lose_context')?.loseContext()
    return Boolean(context)
  } catch {
    return false
  }
}

function ResumeFrame({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate)
  useLayoutEffect(() => { if (active) invalidate() }, [active, invalidate])
  return null
}

function ViewerContent({ product }: { product: ShowcaseProduct }) {
  const stage = useRef<HTMLDivElement>(null)
  const active = useViewerActivity(stage)
  const reducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const { layer, displayed, phase, onReady } = useModelTransition(product, reducedMotion)
  const loaded = useSelectedModel(displayed.modelUrl, attempt)
  const current = displayed.id === product.id
  const status = !current ? 'exiting' : loaded?.error ? 'error' : !loaded?.gltf ? 'loading' : phase
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const animate = !reducedMotion && !paused

  const rotate = (angle: number) => {
    const controls = controlsRef.current
    if (controls) controls.setAzimuthalAngle(controls.getAzimuthalAngle() + angle)
  }
  const zoom = (factor: number) => {
    const controls = controlsRef.current
    if (!controls) return
    controls.object.position.sub(controls.target).multiplyScalar(factor)
      .clampLength(controls.minDistance, controls.maxDistance).add(controls.target)
    controls.update()
  }
  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || status !== 'ready') return
    const actions: Record<string, () => void> = {
      ArrowLeft: () => rotate(-Math.PI / 12),
      ArrowRight: () => rotate(Math.PI / 12),
      ArrowUp: () => zoom(0.9),
      ArrowDown: () => zoom(1.1),
      '+': () => zoom(0.9),
      '-': () => zoom(1.1),
      Home: () => controlsRef.current?.reset(),
    }
    if (actions[event.key]) { event.preventDefault(); actions[event.key]() }
  }

  return (
    <section className="viewer-region" aria-label={`Explorar ${product.name} en 3D`} data-state={status}
      data-model={displayed.id} data-render-active={active} aria-busy={status !== 'ready' && status !== 'error'}>
      <div className="viewer-stage" ref={stage} tabIndex={0} role="group" aria-label="Zapatilla 3D interactiva" aria-describedby="viewer-instructions" onKeyDown={handleKey}>
        <div className="viewer-canvas-layer" ref={layer} style={{ opacity: 0 }}>
        <Canvas camera={{ position: [...CAMERA_DIRECTION], fov: 32, near: 0.01, far: 10 }}
          dpr={[1, 1.5]} frameloop={!active ? 'never' : animate ? 'always' : 'demand'}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => { gl.toneMapping = ACESFilmicToneMapping; gl.toneMappingExposure = 0.95 }}
          fallback={<p>Este navegador no puede mostrar el visor 3D.</p>}>
          <ResumeFrame active={active} />
          <ShowcaseScene active={active} animate={animate} reducedMotion={reducedMotion} controlsRef={controlsRef} onReady={onReady}
            product={displayed} model={loaded?.gltf?.scene} />
        </Canvas>
        </div>
        {status === 'loading' && <LoadingIndicator name={product.name} />}
        {status === 'error' && <div className="viewer-status viewer-load-error" role="alert">
          <h2>No pudimos abrir {product.name}.</h2>
          <p>Comprueba tu conexión, vuelve a intentar o elige otra pieza.</p>
          <button className="tool-button" onClick={() => setAttempt((value) => value + 1)}>Volver a intentar</button>
        </div>}
      </div>
      <div className="viewer-toolbar" role="group" aria-label="Controles del visor">
        <button className="tool-button" onClick={() => rotate(Math.PI / 4)} disabled={status !== 'ready'}>Girar 45°</button>
        <span className="tool-divider" aria-hidden="true" />
        <button className="tool-button tool-button-icon" aria-label="Alejar zapatilla" title="Alejar" onClick={() => zoom(1.12)} disabled={status !== 'ready'}><Minus size={16} /></button>
        <button className="tool-button tool-button-icon" aria-label="Acercar zapatilla" title="Acercar" onClick={() => zoom(0.88)} disabled={status !== 'ready'}><Plus size={16} /></button>
        <span className="tool-divider" aria-hidden="true" />
        <button className="tool-button tool-button-icon" aria-label="Restablecer vista" title="Vista inicial" onClick={() => controlsRef.current?.reset()} disabled={status !== 'ready'}><RotateCcw size={16} /></button>
        <button className="tool-button tool-button-icon" aria-label={animate ? 'Pausar flotación' : 'Activar flotación'} aria-pressed={animate}
          title={reducedMotion ? 'Movimiento reducido del sistema activado' : animate ? 'Pausar flotación' : 'Activar flotación'}
          disabled={reducedMotion || status !== 'ready'} onClick={() => setPaused((value) => !value)}>
          {animate ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>
      <p id="viewer-instructions" className="viewer-hint">
        Arrastra para girar · Rueda o pellizca para acercarte
        <span className="sr-only">. Con el visor enfocado, usa izquierda y derecha para girar, arriba y abajo para acercar o alejar e Inicio para restablecer.</span>
      </p>
    </section>
  )
}

export function ShowcaseViewer({ product }: { product: ShowcaseProduct }) {
  const [supported] = useState(supportsWebGL)
  if (!supported) {
    return <div className="viewer-failure" role="alert"><p>Tu navegador no puede mostrar el visor 3D. Prueba con un navegador compatible con WebGL 2.</p></div>
  }
  return <ViewerBoundary productId={product.id}><ViewerContent product={product} /></ViewerBoundary>
}
