import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <section className="footer-section">
        <img src="https://i.pinimg.com/originals/4f/f5/09/4ff509a7f661b99574cb6b0d86e14232.png" alt="Logo footer" />
        <div className="links">
          <div className="links-column">
            <h2 className="title-column">Yamaha</h2>
            <NavLink className="aspect">Campañas</NavLink>
            <NavLink className="aspect">Yamaha Academy</NavLink>
            <NavLink className="aspect">Tips Manejo</NavLink>
            <NavLink to="/" className="aspect">Rides</NavLink>
            <NavLink className="aspect">Club Yamaha</NavLink>
          </div>
          <div className="links-column">
            <h2 className="title-column">Acerca de</h2>
            <NavLink className="aspect">Yamaha Connect</NavLink>
            <NavLink className="aspect">Garantias</NavLink>
            <NavLink to="/register" className="aspect">Registro</NavLink>
            <NavLink className="aspect">Team Yamaha</NavLink>
            <NavLink to="/" className="aspect">Moto+</NavLink>
          </div>
          <div className="links-column socials-column">
            <h2 className="title-column">Redes Sociales</h2>
            <p className="paragraph-footer">
              Sígueme en las redes sociales para obtener las mejores promociones.
            </p>
            <div className="socials">
              <ul>
                <li className="item">
        <NavLink className="aspect"><i className="fab fa-instagram icon"></i></NavLink>
                </li>
                <li className="item">
        <NavLink className="aspect"><i className="fab fa-linkedin icon"></i></NavLink>
                </li>
                <li className="item">
        <NavLink className="aspect"><i className="fab fa-facebook icon"></i></NavLink>
                </li>
                <li className="item">
        <NavLink className="aspect"><i className="fa-brands fa-x-twitter icon"></i></NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bottom">
        <p className="copyright">© 2024 Todos los derechos reservados</p>
        <div className="legal">
        <NavLink to="/register" className="aspect">Registro</NavLink>
        <NavLink className="aspect">Términos</NavLink>
        <NavLink className="aspect">Privacidad</NavLink>
        </div>
      </section>
    </footer>
  );
}