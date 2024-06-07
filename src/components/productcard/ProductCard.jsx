import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProductCard.css";
import {faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";


export default function ProductCard({ product }) {


  return (
    <article className="product-card">
    <div className="card-container">
        <div className="image-card">
                <img src={product.image} alt={product.name} />
            
            <div className="category-card">
                {product.category}<small>MODELO 2024</small>
            </div>
            <div className="motorcycle-card">
                <h2>{product.name}</h2>
            </div>

            <div className="price-card">
             $ {product.price} <small>COP</small>
            </div>
            <div className="product-review">
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStar} />
           </div>
    </div>
        <div className="card-footer">
            <button>Añadir</button> 
            <button className="btn-icon">
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </button>
        </div>
</div>

    </article>
  );
}