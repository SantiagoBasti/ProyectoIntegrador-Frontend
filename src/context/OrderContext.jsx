import { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import { useUser } from "./UserContext";
import useApi from "../services/interceptor/interceptor";
import Swal from "sweetalert2";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const {user, token} = useUser();
  const api = useApi()

  const [order, setOrder] = useState(

    JSON.parse(localStorage.getItem("order")) || []
  );

  const [count, setCount] = useState(0);

  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {

    localStorage.setItem("order", JSON.stringify(order));

    calculateTotal()
    calculateCount()
  }, [order]);

  const [total, setTotal] = useState(0);

  function addOrderItem(producto) {

    const product = order.find((prod) => prod._id === producto._id);

    if (product) {
      handleChangeQuantity(product._id, product.quantity + 1);
    } else {

      producto.quantity = 1


      setOrder([...order, producto]);

    }
  }

  function calculateTotal() {
    let totalCount = 0;

    order.forEach((prod) => {
      totalCount += prod.price * prod.quantity;
    });

    setTotal(totalCount)
  }

  function calculateCount(){
    let count = 0;

    order.forEach((prod) => {
      count += prod.quantity;
    });
    setCount(count);

  }

  function handleChangeQuantity(id, quantity) {
    // quantity = Math.max(0, quantity);

    const updProducts = order.map((item) => {
      if (item._id === id) {
        item.quantity = +quantity;

      }
      return item;
    });

    setOrder(updProducts);
  }

  function removeItem(id) {
    Swal.fire({
      title: "Borrar Archivo",
      text: "Realmente desea quitar este producto",
      icon: "error",
      showConfirmButton: true,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Borrar",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        const products = order.filter((prod) => prod._id !== id);


        setOrder(products);
      }
    });
  }

  async function postOrder(){
    try{
      if(!user || !token){
        Swal.fire({
          title: "Error",
          text:"Debe estar logueado para realizar su compra",
          icon: "warning",
          timer: 4000
        })
        return
      }
      const products = order.map(item => {
        return{
          quantity: item.quantity,
          product: item._id,
          price: item.price,
        }
      })

      const nuevaOrden = {
        total,
        user: user._id,
        products
      }

    
      const response = await api.post("/orders", nuevaOrden);
      
      if(!response) throw new Error("Error al crear la orden")
      Swal.fire("Orden Creada", "La compra se creo correctamente", "success")

      setOrder([])

      const orders = await api.get(`/orders/${user._id}`);

      console. log (orders.data)

    } catch(error) {
      console.log(error)

      Swal.fire("Error, Error al crear orden", 'error')
    }
  }


  function toggleSidebarOrder() {
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        total,
        sidebarToggle,
        count,
        addOrderItem,
        handleChangeQuantity,
        removeItem,
        toggleSidebarOrder,
        postOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};