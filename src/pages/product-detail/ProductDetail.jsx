import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useApi from '../../services/interceptor/interceptor'
import { FormatPrice } from '../../services/utils/FormatPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../context/OrderContext'; 
import './ProductDetail.css';

const ProductDetail = () => {
  const api = useApi(); 

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalDescription, setModalDescription] = useState(false);
  const { addOrderItem } = useOrder(); 

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => {
        console.log('Product data:', response.data); 
        setProduct(response.data.product); 
      })
      .catch(error => {
        console.log('Error al recuperar los detalles del producto:', error);
      });
  }, [id, api]);
  

  const handleQuoteClick = () => {
    setModalDescription(!modalDescription);
  };

  const handleBuyClick = (product) => {
    addOrderItem(product);
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <>
    <div className='container-main'>
      <div className="container-motorcycle">
        <div className="moto-container">
          <img 
            src={`http://localhost:3000/image/products/${product.productImage}`}
            alt={product?.name} 
            className="moto-image"
          />
          <div className="moto-info">
            <h2>{product?.name}</h2>
            <h3>2024</h3>
            <p className='price-motocycle'>
              <FormatPrice price={product?.price} /> COP
            </p>
            <button className="cta-button" onClick={handleQuoteClick}>
              Descripción →
            </button>
            <button className="cta-button btn-cart" onClick={() => handleBuyClick(product)}>
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
        </div>
      </div>
    </div>
      
      {modalDescription && (
        <div className="modal-motorcycle">
          <div className="modal-content-motorcycle">
            <span className="close" onClick={handleQuoteClick}>&times;</span>
            <img 
              src={`http://localhost:3000/image/products/${product.productImage}`}
              alt={product?.name} 
              className="modal-image"
            />
            <h2>{product?.name} <small>{product?.category.name}</small></h2>
            <p>
              {product?.description || 'Descripción no disponible'}
            </p>
          </div>
        </div>
      )}
    </>
  );
  
};

export default ProductDetail;
