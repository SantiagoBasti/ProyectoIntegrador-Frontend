import { useState } from "react";
import ProductCard from "../productcard/ProductCard";
import { useEffect } from "react";
import axios from "axios";
import "./ProductList.css";

const URL = "https://665e339a1e9017dc16ef5241.mockapi.io";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  // Generar un estado para nuestros productos []
  // UseEffect hacer una petición controlada
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get(`${URL}/products`);

      const productsAPI = response.data;

      console.log(productsAPI);

      setProducts(productsAPI);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>LISTA DE PRODUCTOS</h2>

      <div className="product-card-container">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}