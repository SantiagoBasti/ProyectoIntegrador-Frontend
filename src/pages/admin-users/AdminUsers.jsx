import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminUsers.css';
import Icon from 'react-icons-kit';
import { bin, pencil } from "react-icons-kit/icomoon";
import {formatDateUser} from '../../services/utils/DateUser';

export default function AdminUsers() {
  const URL = `https://665e339a1e9017dc16ef5241.mockapi.io/`;
  const defaultFormValues = {
    id: "",
    fullname: "",
    bornDate: "",
    email: "",
    phone: "",
    image: "",
  };

  const [users, setUsers] = useState([]);
  const [formContact, setFormContact] = useState(defaultFormValues);

  useEffect(() => {
    getContactList();
  }, []);

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

  function handleSubmit(evt) {
    evt.preventDefault();
    const el = evt.target.elements;

    const newContact = {
      fullname: el.fullname.value,
      bornDate: new Date(el.bornDate.value).getTime(),
      email: el.email.value,
      phone: el.phone.value,
      image: el.image.value,
    };

    if (formContact.id) {
      updateContact({ ...newContact, id: formContact.id });
    } else {
      createNewContact(newContact);
    }
  }

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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormContact((previousValue) => ({ ...previousValue, [name]: value }));
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
    setFormContact({ ...contact });
  }

  return (
    <>
      <div className="contact-list-container">
        {/* ===========================Formulario anadir contactos====================== */}
        <div className="contact-form-wrapper">
          <h1>Añadir Contactos</h1>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="id" />

            <div className="input-group">
              <label htmlFor="fullname">Nombre Completo</label>
              <input value={formContact.fullname} onChange={handleChange} type="text" id="fullname" name="fullname" />
            </div>

            <div className="input-group">
              <label htmlFor="bornDate">Fecha de nacimiento</label>
              <input type="date" id="bornDate" name="bornDate" value={formatDateUser(formContact.bornDate)} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label htmlFor="email">Correo Electronico</label>
              <input value={formContact.email} onChange={handleChange} type="email" id="email" name="email" />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Telefono</label>
              <input value={formContact.phone} onChange={handleChange} type="text" id="phone" name="phone" />
            </div>

            <div className="input-group">
              <label htmlFor="image">Enlace a la Imagen</label>
              <input value={formContact.image} onChange={handleChange} type="url" id="image" name="image" />
            </div>

            <div className="input-group">
              <button type="submit">
                {formContact.id ? "Editar contacto" : "Añadir contacto"}
              </button>
            </div>
          </form>
        </div>

        {/* ========================= Lista de contactos========================= */}
        <div className="contact-list">
          <h1>Lista de Contactos</h1>
          <ul>
            {users.map((usuario) => (
              <li key={usuario.id} className="contact">
                <div className="contact-image-wrapper">
                  <img className="contact-image" src={usuario.image} alt={usuario.fullname} />
                </div>
                <div className="contact-user">
                  <div className="contact-fullname">{usuario.fullname}</div>
                  <span className="contact-date">{usuario.bornDate}</span>
                </div>
                <div className="contact-email">{usuario.email}</div>
                <div className="contact-phone">{usuario.phone}</div>
                <div className="contact-actions">
                  <button onClick={() => handleEdit(usuario)}>
                    <Icon icon={pencil} />
                  </button>
                  <button className="danger" onClick={() => handleDelete(usuario.id)}>
                    <Icon icon={bin} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}