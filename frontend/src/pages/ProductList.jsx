import { useEffect, useMemo, useState } from 'react';
import Loading from '../components/Loading.jsx';
import Message from '../components/Message.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useProducts } from '../contexts/ProductsContext.jsx';

function normalizeText(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function ProductList() {
  const { products, loading, error, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts().catch(() => {});
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = normalizeText(searchTerm.trim());

    if (!normalizedSearchTerm) {
      return products;
    }

    return products.filter((product) => {
      const name = normalizeText(product.name);
      const category = normalizeText(product.category);

      return name.includes(normalizedSearchTerm) || category.includes(normalizedSearchTerm);
    });
  }, [products, searchTerm]);

  return (
    <section className="list-page">
      <div className="list-header">
        <h1>Listagem de Produtos</h1>
        <p>Produtos cadastrados e carregados diretamente da API REST.</p>
      </div>

      <div className="list-filter">
        <label htmlFor="product-search">Buscar produtos</label>
        <input
          id="product-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Digite o nome ou a categoria"
          disabled={loading}
        />
      </div>

      {loading && <Loading text="Carregando produtos..." />}

      {!loading && error && <Message type="error">{error}</Message>}

      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          <h2>Nenhum produto cadastrado</h2>
          <p>Cadastre um produto para que ele apareca nesta listagem.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
        <div className="empty-state">
          <h2>Nenhum produto encontrado</h2>
          <p>Nenhum produto corresponde à busca informada.</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
