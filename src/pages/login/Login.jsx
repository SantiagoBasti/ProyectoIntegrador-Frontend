import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useUser } from "../../context/UserContext"; 
import './Login.css';

const URL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
    const { login } = useUser();

    console.log(URL)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onLogin = async (data) => {
        try {
            await login(data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                {errors.root && <p className="error-message">{errors.root.message}</p>}
                <form onSubmit={handleSubmit(onLogin)}>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            {...register('email', { required: 'Este campo es obligatorio' })}
                        />
                        {errors.email && <p className="message-error">{errors.email.message}</p>}
                    </div>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            {...register('password', { required: 'Este campo es obligatorio' })}
                        />
                        {errors.password && <p className="message-error">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="login-button">Ingresar</button>
                </form>
            </div>
        </div>
    );
}
