import { useEffect } from 'react';
import Loading from '../components/Loading.jsx';
import Message from '../components/Message.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useProducts } from '../contexts/ProductsContext.jsx';

function ProductList() {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts().catch(() => {});
  }, [fetchProducts]);

  return (
    <section className="list-page">
      <div className="list-header">
        <h1>Listagem de Produtos</h1>
        <p>Produtos cadastrados e carregados diretamente da API REST.</p>
      </div>

      {loading && <Loading text="Carregando produtos..." />}

      {!loading && error && <Message type="error">{error}</Message>}

      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          <h2>Nenhum produto cadastrado</h2>
          <p>Cadastre um produto para que ele apareca nesta listagem.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
