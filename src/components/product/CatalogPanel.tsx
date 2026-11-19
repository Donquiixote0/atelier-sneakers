import type { CatalogEntry, ShowcaseProduct } from '../../types/product'
import { CatalogCard } from './CatalogCard'

export function CatalogPanel({ entries, activeProductId, onSelect }: { entries: readonly CatalogEntry[]; activeProductId: string; onSelect: (product: ShowcaseProduct) => void }) {
  return (
    <aside id="archive" className="catalog-panel" aria-labelledby="archive-title" tabIndex={-1} data-enter>
      <div className="catalog-heading"><p className="eyebrow">LA SELECCIÓN</p><h2 id="archive-title">El archivo.</h2></div>
      <div className="catalog-list">
        {entries.map((entry) => <CatalogCard key={entry.kind === 'product' ? entry.product.id : entry.id} entry={entry} activeProductId={activeProductId} onSelect={onSelect} />)}
      </div>
      <p className="catalog-footnote">Tres piezas, distintas perspectivas.<br />Selecciona una para explorarla.</p>
    </aside>
  )
}
