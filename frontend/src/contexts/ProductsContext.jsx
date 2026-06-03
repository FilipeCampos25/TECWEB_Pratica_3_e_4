import { createContext, useContext, useState } from 'react';
import {
  createProduct as createProductRequest,
  deleteProduct as deleteProductRequest,
  getProducts
} from '../services/productService';

const ProductsContext = createContext(null);

function getErrorMessage(error) {
  if (Array.isArray(error?.data?.errors) && error.data.errors.length > 0) {
    return error.data.errors.join(' ');
  }

  return error?.message || 'Nao foi possivel concluir a operacao.';
}

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts();
      setProducts(data);
      return data;
    } catch (requestError) {
      const message = getErrorMessage(requestError);
      setError(message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(productData) {
    setLoading(true);
    setError(null);

    try {
      const newProduct = await createProductRequest(productData);
      setProducts((currentProducts) => [...currentProducts, newProduct]);
      return newProduct;
    } catch (requestError) {
      const message = getErrorMessage(requestError);
      setError(message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id) {
    setLoading(true);
    setError(null);

    try {
      const response = await deleteProductRequest(id);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => String(product.id) !== String(id))
      );
      return response;
    } catch (requestError) {
      const message = getErrorMessage(requestError);
      setError(message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }

  const contextValue = {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    deleteProduct
  };

  return <ProductsContext.Provider value={contextValue}>{children}</ProductsContext.Provider>;
}

function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts deve ser usado dentro de ProductsProvider.');
  }

  return context;
}

export { ProductsProvider, useProducts };
