<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header(){
    const isAdmin = true;


    return(
    <>
    <header>
        <img src="https://i.pinimg.com/originals/4f/f5/09/4ff509a7f661b99574cb6b0d86e14232.png" alt="" />
        <nav className="header-nav">
        <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/register" className="nav-link">
            Registro
          </NavLink>
          {isAdmin && (
            <>
              <NavLink to="/admin-product" className="nav-link">
                Admin Product
              </NavLink>
              <NavLink to="/admin-user" className="nav-link">
                Admin Users
              </NavLink>
            </>
          )}
        </nav>

        <div className="user-info">
          <FontAwesomeIcon icon={faCartShopping}/>
        </div>
    </header>
    </>
    )
}
=======
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
        <header>
            <img src="https://i.pinimg.com/originals/4f/f5/09/4ff509a7f661b99574cb6b0d86e14232.png" alt="" />
            <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
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
            </nav>
            <div className="right-section">
                <div className="menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                </div>
                <div className="user-info">
                    <FontAwesomeIcon icon={faCartShopping} />
                </div>
            </div>
        </header>
    );
}
>>>>>>> feature/header
