import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import "./OrderSidebar.css";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FormatPrice } from "../../services/utils/FormatPrice";

export default function OrderSidebar() {
  const { order, total, handleChangeQuantity, removeItem, sidebarToggle } = useOrder();

  return (
    <div className={`order-sidebar ${sidebarToggle ? 'active' : ''}`}>
      <div className="order-header">
        <h2>Orden actual:</h2>
      </div>
      <div className="order-list">
        {order.map((product) => (
          <div className="order-item" key={product.id}>
            <div className="order-item-details">
              <img className="order-image" src={product.image ?? "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"} alt="" />
              <div className="order-info">
                <div className="order-item-name" title={product.name}>
                  {product.name}
                </div>
                <div className="order-quantity">

                <input type="numbre" className="order-quantity-input" value={product.quantity} onChange={(evt) => handleChangeQuantity(product.id, evt.target.value)} min={1}/>
                <div className="order-price"><FormatPrice price={product.price * product.quantity} /> <small>COP</small>
                </div>
                  <FontAwesomeIcon icon={faTrashCan} title="Eliminar Producto" className="trash-icon" onClick={() => removeItem(product.id)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="order-footer">
        <div className="total">
          <div className="total-count">Items: {order.length}</div>
          <div className="total-price">
            Total: <FormatPrice price={total} />
          </div>
        </div>
        <button className="checkout-button">Realizar Pedido</button>
      </div>
    </div>
  );
}

