import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="page-section">
      <h1>Pagina nao encontrada</h1>
      <p>A rota acessada nao existe.</p>
      <Link className="text-link" to="/">
        Voltar para o inicio
      </Link>
    </section>
  );
}

export default NotFound;
