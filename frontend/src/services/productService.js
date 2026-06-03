import { apiRequest } from './api';

function getProducts() {
  return apiRequest('/products');
}

function createProduct(productData) {
  return apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  });
}

function deleteProduct(id) {
  return apiRequest(`/products/${id}`, {
    method: 'DELETE'
  });
}

export { getProducts, createProduct, deleteProduct };
