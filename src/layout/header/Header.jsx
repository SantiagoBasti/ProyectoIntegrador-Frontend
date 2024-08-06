import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useUser();
    const { toggleSidebarOrder, count } = useOrder();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleAuthClick = () => {
        if (user) {
            logout();
        } else {
            window.location.href = "/login";
        }
    };

    return (
        <header>
            <img src="https://i.pinimg.com/originals/4f/f5/09/4ff509a7f661b99574cb6b0d86e14232.png" alt="" />
            <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
                <NavLink to="/" className="nav-link" onClick={toggleMenu}>
                    Home
                </NavLink>
                {!user && (
                    <NavLink to="/register" className="nav-link" onClick={toggleMenu}>
                        Registro
                    </NavLink>
                )}
                {user?.role === 'ADMIN_ROLE' && (
                    <>
                        <NavLink to="/admin-product" className="nav-link" onClick={toggleMenu}>
                            Admin Product
                        </NavLink>
                        <NavLink to="/admin-user" className="nav-link" onClick={toggleMenu}>
                            Admin Users
                        </NavLink>
                    </>
                )}
            </nav>
            <div className="right-section">
                <div className="menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                </div>
                <div className="user-info">
                    <div className="user-login-icon" onClick={handleAuthClick}>
                        <FontAwesomeIcon icon={faUser} />
                        <span className="user-status-label">
                            {user ? 'Logout' : 'Login'}
                        </span>
                    </div>
                    <div className={`user-cart-container ${count < 1 ? "" : "show-circle"}`} data-count={count}>
                        <FontAwesomeIcon className="user-cart" icon={faCartShopping} onClick={toggleSidebarOrder} />
                    </div>
                </div>
            </div>
        </header>
    );
}
