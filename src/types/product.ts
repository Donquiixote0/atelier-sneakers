export interface ShowcaseProduct {
  id: string
  brand: string
  name: string
  edition: string
  description: string
  monogram: string
  modelUrl: string
  dimensions: { length: number; width: number; height: number }
  credit: { author: string; profileName?: string; source: string; changes: string }
  imageUrl?: string
  details: ReadonlyArray<{ label: string; value: string }>
  previewSizes: readonly number[]
}

export type CatalogEntry =
  | { kind: 'product'; product: ShowcaseProduct }
  | { kind: 'placeholder'; id: string; title: string; description: string }
