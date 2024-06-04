import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Register.css';

const URL = "https://665e339a1e9017dc16ef5241.mockapi.io/users";

export default function Register() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    async function onSubmit(data) {
        try {
            const response = await axios.post(URL, data);
            console.log('User created:', response.data);
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'El usuario se ha registrado correctamente.',
                confirmButtonColor: 'rgb(218,54,74)',
            }).then(() => {
                reset();
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <div>
                <label>Nombre Completo</label>
                <input
                    {...register('fullname', {
                        required: 'El campo es requerido',
                        minLength: {
                            value: 3,
                            message: 'La cantidad de caracteres es invalida'
                        },
                        maxLength: {
                            value: 35,
                            message: 'El nombre es demasiado largo'
                        }
                    })}
                    placeholder="Ingresa tu nombre completo"
                />
                {errors.fullname && <p className="error-message">{errors.fullname.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input
                    type="email"
                    {...register('email', { required: 'El campo es requerido' })}
                    placeholder="Ingresa tu email"
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    {...register('password', { required: 'El campo es requerido' })}
                    placeholder="Ingresa tu contraseña"
                />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>

            <div>
                <label>Localización</label>
                <select {...register('location', { required: 'El campo es requerido' })}>
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
                {errors.location && <p className="error-message">{errors.location.message}</p>}
            </div>

            <div>
                <label>Fecha de nacimiento</label>
                <input
                    type="date"
                    {...register('bornDate', { required: 'El campo es requerido' })}
                />
                {errors.bornDate && <p className="error-message">{errors.bornDate.message}</p>}
            </div>

            <div>
                <label>Image URL</label>
                <input
                    type="url"
                    {...register('image', { required: 'El campo es requerido' })}
                    placeholder="Ingresa la URL de tu imagen"
                />
                {errors.image && <p className="error-message">{errors.image.message}</p>}
            </div>

            <div>
                <label>Rol</label>
                <select {...register('role', { required: 'El campo es requerido' })}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && <p className="error-message">{errors.role.message}</p>}
            </div>

            <button type="submit">Register</button>
        </form>
    );
}
