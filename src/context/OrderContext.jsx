import { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import Swal from "sweetalert2";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("order"))  || []
  );

  const [sidebarToggle, setsidebarToggle] = useState(false)
  const [count, setCount] = useState(0); 

  useEffect(() =>{
    let totalCount = 0;
    order.forEach((prod) => {
      totalCount += prod.quantity;
    });
    setCount(totalCount); 
    localStorage.setItem("order", JSON.stringify(order))
    calculateTotal();
  }, [order]);

  const [total, setTotal] = useState(0);

  function addOrderItem(producto) {
    const product = order.find((prod) => prod.id === producto.id);
    if (product) {
      handleChangeQuantity(product.id, product.quantity + 1);
    } else {
      producto.quantity = 1;
      setOrder([...order, producto]);
    }
  }

  function calculateTotal() {
    let totalCount = 0;
    order.forEach((prod) => {
      totalCount += prod.price * prod.quantity;
    });
    setTotal(totalCount);
  }

  function handleChangeQuantity(id, quantity){
    const updateOrder = order.map(item => {
      if(item.id === id){
        item.quantity = quantity;
      }
      return item
    });
    setOrder(updateOrder)
  }

  function removeItem(id){
    Swal.fire({
      title:"Borar Archivo",
      text:"Realmente desea quitar este producto",
      icon:"error",
      showConfirmButton: true,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText:"Borrar",
      confirmButtonColor: "red",
    }).then(result => {
      if(result.isConfirmed){
        const updOrder = order.filter(prod => prod.id !== id);
        setOrder(updOrder)
      }
    })
  }

  function toggleSidebarOrder(){
    setsidebarToggle(!sidebarToggle)
  }

  return (
    <OrderContext.Provider value={{ order, total, sidebarToggle, count, addOrderItem, handleChangeQuantity, removeItem, toggleSidebarOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
