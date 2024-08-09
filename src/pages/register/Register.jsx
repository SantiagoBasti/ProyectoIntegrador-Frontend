import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useApi from '../../services/interceptor/interceptor'; 
import { useUser } from '../../context/UserContext';
import './Register.css';

export default function Register() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const api = useApi();
    const { login } = useUser(); 

    async function onSubmit(data) {
        try {
            const formData = new FormData();
            formData.append('fullname', data.fullname);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('location', data.location);
            formData.append('bornDate', data.bornDate);
    
            
            if (data.image && data.image[0]) {
                formData.append('user', data.image[0]); 
            }
            
    
            const response = await api.post('/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('User created:', response.data);
    
            const { email, password } = data; 
    
            await login({ email, password });
    
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'El usuario se ha registrado y ha iniciado sesión correctamente.',
                confirmButtonColor: 'rgb(218,54,74)',
            }).then(() => {
                reset();
                window.location.href = '/';
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al registrar el usuario.',
                confirmButtonColor: 'rgb(218,54,74)',
            });
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
                <label>Image</label>
                <input type="file" accept="image/*" {...register("image")} />
                {errors.image && <p className="error-message">{errors.image.message}</p>}
            </div>

            <button type="submit">Registro</button>
        </form>
    );
}
