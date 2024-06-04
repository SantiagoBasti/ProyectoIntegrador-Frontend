import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const isAdmin = true;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header>
            <img src="https://i.pinimg.com/originals/4f/f5/09/4ff509a7f661b99574cb6b0d86e14232.png" alt="" />
                <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
                    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                        <NavLink to="/" className="nav-link" onClick={toggleMenu}>
                            Home
                        </NavLink>
                        <NavLink to="/register" className="nav-link" onClick={toggleMenu}>
                            Registro
                        </NavLink>
                        {isAdmin && (
                            <>
                                <NavLink to="/admin-product" className="nav-link" onClick={toggleMenu}>
                                    Admin Product
                                </NavLink>
                                <NavLink to="/admin-user" className="nav-link" onClick={toggleMenu}>
                                    Admin Users
                                </NavLink>
                            </>
                        )}
                    </div>
                </nav>

                <div className="menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                </div>

                <div className="user-info">
                    <FontAwesomeIcon icon={faCartShopping} />
                </div>
            </header>
        </>
    );
}