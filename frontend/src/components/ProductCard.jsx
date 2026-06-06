import { useProducts } from '../contexts/ProductsContext.jsx';

function formatCurrency(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 'Valor indisponivel';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numericValue);
}

function formatDate(value) {
  if (!value) {
    return 'Data indisponivel';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Data indisponivel';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function ProductCard({ product }) {
  const { deleteProduct, loading } = useProducts();

  function handleDelete() {
    const shouldDelete = window.confirm(`Deseja excluir o produto "${product.name}"?`);

    if (!shouldDelete) {
      return;
    }

    deleteProduct(product.id).catch(() => {
      // O erro da requisicao e exibido pela listagem por meio do Context.
    });
  }

  return (
    <article className="product-card">
      <div className="product-card-header">
        <div>
          <h2>{product.name}</h2>
          <span className="product-category">{product.category}</span>
        </div>
        <strong className="product-price">{formatCurrency(product.price)}</strong>
      </div>

      <p className="product-description">{product.description}</p>

      <dl className="product-details">
        <div>
          <dt>Quantidade</dt>
          <dd>{product.quantity}</dd>
        </div>
        <div>
          <dt>Cadastro</dt>
          <dd>{formatDate(product.createdAt)}</dd>
        </div>
      </dl>

      <div className="product-card-actions">
        <button
          className="delete-button"
          type="button"
          onClick={handleDelete}
          disabled={loading}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
