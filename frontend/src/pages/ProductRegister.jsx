import { useState } from 'react';
import Message from '../components/Message.jsx';
import { useProducts } from '../contexts/ProductsContext.jsx';

const initialFormData = {
  name: '',
  category: '',
  price: '',
  quantity: '',
  description: ''
};

const categoryOptions = ['Eletrônicos', 'Alimentos', 'Vestuário', 'Livros', 'Outros'];

function validateForm(formData) {
  const errors = {};
  const price = Number(formData.price);
  const quantity = Number(formData.quantity);
  const isPriceEmpty = String(formData.price).trim() === '';
  const isQuantityEmpty = String(formData.quantity).trim() === '';

  if (!formData.name.trim()) {
    errors.name = 'O nome do produto é obrigatório.';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'O nome deve ter no mínimo 3 caracteres.';
  }

  if (!formData.category) {
    errors.category = 'A categoria é obrigatória.';
  }

  if (isPriceEmpty) {
    errors.price = 'O preço é obrigatório.';
  } else if (!Number.isFinite(price)) {
    errors.price = 'O preço deve ser numérico.';
  } else if (price <= 0) {
    errors.price = 'O preço deve ser maior que 0.';
  }

  if (isQuantityEmpty) {
    errors.quantity = 'A quantidade é obrigatória.';
  } else if (!Number.isFinite(quantity)) {
    errors.quantity = 'A quantidade deve ser numérica.';
  } else if (quantity < 0) {
    errors.quantity = 'A quantidade deve ser maior ou igual a 0.';
  }

  if (!formData.description.trim()) {
    errors.description = 'A descrição é obrigatória.';
  } else if (formData.description.trim().length < 10) {
    errors.description = 'A descrição deve ter no mínimo 10 caracteres.';
  }

  return errors;
}

function getRequestErrorMessage(error) {
  if (Array.isArray(error?.data?.errors) && error.data.errors.length > 0) {
    return error.data.errors.join(' ');
  }

  return error?.message || 'Não foi possível cadastrar o produto.';
}

function ProductRegister() {
  const { createProduct, loading } = useProducts();
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value
    }));

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [name]: ''
    }));
    setSubmitError('');
    setSuccessMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setFieldErrors(validationErrors);
    setSubmitError('');
    setSuccessMessage('');

    if (Object.keys(validationErrors).length > 0) {
      setSubmitError('Corrija os campos destacados antes de cadastrar.');
      return;
    }

    const productData = {
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      description: formData.description.trim()
    };

    try {
      await createProduct(productData);
      setFormData(initialFormData);
      setFieldErrors({});
      setSuccessMessage('Produto cadastrado com sucesso.');
    } catch (requestError) {
      setSubmitError(getRequestErrorMessage(requestError));
    }
  }

  return (
    <section className="form-page">
      <div className="form-header">
        <h1>Cadastro de Produtos</h1>
        <p>Preencha os dados do produto para enviar o cadastro para a API.</p>
      </div>

      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <Message type="success">{successMessage}</Message>
        <Message type="error">{submitError}</Message>

        <div className="form-group">
          <label htmlFor="name">Nome do produto</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
          {fieldErrors.name && (
            <span className="field-error" id="name-error">
              {fieldErrors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.category)}
            aria-describedby={fieldErrors.category ? 'category-error' : undefined}
          >
            <option value="">Selecione uma categoria</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {fieldErrors.category && (
            <span className="field-error" id="category-error">
              {fieldErrors.category}
            </span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Preço</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.price)}
              aria-describedby={fieldErrors.price ? 'price-error' : undefined}
            />
            {fieldErrors.price && (
              <span className="field-error" id="price-error">
                {fieldErrors.price}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantidade</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              step="1"
              value={formData.quantity}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.quantity)}
              aria-describedby={fieldErrors.quantity ? 'quantity-error' : undefined}
            />
            {fieldErrors.quantity && (
              <span className="field-error" id="quantity-error">
                {fieldErrors.quantity}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.description)}
            aria-describedby={fieldErrors.description ? 'description-error' : undefined}
          />
          {fieldErrors.description && (
            <span className="field-error" id="description-error">
              {fieldErrors.description}
            </span>
          )}
        </div>

        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar produto'}
        </button>
      </form>
    </section>
  );
}

export default ProductRegister;
