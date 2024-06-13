import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import './AdminUsers.css';
import Icon from 'react-icons-kit';
import { bin, pencil } from "react-icons-kit/icomoon";
import { formatDateUser } from '../../services/utils/DateUser';

export default function AdminUsers() {
  const URL = `https://665e339a1e9017dc16ef5241.mockapi.io/`;
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

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: formContact
  });

  useEffect(() => {
    getContactList();
  }, []);

  useEffect(() => {
    reset(formContact);
  }, [formContact, reset]);

  async function getContactList() {
    try {
      const { data } = await axios.get(`${URL}users`);
      setUsers(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al obtener los contactos",
      });
    }
  }

  const handleFormSubmit = (data) => {
    const newContact = {
      fullname: data.fullname,
      bornDate: new Date(data.bornDate).getTime(),
      email: data.email,
      image: data.image,
      location: data.location,
      password: data.password,
    };

    if (formContact.id) {
      updateContact({ ...newContact, id: formContact.id });
    } else {
      createNewContact(newContact);
    }
  };

  async function updateContact(contacto) {
    try {
      await axios.put(`${URL}users/${contacto.id}`, contacto);
      getContactList();
      setFormContact(defaultFormValues);
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el contacto", "icon");
    }
  }

  async function createNewContact(contacto) {
    try {
      const response = await axios.post(`${URL}users`, contacto);
      setUsers([...users, response.data]);
      setFormContact(defaultFormValues);
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el contacto", "icon");
    }
  }

  function handleDelete(id) {
    Swal.fire({
      title: "Eliminar Usuario",
      text: "Realmente desea eliminar el usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${URL}users/${id}`);
          getContactList();
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el contacto", "icon");
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
        {/* ===========================Formulario añadir contactos====================== */}
        <div className="contact-form-wrapper">
          <h1>{formContact.id ? "Editar contacto" : "Añadir contacto"}</h1>
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
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                placeholder="Ingrese la contraseña"
                {...register('password', { required: 'La contraseña es requerida' })}
              />
              {errors.password && <span className='error-message'>{errors.password.message}</span>}
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
              <label htmlFor="image">Enlace a la Imagen</label>
              <input
                type="url"
                placeholder="Ingrese el enlace a la imagen"
                {...register('image', { required: 'El enlace a la imagen es requerido' })}
              />
              {errors.image && <span className='error-message'>{errors.image.message}</span>}
            </div>

            <div className="input-group">
              <button type="submit">
                {formContact.id ? "Editar contacto" : "Añadir contacto"}
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
                  <tr key={usuario.id} className="contact">
                    <td className="contact-image-wrapper">
                      <img className="contact-image" src={usuario.image} alt={usuario.fullname} />
                    </td>
                    <td className="contact-fullname">{usuario.fullname}</td>
                    <td className="contact-email">{usuario.email}</td>
                    <td className="contact-location">{usuario.location}</td>
                    <td className="contact-date">{formatDateUser(usuario.bornDate)}</td>
                    <td className="contact-actions">
                      <button onClick={() => handleEdit(usuario)}>
                        <Icon icon={pencil} />
                      </button>
                      <button className="danger" onClick={() => handleDelete(usuario.id)}>
                        <Icon icon={bin} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
