import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './AdminUsers.css';

export default function AdminUsers() {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleAddContact = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset(); // Resetear el formulario al cerrar el modal
    };

    const handleSaveContact = (data) => {
        setContacts((prevContacts) => [...prevContacts, data]);
        Swal.fire({
            icon: 'success',
            title: '¡Contacto agregado!',
            text: 'El contacto se ha agregado correctamente.',
            confirmButtonColor: 'rgb(218,54,74)',
        }).then(() => {
            handleCloseModal();
        });
    };

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
                            <th>Fecha de Nacimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index}>
                                <td><img src={contact.image} alt={contact.fullname} className="contact-image" /></td>
                                <td>{contact.fullname}</td>
                                <td>{contact.email}</td>
                                <td>{contact.bornDate}</td>
                                <td>
                                    {/* botones de editar y eliminar */}
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
                        <h2>Agregar / Editar</h2>
                        <form onSubmit={handleSubmit(handleSaveContact)} className="contact-form">
                        <label htmlFor="fullname">Nombre Completo</label>
                        <input type="text" id="fullname"  {...register('fullname', {required: 'El campo es requerido',minLength: {value: 3,message: 'La cantidad de caracteres es invalida'},
                        maxLength: {value: 35, message: 'El nombre es demasiado largo'}})} placeholder="Ingresa tu nombre completo"/>
                        {errors.fullname && <spa className="error-message">{errors.fullname.message}</spa>}

                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" {...register('email', { required: true })} placeholder="Ingresa tu email" />
                            {errors.email && <span className="error-message">Campo requerido</span>}

                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" {...register('password', { required: true })} placeholder="Ingresa tu contraseña" />
                            {errors.password && <span className="error-message">Campo requerido</span>}
                            <label htmlFor="location">Localización:</label>
                            <select id="location" {...register('location', { required: true })}>
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
                            <input type="date" id="bornDate" {...register('bornDate', { required: true })} />
                            {errors.bornDate && <span className="error-message">Campo requerido</span>}

                            <label htmlFor="image">URL de la Imagen:</label>
                            <input type="url" id="image" {...register('image', { required: true })} placeholder="Ingresa la URL de tu imagen" />
                            {errors.image && <span className="error-message">Campo requerido</span>}
                            <button type="submit" className="btn">Guardar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}