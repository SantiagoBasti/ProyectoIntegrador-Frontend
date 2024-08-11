import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProductCard.css";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { FormatPrice } from "../../services/utils/FormatPrice";
import { useOrder } from "../../context/OrderContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const { addOrderItem } = useOrder();

  const handleDetailClick = () => {
    navigate(`/product-detail/${product._id}`);
  };

  return (
    <article className="product-card">
      <div className="card-container">
        <div className="image-card">
          <img src={`http://localhost:3000/image/products/${product.productImage}`} alt={product.name} />
          <div className="category-card">
            {product.category.name}<small>MODELO 2024</small>
          </div>
          <div className="motorcycle-card">
            <h2>{product.name}</h2>
          </div>
          <div className="price-card">
          <FormatPrice price={product.price} /> <small>COP</small>
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
          <button onClick={() => addOrderItem(product)}>Añadir</button> 
          <button className="btn-icon" onClick={handleDetailClick}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </button>
        </div>
      </div>
    </article>
  );
}
