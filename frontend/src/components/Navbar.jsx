import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar-header">
      <nav className="navbar" aria-label="Navegacao principal">
        <NavLink to="/" className="navbar-brand">
          Gerenciador de Produtos
        </NavLink>

        <div className="navbar-links">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/cadastro">Cadastro</NavLink>
          <NavLink to="/listagem">Listagem</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
