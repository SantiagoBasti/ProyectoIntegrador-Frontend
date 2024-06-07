import BannerPrincipal from "../../components/banner/Banner";
import ProductList from "../../components/product-list/ProductList";

export default function Home() {
    return (
      <>
        <BannerPrincipal />
  
        <h1>Productos </h1>
        <ProductList/>
      </>
    );
  }
