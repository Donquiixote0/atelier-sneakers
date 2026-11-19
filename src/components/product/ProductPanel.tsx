import type { ShowcaseProduct } from '../../types/product'
import { SizeSelector } from './SizeSelector'

export function ProductPanel({ product }: { product: ShowcaseProduct }) {
  return (
    <section id="piece" className="product-panel" aria-labelledby="product-title" tabIndex={-1} data-enter>
      <p className="eyebrow product-brand">{product.brand} <span>LA PIEZA DESTACADA</span></p>
      <h1 id="product-title">{product.name}</h1>
      <p className="product-edition">{product.edition}</p>
      <div className="gold-rule" aria-hidden="true" />
      <p className="product-description">{product.description}</p>
      <dl className="product-details">
        {product.details.map((detail) => (
          <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>
        ))}
      </dl>
      <SizeSelector sizes={product.previewSizes} />
    </section>
  )
}
