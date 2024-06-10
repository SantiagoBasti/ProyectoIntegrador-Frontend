import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/footer/Footer';
import Header from './layout/header/Header';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import AdminProduct from './pages/admin-product/AdminProduct';
import AdminUsers from './pages/admin-users/AdminUsers';
import ProductDetail from './pages/product-detail/ProductDetail';
import AdminGuard from './services/guard/AdminGuard';

function App() {
  return (
    <>
      <Header />

      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin-product"
            element={
              <AdminGuard>
                <AdminProduct />
              </AdminGuard>
            }
          />
          <Route
            path="/admin-user"
            element={
              <AdminGuard>
                <AdminUsers />
              </AdminGuard>
            }
          />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
