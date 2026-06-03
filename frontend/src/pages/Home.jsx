import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <section className="home-intro">
        <div>
          <h1>Gerenciador de Produtos</h1>
          <p>
            Sistema academico para cadastrar, listar e organizar produtos com frontend React e
            backend Express.
          </p>
        </div>

        <Link className="primary-action" to="/cadastro">
          Ir para cadastro
        </Link>
      </section>

      <section className="home-features" aria-label="Recursos do sistema">
        <article className="feature-card">
          <span className="feature-number">01</span>
          <h2>Cadastro de produtos</h2>
          <p>Area planejada para inserir nome, categoria, preco, quantidade e descricao.</p>
        </article>

        <article className="feature-card">
          <span className="feature-number">02</span>
          <h2>Listagem dinamica</h2>
          <p>Pagina preparada para exibir os produtos cadastrados de forma organizada.</p>
        </article>

        <article className="feature-card">
          <span className="feature-number">03</span>
          <h2>API REST</h2>
          <p>Integracao prevista com o backend Express usando endpoints de produtos.</p>
        </article>
      </section>
    </div>
  );
}

export default Home;
