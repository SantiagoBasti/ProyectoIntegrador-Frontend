import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import './AdminUsers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import DateInput from '../../services/utils/Dateinput'

const URL = "https://665e339a1e9017dc16ef5241.mockapi.io";

export default function AdminUsers() {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(`${URL}/users`);
                setContacts(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, []);

    async function handleAddContact() {
        setIsModalOpen(true);
        setSelectedContact(null);
        reset(); // Resetea el formulario al agregar un nuevo contacto
    }

    async function handleEditContact(contact) {
        setSelectedContact(contact);
        setIsModalOpen(true);
        reset(contact);
    }

    async function handleCloseModal() {
        setIsModalOpen(false);
        reset(); // Resetea el formulario al cerrar el modal
    }

    async function handleSaveContact(data) {
        if (selectedContact) {
            try {
                const response = await axios.put(`${URL}/users/${selectedContact.id}`, data);
                const updatedContacts = contacts.map(contact =>
                    contact.id === selectedContact.id ? response.data : contact
                );
                setContacts(updatedContacts);
                Swal.fire({
                    icon: 'success',
                    title: '¡Contacto actualizado!',
                    text: 'El contacto se ha actualizado correctamente.',
                    confirmButtonColor: 'rgb(218,54,74)',
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await axios.post(`${URL}/users`, data);
                setContacts(prevContacts => [...prevContacts, response.data]);
                Swal.fire({
                    icon: 'success',
                    title: '¡Contacto agregado!',
                    text: 'El contacto se ha agregado correctamente.',
                    confirmButtonColor: 'rgb(218,54,74)',
                });
            } catch (error) {
                console.error(error);
            }
        }
        handleCloseModal();
    }

    async function handleDeleteContact(id) {
        await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Estás seguro de que deseas eliminar este contacto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(218,54,74)',
            cancelButtonColor: 'royalblue',
            confirmButtonText: 'Sí, eliminarlo'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${URL}/users/${id}`);
                    const updatedContacts = contacts.filter(contact => contact.id !== id);
                    setContacts(updatedContacts);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Contacto eliminado!',
                        text: 'El contacto se ha eliminado correctamente.',
                        confirmButtonColor: 'rgb(218,54,74)',
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

    return (
        <div className="container">
            <h1>Admin Usuarios</h1>
            <button onClick={handleAddContact} className="btn">Agregar Contacto</button>
            <div className="table-wrapper">
                <table className="contact-table">
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
                        {contacts.map(contact => (
                            <tr key={contact.id}>
                                <td><img src={contact.image} alt={contact.fullname} className="contact-image" /></td>
                                <td>{contact.fullname}</td>
                                <td>{contact.email}</td>
                                <td>{contact.location}</td>
                                <td>{new Date(contact.bornDate).toLocaleDateString()}</td>
                                <td className='actions'>
                                    <button onClick={() => handleEditContact(contact)} className="action-btn">
                                        <FontAwesomeIcon icon={faPencil} />
                                    </button>
                                    <button onClick={() => handleDeleteContact(contact.id)} className="action-btn btn-delete">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>{selectedContact ? 'Editar Contacto' : 'Agregar Contacto'}</h2>
                        <form onSubmit={handleSubmit(handleSaveContact)} className="contact-form">
                            <label htmlFor="fullname">Nombre Completo</label>
                            <input
                                type="text"
                                id="fullname"
                                defaultValue={selectedContact?.fullname || ''}
                                {...register('fullname', {
                                    required: 'El campo es requerido',
                                    minLength: { value: 3, message: 'La cantidad de caracteres es invalida' },
                                    maxLength: { value: 35, message: 'El nombre es demasiado largo' }
                                })}
                                placeholder="Ingresa tu nombre completo"
                            />
                            {errors.fullname && <span className="error-message">{errors.fullname.message}</span>}

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                defaultValue={selectedContact?.email || ''}
                                {...register('email', { required: true })}
                                placeholder="Ingresa tu email"
                            />
                            {errors.email && <span className="error-message">Campo requerido</span>}

                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                defaultValue={selectedContact?.password || ''}
                                {...register('password', { required: true })}
                                placeholder="Ingresa tu contraseña"
                            />
                            {errors.password && <span className="error-message">Campo requerido</span>}

                            <label htmlFor="location">Localización:</label>
                            <select
                                id="location"
                                defaultValue={selectedContact?.location || ''}
                                {...register('location', { required: true })}
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
                            {errors.location && <span className="error-message">Campo requerido</span>}

                            <label htmlFor="bornDate">Fecha de Nacimiento:</label>
                            <DateInput
                                value={selectedContact?.bornDate}
                                onChange={(date) => setSelectedContact({ ...selectedContact, bornDate: date })}
                                {...register('bornDate', { required: true })}
                            />
                            {errors.bornDate && <span className="error-message">Campo requerido</span>}

                            <label htmlFor="image">URL de la Imagen:</label>
                            <input
                                type="url"
                                id="image"
                                defaultValue={selectedContact?.image || ''}
                                {...register('image', { required: true })}
                                placeholder="Ingresa la URL de tu imagen"
                            />
                            {errors.image && <span className="error-message">Campo requerido</span>}

                            <button type="submit" className={`btn ${selectedContact ? 'btn-update' : ''}`}>
                                {selectedContact ? 'Actualizar' : 'Guardar'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
