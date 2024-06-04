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
