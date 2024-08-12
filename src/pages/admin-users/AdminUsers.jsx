import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Icon from 'react-icons-kit';
import { bin, pencil } from "react-icons-kit/icomoon";
import { formatDateUser } from '../../services/utils/DateUser';
import useApi from '../../services/interceptor/interceptor'; 
import './AdminUsers.css';
import Pagination from '../../components/pagination/Pagination';


export default function AdminUsers() {
  const api = useApi();
  const defaultFormValues = {
    id: "",
    fullname: "",
    bornDate: "",
    email: "",
    image: "",
    location: "",
    password: ""
  };

  const [users, setUsers] = useState([]);
  const [formContact, setFormContact] = useState(defaultFormValues);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: formContact
  });



 
  useEffect(() => {
    getContactList(currentPage, itemsPerPage);
  }, [currentPage]);

  useEffect(() => {
    reset(formContact);
  }, [formContact, reset]);
  

  async function getContactList(page, limit) {
    try {
      const { data } = await api.get(`/users?page=${page}&limit=${limit}`);
      setUsers(data.users);
      setTotalItems(data.total);
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al obtener los usuarios',
        confirmButtonColor: "rgb(218, 54, 74)"
      });
    }
  }

const handleFormSubmit = async (data) => {
  const formData = new FormData();
  formData.append("fullname", data.fullname);
  formData.append("bornDate", new Date(data.bornDate).toISOString());
  formData.append("email", data.email);
  formData.append("location", data.location);
  formData.append("password", data.password);

  if (data.image && data.image[0]) {
      formData.append("user", data.image[0]);
  }

  if (formContact._id) {
      await updateContact({ formData, id: formContact._id });
  } else {
      await createNewContact(formData);
  }
};

async function updateContact({ formData, id }) {
  try {
      await api.put(`/users/${id}`, formData);
      await getContactList(currentPage, itemsPerPage);
      setFormContact(defaultFormValues);
      Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El usuario se editó correctamente",
          confirmButtonColor: "rgb(218, 54, 74)"
      });
  } catch (error) {
      console.error(error);
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el usuario.',
          confirmButtonColor: 'rgb(218,54,74)',
      });
  }
}

async function createNewContact(formData) {
  try {
      const response = await api.post(`/users`, formData);
      setUsers([...users, response.data]);
      setFormContact(defaultFormValues);
      Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El usuario se agregó correctamente",
          confirmButtonColor: "rgb(218, 54, 74)"
      });
  } catch (error) {
      console.error(error);
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el usuario.',
          confirmButtonColor: 'rgb(218,54,74)',
      });
  }
}

async function handleDelete(id) {
    Swal.fire({
        title: "Eliminar Usuario",
        text: "Realmente desea eliminar el usuario",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(218, 54, 74)",
        confirmButtonText: "Borrar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await api.delete(`/users/${id}`);
                await getContactList(currentPage, itemsPerPage);
                Swal.fire({
                    title: "Éxito",
                    text: "El usuario se eliminó correctamente",
                    icon: "success",
                    confirmButtonColor: "rgb(218, 54, 74)" 
                });
            } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el usuario.',
                confirmButtonColor: 'rgb(218,54,74)',
            });
        }
        }
    });
}

function handleEdit(contact) {
    setFormContact({
        ...contact,
        bornDate: new Date(contact.bornDate).toISOString().split('T')[0]
    });
    for (const key in contact) {
        setValue(key, contact[key]);
    }
}

  return (
    <>
      <div className="contact-list-container">

        <div className="contact-form-wrapper">
          <h1>{formContact._id ? "Editar contacto" : "Añadir contacto"}</h1>
          <form className="contact-form" onSubmit={handleSubmit(handleFormSubmit)}>
            <input type="hidden" name="id" />

            <div className="input-group">
              <label htmlFor="fullname">Nombre Completo</label>
              <input
                placeholder="Ingrese el nombre completo"
                {...register('fullname', {
                  required: 'El nombre completo es requerido',
                  minLength: {
                    value: 4,
                    message: 'La cantidad de caracteres es inválida'
                  },
                  maxLength: {
                    value: 35,
                    message: 'El nombre es demasiado largo'
                  }
                })}
              />
              {errors.fullname && <span className='error-message'>{errors.fullname.message}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                placeholder="Ingrese el correo electrónico"
                {...register('email', { required: 'El correo electrónico es requerido' })}
              />
              {errors.email && <span className='error-message'>{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="location">Localización</label>
              <select
                placeholder="Seleccione un país"
                {...register('location', { required: 'La localización es requerida' })}
              >
                <option value="">Seleccione un país</option>
                <option value="Argentina">Argentina</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Brasil">Brasil</option>
                <option value="Chile">Chile</option>
                <option value="Colombia">Colombia</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Perú</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Venezuela">Venezuela</option>
              </select>
              {errors.location && <span className='error-message'>{errors.location.message}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="bornDate">Fecha de Nacimiento</label>
              <input
                type="date"
                placeholder="Ingrese la fecha de nacimiento"
                {...register('bornDate', { required: 'La fecha de nacimiento es requerida' })}
              />
              {errors.bornDate && <span className='error-message'>{errors.bornDate.message}</span>}
            </div>

            <div className="input-group">
            <label htmlFor="image">Imagen</label>
            <input type="file" accept="image/*" {...register("image")} />
              {errors.image && <span className='error-message'>{errors.image.message}</span>}
            </div>

            <div className="input-group">
            <button type="submit" className={formContact._id ? "edit-btn" : "add-button"}>
            {formContact._id ? "Editar contacto" : "Añadir contacto"}
            </button>
            </div>
          </form>
        </div>

        {/* ========================= Lista de contactos========================= */}
        <div className="table-wrapper">
          <div className="contact-table">
            <h1>Lista de Contactos</h1>
            <table>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre Completo</th>
                  <th>Email</th>
                  <th>Localización</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((usuario) => (
                  <tr key={usuario._id} className="contact">
                    <td className="contact-image-wrapper">
                        <img
                        src={`http://localhost:3000/image/users/${usuario.image}`}
                        alt={usuario.fullname}
                        className="contact-image"
                        />
                    </td>
                    <td className="contact-fullname">{usuario.fullname}</td>
                    <td className="contact-email">{usuario.email}</td>
                    <td className="contact-location">{usuario.location}</td>
                    <td className="contact-date">{formatDateUser(usuario.bornDate)}</td>
                    <td className="contact-actions">
                      <button className='edit' onClick={() => handleEdit(usuario)}>
                        <Icon icon={pencil} />
                      </button>
                      <button className="danger" onClick={() => handleDelete(usuario._id)}>
                        <Icon icon={bin} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
          </div>
        </div>

      </div>
    </>
  );
}