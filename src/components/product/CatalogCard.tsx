import { Plus } from 'lucide-react'
import type { CatalogEntry, ShowcaseProduct } from '../../types/product'

export function CatalogCard({ entry, activeProductId, onSelect }: { entry: CatalogEntry; activeProductId: string; onSelect: (product: ShowcaseProduct) => void }) {
  if (entry.kind === 'placeholder') {
    return (
      <article className="catalog-card catalog-placeholder" aria-label={entry.title + ', próximamente'}>
        <div className="catalog-thumb placeholder-thumb" aria-hidden="true"><Plus size={18} strokeWidth={1} /></div>
        <div><h3>{entry.title}</h3><p>{entry.description}</p><span className="catalog-state">PRÓXIMAMENTE</span></div>
      </article>
    )
  }
  const { product } = entry
  const active = product.id === activeProductId
  return (
    <button type="button" className={`catalog-card ${active ? 'catalog-card-active' : ''}`} onClick={() => onSelect(product)}
      aria-pressed={active} aria-label={`${product.name}, ${product.edition}, ${active ? 'seleccionada' : 'ver pieza'}`}>
      <span className="catalog-thumb">
        {product.imageUrl
          ? <img src={product.imageUrl} alt="" loading="lazy" />
          : <span className="catalog-monogram" aria-hidden="true">{product.monogram}</span>}
      </span>
      <span><span className="catalog-card-title">{product.name}</span><span className="catalog-card-edition">{product.edition}</span><span className="catalog-state">{active ? 'SELECCIONADA' : product.brand}</span></span>
    </button>
  )
}
