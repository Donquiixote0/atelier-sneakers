import { useRef, useState } from 'react'
import { LazyShowcaseViewer } from './scene/LazyShowcaseViewer'
import { ShowroomHeader } from './components/layout/ShowroomHeader'
import { ShowroomFooter } from './components/layout/ShowroomFooter'
import { ProductPanel } from './components/product/ProductPanel'
import { CatalogPanel } from './components/product/CatalogPanel'
import { useEditorialEntrance } from './animations/useEditorialEntrance'
import { catalogEntries, showcaseProduct } from './data/showcaseProduct'
import type { ShowcaseProduct } from './types/product'
import './App.css'

export default function App() {
  const page = useRef<HTMLDivElement>(null)
  const showroom = useRef<HTMLElement>(null)
  const [product, setProduct] = useState(showcaseProduct)
  useEditorialEntrance(page)

  const selectProduct = (next: ShowcaseProduct) => {
    setProduct(next)
    // Match the existing single-column mobile layout. Keep the card's focus
    // and let the current model transition/loading state proceed independently.
    if (!window.matchMedia('(max-width: 640px)').matches || !showroom.current) return
    const bounds = showroom.current.getBoundingClientRect()
    if (bounds.top >= 0 && bounds.bottom <= window.innerHeight) return
    showroom.current.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="showroom-shell editorial-showroom" ref={page}>
      <ShowroomHeader />
      <main className="editorial-layout">
        <section id="showroom" ref={showroom} className="hero-view" aria-label="Showroom interactivo" tabIndex={-1}>
          <div className="viewer-caption" data-enter>
            <p className="eyebrow">EL ARTE DE MIRAR</p>
            <p>{product.name} <span>/ {product.edition}</span></p>
          </div>
          <LazyShowcaseViewer product={product} />
        </section>
        <ProductPanel product={product} />
        <CatalogPanel entries={catalogEntries} activeProductId={product.id} onSelect={selectProduct} />
      </main>
      <ShowroomFooter />
    </div>
  )
}
