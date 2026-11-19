import { Component, lazy, Suspense, type ReactNode } from 'react'
import type { ShowcaseProduct } from '../types/product'

const Viewer = lazy(() => import('./ShowcaseViewer').then((module) => ({ default: module.ShowcaseViewer })))

function ViewerFallback() {
  return (
    <div className="viewer-region" aria-busy="true" data-viewer-chunk="loading">
      <div className="viewer-stage">
        <div className="viewer-status" role="status">
          <div className="loading-line loading-indeterminate" aria-hidden="true"><span /></div>
          <p>Preparando el showroom…</p>
        </div>
      </div>
      {/* Reserve the existing toolbar and hint space to prevent layout shifts. */}
      <div className="viewer-toolbar" aria-hidden="true"><span className="tool-button">{'\u00a0'}</span></div>
      <p className="viewer-hint" aria-hidden="true">{'\u00a0'}</p>
    </div>
  )
}

class ChunkBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return (
      <div className="viewer-failure" role="alert">
        <h2>No pudimos cargar el visor.</h2>
        <p>Comprueba tu conexión y vuelve a intentarlo.</p>
        <button className="tool-button justify-self-center" onClick={() => window.location.reload()}>Volver a intentar</button>
      </div>
    )
    return this.props.children
  }
}

export function LazyShowcaseViewer({ product }: { product: ShowcaseProduct }) {
  return <ChunkBoundary><Suspense fallback={<ViewerFallback />}><Viewer product={product} /></Suspense></ChunkBoundary>
}
