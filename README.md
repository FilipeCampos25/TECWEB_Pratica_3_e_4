# Gerenciador de Produtos

Sistema acadêmico desenvolvido para a disciplina de TecWeb. A aplicação permite cadastrar, listar, buscar e excluir produtos por meio de um frontend em React integrado a uma API REST em Node.js e Express.

Os produtos não são fixos no frontend. A listagem consome a API e os dados são persistidos localmente pelo backend no arquivo `backend/src/data/products.json`.

## Tecnologias utilizadas

### Frontend

- React 18
- Vite
- JavaScript
- React Router DOM
- Context API
- Fetch API
- CSS externo

### Backend

- Node.js
- Express
- CORS
- API REST
- Módulo `fs` do Node.js para leitura e escrita de arquivo
- Arquivo JSON local para persistência

### Ferramentas

- npm
- Git
- GitHub
- GitHub Projects/Kanban

## Estrutura de pastas

```text
TECWEB_Pratica_3_e_4/
├── backend/
│   ├── package.json
│   └── src/
│       ├── controllers/
│       │   └── productController.js
│       ├── data/
│       │   └── products.json
│       ├── routes/
│       │   └── productRoutes.js
│       ├── services/
│       │   └── productService.js
│       ├── utils/
│       │   └── fileHandler.js
│       └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
├── .gitignore
└── README.md
```

## Pré-requisitos

Antes de iniciar, instale:

- Node.js
- npm, normalmente instalado junto com o Node.js

Para confirmar a instalação:

```bash
node --version
npm --version
```

## Como instalar

O frontend e o backend possuem dependências separadas. Execute a instalação em cada pasta.

### Backend

```bash
cd backend
npm install
```

### Frontend

Em outro terminal, a partir da raiz do projeto:

```bash
cd frontend
npm install
```

## Como rodar o backend

No diretório `backend`:

```bash
cd backend
npm install
npm run dev
```

O backend será iniciado em:

```text
http://localhost:3001
```

O comando `npm run dev` utiliza o modo de observação do Node.js e reinicia o servidor quando arquivos JavaScript do backend são alterados.

## Como rodar o frontend

Mantenha o backend em execução. Em outro terminal, no diretório `frontend`:

```bash
cd frontend
npm install
npm run dev
```

O Vite exibirá no terminal o endereço do frontend, normalmente:

```text
http://localhost:5173
```

## Rotas do frontend

| Rota | Página |
| --- | --- |
| `/` | Página inicial |
| `/cadastro` | Cadastro de produtos |
| `/listagem` | Listagem, busca e exclusão de produtos |
| `*` | Página de rota não encontrada |

## Endpoints da API

A URL base da API utilizada pelo frontend é:

```text
http://localhost:3001/api
```

### Listar produtos

```http
GET /api/products
```

Retorna um array com os produtos armazenados em `backend/src/data/products.json`.

### Cadastrar produto

```http
POST /api/products
Content-Type: application/json
```

Exemplo de corpo da requisição:

```json
{
  "name": "Teclado mecânico",
  "category": "Eletrônicos",
  "price": 249.9,
  "quantity": 10,
  "description": "Teclado mecânico com iluminação."
}
```

O backend gera automaticamente os campos `id` e `createdAt`.

### Excluir produto

```http
DELETE /api/products/:id
```

Exemplo:

```http
DELETE /api/products/1
```

O endpoint retorna erro `404` quando o produto informado não existe.

## Modelo de produto

```json
{
  "id": 1,
  "name": "Teclado mecânico",
  "category": "Eletrônicos",
  "price": 249.9,
  "quantity": 10,
  "description": "Teclado mecânico com iluminação.",
  "createdAt": "2026-06-06T12:00:00.000Z"
}
```

## Funcionalidades implementadas

- Página inicial com apresentação do sistema.
- Menu de navegação entre as páginas.
- Cadastro de produtos por formulário controlado.
- Validação dos campos no frontend.
- Validação dos dados recebidos no backend.
- Listagem dinâmica consumindo `GET /api/products`.
- Exibição de preço em real e data formatada.
- Busca no frontend por nome ou categoria.
- Busca sem diferenciação entre letras maiúsculas, minúsculas e acentos.
- Mensagem quando não existem produtos cadastrados.
- Mensagem quando a busca não encontra resultados.
- Exclusão de produto com confirmação.
- Atualização da interface após cadastro ou exclusão.
- Estados visuais de carregamento, sucesso e erro.
- Página para rotas não encontradas.
- Persistência dos produtos em arquivo JSON local.
- CSS externo e responsividade básica.

## Validações do formulário

As seguintes regras são aplicadas no frontend e também verificadas pelo backend:

| Campo | Validação |
| --- | --- |
| Nome | Obrigatório e com no mínimo 3 caracteres |
| Categoria | Obrigatória |
| Preço | Obrigatório, numérico e maior que zero |
| Quantidade | Obrigatória, numérica e maior ou igual a zero |
| Descrição | Obrigatória e com no mínimo 10 caracteres |

Quando há erro, o formulário destaca o campo correspondente e exibe uma mensagem. Após um cadastro válido, os campos são limpos e uma mensagem de sucesso é apresentada.

## Estado compartilhado com Context API

O estado compartilhado dos produtos está em `frontend/src/contexts/ProductsContext.jsx`.

O `ProductsProvider` envolve a aplicação e disponibiliza:

- `products`: lista atual de produtos;
- `loading`: indica uma operação em andamento;
- `error`: armazena mensagens de erro;
- `fetchProducts()`: carrega os produtos da API;
- `createProduct(productData)`: cadastra e adiciona o produto ao estado;
- `deleteProduct(id)`: exclui e remove o produto do estado.

As páginas e componentes utilizam o hook `useProducts()` para acessar essas informações. O `ProductCard` não chama a API diretamente: a exclusão é realizada por meio da função fornecida pelo Context.

## Persistência dos dados

A persistência é feita em:

```text
backend/src/data/products.json
```

O arquivo contém um array JSON. O backend lê esse conteúdo nas operações de listagem, cadastro e exclusão, e grava novamente o array após alterações.

Essa solução atende ao objetivo acadêmico de persistência local e não utiliza banco de dados.

## Estilização e responsividade

- Todos os estilos estão em arquivos CSS externos dentro de `frontend/src/styles`.
- Não são utilizados Tailwind CSS nem bibliotecas visuais.
- O layout possui container central, navbar, cards, formulário e grid de produtos.
- Existem ajustes responsivos para larguras de `900px`, `720px` e `520px`.
- Há tratamento para a preferência `prefers-reduced-motion`.

## Critérios da atividade atendidos

- [x] Frontend com React, Vite e JavaScript.
- [x] Navegação com React Router DOM.
- [x] Rotas `/`, `/cadastro`, `/listagem` e rota curinga.
- [x] Formulário controlado com validação.
- [x] Estado compartilhado com Context API.
- [x] Comunicação com o backend usando Fetch API.
- [x] Listagem dinâmica sem dados fixos no frontend.
- [x] Backend com Node.js, Express e CORS.
- [x] API REST com `GET`, `POST` e `DELETE`.
- [x] Persistência em `backend/src/data/products.json`.
- [x] CSS externo.
- [x] Responsividade básica.
- [x] Tratamento visual de carregamento, erros e resultados vazios.
- [x] README com instruções de instalação e execução.

Os requisitos de histórico organizado de commits, publicação no GitHub e GitHub Projects/Kanban dependem da configuração e do uso do repositório pelo grupo.

## Organização sugerida do Kanban

Um GitHub Project pode ser organizado com as seguintes colunas:

| Coluna | Objetivo |
| --- | --- |
| Backlog | Requisitos ainda não priorizados |
| A fazer | Tarefas selecionadas para desenvolvimento |
| Em andamento | Tarefas sendo implementadas |
| Em revisão/teste | Tarefas aguardando validação |
| Concluído | Tarefas finalizadas e verificadas |

Sugestão de cartões:

- Configurar estrutura de frontend e backend.
- Criar navegação e rotas do frontend.
- Implementar página inicial.
- Implementar formulário e validações.
- Criar API REST de produtos.
- Implementar persistência em JSON.
- Integrar frontend com a API.
- Implementar listagem de produtos.
- Implementar exclusão de produtos.
- Implementar busca por nome e categoria.
- Revisar estilização e responsividade.
- Escrever README e validar execução local.

## Sugestão de commits

Os commits devem representar etapas pequenas e verificáveis. Exemplo de sequência:

```text
chore: cria estrutura inicial do frontend e backend
feat: adiciona rotas e navegacao do frontend
feat: implementa formulario de cadastro de produtos
feat: cria api rest com persistencia em arquivo json
feat: integra cadastro e listagem com a api
feat: adiciona exclusao de produtos
feat: adiciona filtro por nome e categoria
style: melhora interface e responsividade
docs: completa documentacao do projeto
```

Essas mensagens são uma sugestão de organização. Elas não substituem o histórico real do repositório.

## Checklist final de execução local

Antes da apresentação ou entrega:

- [ ] Confirmar que Node.js e npm estão instalados.
- [ ] Executar `npm install` dentro de `backend`.
- [ ] Executar `npm install` dentro de `frontend`.
- [ ] Iniciar o backend com `npm run dev`.
- [ ] Confirmar a resposta de `http://localhost:3001`.
- [ ] Iniciar o frontend com `npm run dev`.
- [ ] Abrir o endereço informado pelo Vite.
- [ ] Acessar a página inicial.
- [ ] Cadastrar um produto válido.
- [ ] Verificar o produto na página de listagem.
- [ ] Buscar o produto pelo nome.
- [ ] Buscar o produto pela categoria.
- [ ] Testar uma busca sem resultados.
- [ ] Cancelar uma exclusão e confirmar que o produto permanece.
- [ ] Confirmar uma exclusão e verificar a atualização da lista.
- [ ] Conferir os dados em `backend/src/data/products.json`.
- [ ] Testar o layout em uma tela menor pelo modo responsivo do navegador.

## Observações

- O backend deve estar em execução para que o frontend consiga carregar, cadastrar ou excluir produtos.
- A porta do backend está definida como `3001`.
- A URL da API no frontend está configurada como `http://localhost:3001/api`.
- Se a porta padrão do Vite estiver ocupada, ele poderá informar outra porta no terminal.
