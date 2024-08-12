import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './layout/footer/Footer';
import Header from './layout/header/Header';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import AdminProduct from './pages/admin-product/AdminProduct';
import AdminUsers from './pages/admin-users/AdminUsers';
import ProductDetail from './pages/product-detail/ProductDetail';
import AdminGuard from './services/guard/AdminGuard';
import AuthGuard from './services/guard/AuthGuard'; 
import OrderSidebar from './layout/order-sidebar/OrderSidebar';


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header />}
      <OrderSidebar />
      <main className="main-container">
        <Routes>
          <Route
            path="/login"
            element={
              <AuthGuard>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path="/register"
            element={
              <AuthGuard>
                <Register />
              </AuthGuard>
            }
          />
          <Route path="/" element={<Home />} />
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
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
