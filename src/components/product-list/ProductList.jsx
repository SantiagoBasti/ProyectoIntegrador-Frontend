import { useState, useEffect } from "react";
import ProductCard from "../productcard/ProductCard";
import "./ProductList.css";
import useApi from "../../services/interceptor/interceptor";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const api = useApi();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        console.log("Respuesta de la API de productos:", response.data); 

        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("Formato de respuesta inesperada:", response.data);
        }
      } catch (error) {
        console.error("Error al recuperar productos:", error);
      }
    };

    fetchProducts();
  }, [api]);

  return (
    <div>
      <h2>LISTA DE PRODUCTOS</h2>

      <div className="product-card-container">
        {products.map((prod) => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </div>
    </div>
  );
}
