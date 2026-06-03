import Navbar from './Navbar.jsx';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">{children}</main>
    </div>
  );
}

export default Layout;
