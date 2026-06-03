import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ProductRegister from './pages/ProductRegister.jsx';
import ProductList from './pages/ProductList.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<ProductRegister />} />
        <Route path="/listagem" element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
