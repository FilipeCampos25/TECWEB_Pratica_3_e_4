const fs = require('fs').promises;
const path = require('path');

const productsFilePath = path.resolve(__dirname, '..', 'data', 'products.json');

async function readData() {
  try {
    const fileContent = await fs.readFile(productsFilePath, 'utf8');
    const data = JSON.parse(fileContent);

    if (!Array.isArray(data)) {
      throw new Error('O arquivo products.json deve conter um array.');
    }

    return data;
  } catch (error) {
    throw new Error(`Erro ao ler products.json: ${error.message}`);
  }
}

async function writeData(data) {
  if (!Array.isArray(data)) {
    throw new Error('Os dados enviados para escrita devem ser um array.');
  }

  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(productsFilePath, jsonData, 'utf8');
  } catch (error) {
    throw new Error(`Erro ao escrever em products.json: ${error.message}`);
  }
}

module.exports = {
  readData,
  writeData
};
