const productService = require('../services/productService');

function handleControllerError(error, res) {
  const statusCode = error.statusCode || 500;
  const responseBody = {
    message: statusCode === 500 ? 'Erro interno do servidor.' : error.message
  };

  if (error.errors) {
    responseBody.errors = error.errors;
  }

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json(responseBody);
}

async function getProducts(req, res) {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    handleControllerError(error, res);
  }
}

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    handleControllerError(error, res);
  }
}

async function deleteProduct(req, res) {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    res.status(200).json({
      message: 'Produto removido com sucesso.',
      product: deletedProduct
    });
  } catch (error) {
    handleControllerError(error, res);
  }
}

module.exports = {
  getProducts,
  createProduct,
  deleteProduct
};
