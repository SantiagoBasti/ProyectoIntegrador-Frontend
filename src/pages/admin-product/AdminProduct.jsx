import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AdminProduct.css";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatTimestampToInputDate } from "../../services/utils/FormatDate";
import Swal from "sweetalert2";
import { FormatPrice } from "../../services/utils/FormatPrice";

const URL = "https://665e339a1e9017dc16ef5241.mockapi.io";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const response = await axios.get(`${URL}/products`);
      const productos = response.data;
      setProducts(productos);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(data) {
    data.createdAt = new Date(data.createdAt).getTime();
    data.price = +data.price;
  
    if (isEditing) {
      await updateProductData(data);
    } else {
      await createProduct(data);
    }
  }
  
  async function updateProductData(product) {
    try {
      await axios.put(`${URL}/products/${product.id}`, product);
      getProduct();
      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        showConfirmButton: false,
        timer: 1500
      });
      reset(); 
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false); 
    }
  }
  
  async function createProduct(product) {
    try {
      await axios.post(`${URL}/products`, product);
      getProduct(); 
      reset(); 
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: 'Deseas eliminarlo',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "swal2-ok-button"
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${URL}/products/${id}`);
          getProduct();
          Swal.fire({
            title: "¡Eliminado!",
            text: "El producto ha sido eliminado.",
            icon: "success",
            confirmButtonColor: "rgb(218,54,74)"
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  function handleEditProduct(producto) {
    setIsEditing(true);

    setValue("id", producto.id);
    setValue("name", producto.name);
    setValue("price", producto.price);
    setValue("image", producto.image);
    setValue("category", producto.category);
    setValue("description", producto.description);
    setValue("createdAt", formatTimestampToInputDate(producto.createdAt));

    if (!isEditing) {
        reset();
      }
  }

  return (
    <div className="admin-container">
      <h1>Admin Product</h1>
      <div className="admin-form-container">
        <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />
          <div className="input-group">
            <label>Producto</label>
            <input
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
            />
            {errors.name?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
            {(errors.name?.type === "minLength" || errors.name?.type === "maxLength") && (
              <span className="input-error">La cantidad de caracteres es invalida</span>
            )}
          </div>
          <div className="input-group">
            <label>Precio</label>
            <input type="number" {...register("price")} />
          </div>
          <div className="input-group">
            <label>Imagen</label>
            <input type="url" {...register("image")} />
          </div>
          <div className="input-group">
            <label>Categoria</label>
            <select {...register("category")}>
              <option value="">Tipo de motocicleta</option>
              <option value="HyperNaked">HyperNaked</option>
              <option value="SuperDeportiva">SuperDeportiva</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
          <div className="input-group">
            <label>Descripcion</label>
            <textarea {...register("description")} />
          </div>
          <div className="input-group">
            <label>Fecha ingreso</label>
            <input type="date" {...register("createdAt")} />
          </div>
          <button className={isEditing ? 'btn-success' : ''} type="submit">
            {isEditing ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      </div>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr className="admin-table-head">
              <th className="image">Imagen</th>
              <th className="name">Producto</th>
              <th className="category">Tipo de Moto</th>
              <th className="description">Descripcion</th>
              <th className="price">Precio</th>
              <th className="actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="admin-table-row" key={product.id}>
                <td className="image">
                  <img src={product.image} alt={product.name} />
                </td>
                <td className="name">
                  <p>{product.name}</p>
                </td>
                <td className="category">
                  <p>{product.category}</p>
                </td>
                <td className="description">
                  <p className='text-description' title={product.description}>{product.description}
                  </p>
                </td>
                <td className="price">
                <FormatPrice price={product.price} />
                </td>
                <td className="actions">
                  <button className="action-btn" onClick={() => handleEditProduct(product)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="action-btn btn-danger" onClick={() => deleteProduct(product.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
