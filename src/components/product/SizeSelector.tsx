import { useState } from 'react'

export function SizeSelector({ sizes }: { sizes: readonly number[] }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  return (
    <fieldset className="size-selector" aria-describedby="size-note">
      <legend>Explora tu talla <span>EU</span></legend>
      <div className="size-grid">
        {sizes.map((size) => (
          <label className="size-option" key={size}>
            <input type="radio" name="preview-size" value={size}
              checked={selectedSize === size} onChange={() => setSelectedSize(size)} />
            <span>{size}</span>
          </label>
        ))}
      </div>
      <p id="size-note" className="size-note" aria-live="polite">
        {selectedSize ? `EU ${selectedSize} seleccionada. ` : ''}Selección visual, sin disponibilidad confirmada.
      </p>
    </fieldset>
  )
}
