export function ShowroomHeader() {
  return (
    <header className="showroom-header" data-enter>
      <a href="#showroom" className="wordmark" aria-label="Atelier Sneakers, showroom">ATELIER<span>SNEAKERS</span></a>
      <nav className="primary-nav" aria-label="Navegación principal">
        <a href="#showroom">Showroom</a>
        <a href="#piece">La pieza</a>
        <a href="#archive">Archivo</a>
      </nav>
      <p className="header-note">UN ESPACIO PARA MIRAR DE CERCA</p>
    </header>
  )
}
