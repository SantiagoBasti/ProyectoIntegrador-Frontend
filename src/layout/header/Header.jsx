import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export default function Header() {
    const isAdmin = true;
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="header">
            <div className="logo">
                <img src="https://i.pinimg.com/originals/4f/f5/09/4ff509a7f661b99574cb6b0d86e14232.png" alt="" />
            </div>
            <nav className={`header-nav ${showMenu ? "show-menu" : ""}`}>
                <div className="nav-links">
                    <NavLink to="/" className="nav-link" onClick={() => setShowMenu(false)}>
                        Home
                    </NavLink>
                    <NavLink to="/register" className="nav-link" onClick={() => setShowMenu(false)}>
                        Registro
                    </NavLink>
                    {isAdmin && (
                        <>
                            <NavLink to="/admin-product" className="nav-link" onClick={() => setShowMenu(false)}>
                                Admin Product
                            </NavLink>
                            <NavLink to="/admin-user" className="nav-link" onClick={() => setShowMenu(false)}>
                                Admin Users
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
            <div className={`menu-icon ${showMenu ? "open" : ""}`} onClick={() => setShowMenu(!showMenu)}>
                <FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
            </div>
            
            <div className="user-info">
                <FontAwesomeIcon icon={faCartShopping} />
            </div>
        </header>
    );
}
