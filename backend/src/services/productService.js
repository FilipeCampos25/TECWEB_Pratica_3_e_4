const { readData, writeData } = require('../utils/fileHandler');

function createServiceError(statusCode, message, errors) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;
  return error;
}

function isMissing(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

function parseNumericField(value) {
  if (isMissing(value) || typeof value === 'boolean' || Array.isArray(value)) {
    return null;
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  return parsedValue;
}

function validateProductData(productData) {
  const data =
    productData && typeof productData === 'object' && !Array.isArray(productData) ? productData : {};
  const errors = [];
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const category = typeof data.category === 'string' ? data.category.trim() : '';
  const description = typeof data.description === 'string' ? data.description.trim() : '';
  const price = parseNumericField(data.price);
  const quantity = parseNumericField(data.quantity);

  if (!name) {
    errors.push('name e obrigatorio.');
  } else if (name.length < 3) {
    errors.push('name deve ter no minimo 3 caracteres.');
  }

  if (!category) {
    errors.push('category e obrigatoria.');
  }

  if (isMissing(data.price)) {
    errors.push('price e obrigatorio.');
  } else if (price === null) {
    errors.push('price deve ser numerico.');
  } else if (price <= 0) {
    errors.push('price deve ser maior que 0.');
  }

  if (isMissing(data.quantity)) {
    errors.push('quantity e obrigatorio.');
  } else if (quantity === null) {
    errors.push('quantity deve ser numerico.');
  } else if (quantity < 0) {
    errors.push('quantity deve ser maior ou igual a 0.');
  }

  if (!description) {
    errors.push('description e obrigatoria.');
  } else if (description.length < 10) {
    errors.push('description deve ter no minimo 10 caracteres.');
  }

  if (errors.length > 0) {
    throw createServiceError(400, 'Erro de validacao.', errors);
  }

  return {
    name,
    category,
    price,
    quantity,
    description
  };
}

function generateProductId(products) {
  const numericIds = products
    .map((product) => Number(product.id))
    .filter((id) => Number.isFinite(id));

  if (numericIds.length === 0) {
    return 1;
  }

  return Math.max(...numericIds) + 1;
}

async function getProducts() {
  return readData();
}

async function createProduct(productData) {
  const products = await readData();
  const validatedProductData = validateProductData(productData);

  const newProduct = {
    id: generateProductId(products),
    ...validatedProductData,
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  await writeData(products);

  return newProduct;
}

async function deleteProduct(productId) {
  const products = await readData();
  const productIndex = products.findIndex((product) => String(product.id) === String(productId));

  if (productIndex === -1) {
    throw createServiceError(404, 'Produto nao encontrado.');
  }

  const [deletedProduct] = products.splice(productIndex, 1);
  await writeData(products);

  return deletedProduct;
}

module.exports = {
  getProducts,
  createProduct,
  deleteProduct
};
