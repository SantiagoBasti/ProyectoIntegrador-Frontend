import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { formatTimestampToInputDate } from "../../services/utils/FormatDate";
import useApi from '../../services/interceptor/interceptor'; 
import { FormatPrice } from "../../services/utils/FormatPrice";
import "./AdminProduct.css";

export default function AdminProduct() {
  const api = useApi();

  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([])

  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
      getProduct();
      getCategories();
  }, []);

  

  async function getCategories(){
    try{

      const response = await api.get(`/categories`)

      const categoriesDB = response.data.categories

      setCategories(categoriesDB)

    }catch(error){
      console.log("Error al obtener categorias", error)
    }
  }

  async function getProduct() {
    try {
      const response = await api.get(`/products`);

      const { products } = response.data;
      setProducts(products);


    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit(data) {
    console.log(data)
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("price", +data.price);
    formData.append("description", data.description);
    formData.append("productImage", data.productImage.length ? data.productImage[0] : undefined);
    formData.append("createdAt", new Date(data.createdAt).getTime());
    formData.append("category", data.category);
  
    if (data.id) {
      updateProductData(formData);
    } else {
      createProduct(formData);
    }
  }


  async function updateProductData(productFormData) {
    try {
      const id = productFormData.get('id');
      
  
     const response = await api.put(`/products/${id}`, productFormData)

      console.log(response.data)

      getProduct();
      setIsEditing(false);
      reset();
      Swal.fire({
        title: '¡Éxito!',
        text: 'El producto se editó correctamente',
        icon: 'success',
        confirmButtonColor: "rgb(218, 54, 74)"
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  
  async function createProduct(product) {
    try {
      const newProduct = 
      await api.post(`products`, product);
  
      
      getProduct()
      console.log(newProduct.data)
      reset();
      Swal.fire({
        title: '¡Éxito!',
        text: 'Producto agregado correctamente',
        icon: 'success',
        confirmButtonColor: "rgb(218, 54, 74)"
      });

    } catch (error) {
      console.log(error);

    }
  }
  
  async function deleteProduct(id) {
    try {
      
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Realmente desea eliminar el producto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "rgb(218, 54, 74)",
        confirmButtonText: 'Sí, eliminar'
      });
  
      if (result.isConfirmed) {
        
        await api.delete(`/products/${id}`);
        
        getProduct();
        
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El producto ha sido eliminado.',
          icon: 'success',
          confirmButtonColor: "rgb(218, 54, 74)"
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  function handleEditProduct(producto) {
    console.log("Editar producto", producto)
    setIsEditing(true);

    setValue("id", producto._id);
    setValue("name", producto.name);
    setValue("price", producto.price);

    setValue("category", producto.category._id);
    setValue("description", producto.description);
    setValue("createdAt", formatTimestampToInputDate(producto.createdAt));
    
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
              <span className="input-error">La cantidad de caracteres es inválida</span>
            )}
          </div>
          <div className="input-group">
            <label>Precio</label>
            <input
              type="number"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>
          <div className="input-group">
            <label>Imagen</label>
            <input type="file" accept="image/*" {...register("productImage") } />
            {errors.image && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>
          <div className="input-group">
            <label>Categoria</label>
            <select {...register("category", { required: true })}>
              <option value="">Tipo de motocicleta</option>
              {
                categories.map(category => (
                  <option value={category._id} key={category._id}>
                    {category.viewValue}
                  </option>
                ))
              }
            </select>
            {errors.category && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>
          <div className="input-group">
            <label>Descripcion</label>
            <textarea {...register("description", { required: true })} />
            {errors.description && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>
          <div className="input-group">
            <label>Fecha ingreso</label>
            <input
              type="date"
              {...register("createdAt", { required: true })}
            />
            {errors.createdAt && (
              <span className="input-error">El campo es requerido</span>
            )}
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
              <tr className="admin-table-row" key={product._id}>
                <td className="image">
                <img 
                  src={`http://localhost:3000/image/products/${product.productImage}`} alt={product.name} />
                </td>
                <td className="name">
                  <p>{product.name}</p>
                </td>
                <td className="category">
                  <p>{product.category.name}</p>
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
                  <button className="action-btn btn-danger" onClick={() => deleteProduct(product._id)}>
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
