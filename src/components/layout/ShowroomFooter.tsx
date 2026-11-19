import { catalogEntries } from '../../data/showcaseProduct'

export function ShowroomFooter() {
  return (
    <footer className="showroom-footer">
      <p>ATELIER SNEAKERS <span className="footer-divider">/</span> El objeto, en primer plano.</p>
      <details className="model-credits">
        <summary>Créditos 3D</summary>
        <div className="model-credits-panel">
          {catalogEntries.map(entry => entry.kind === 'product' && (
            <section key={entry.product.id} aria-labelledby={`credit-${entry.product.id}`}>
              <h2 id={`credit-${entry.product.id}`}>{entry.product.name}</h2>
              <p>Autor: {entry.product.credit.author}.</p>
              {entry.product.credit.profileName && <p>Perfil de Sketchfab: {entry.product.credit.profileName}.</p>}
              <p>
                <a href={entry.product.credit.source} target="_blank" rel="noreferrer" aria-label={`Obra original de ${entry.product.name}`}>Obra original</a>
                {' · '}<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" aria-label={`Licencia CC BY 4.0 de ${entry.product.name}`}>CC BY 4.0</a>
              </p>
              <p>Modificaciones: {entry.product.credit.changes}</p>
            </section>
          ))}
          <p>Showroom independiente, no afiliado a Nike. Modelos de sus respectivos autores.</p>
        </div>
      </details>
    </footer>
  )
}
