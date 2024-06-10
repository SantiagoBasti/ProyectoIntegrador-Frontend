import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDetail.css';
import { FormatPrice } from '../../services/utils/FormatPrice';

const URL = "https://665e339a1e9017dc16ef5241.mockapi.io"
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalDescription, setModalDescription] = useState(false);

  useEffect(() => {
    axios.get(`${URL}/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleQuoteClick = () => {
    setModalDescription(!modalDescription);
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="container-motorcycle">
        <div className="moto-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="moto-image"
          />
          <div className="moto-info">
            <h2>{product.name}</h2>
            <h3>2024</h3>
            {/* Utilizar el componente FormatPrice para mostrar el precio */}
            <p className='price-motocycle'>
              <FormatPrice price={product.price} /> COP
              </p>
            <button className="cta-button" onClick={handleQuoteClick}>
              Descripción →
            </button>
          </div>
        </div>
      </div>
      
      {modalDescription && (
        <div className="modal-motorcycle">
          <div className="modal-content-motorcycle">
            <span className="close" onClick={handleQuoteClick}>&times;</span>
            <img 
              src={product.image} 
              alt={product.name} 
              className="modal-image"
            />
            <h2>{product.name} <small>{product.category}</small></h2>
            <p>
              {product.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
