import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <header className="app-header">
      <nav className="navigation" aria-label="Navegacao principal">
        <NavLink to="/" className="brand">
          Gerenciador de Produtos
        </NavLink>
        <div className="nav-links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/cadastro">Cadastro</NavLink>
          <NavLink to="/listagem">Listagem</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
