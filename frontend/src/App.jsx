import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Home from './pages/Home.jsx';
import ProductRegister from './pages/ProductRegister.jsx';
import ProductList from './pages/ProductList.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <>
      <Navigation />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<ProductRegister />} />
          <Route path="/listagem" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
