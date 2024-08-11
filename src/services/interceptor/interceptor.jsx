import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useUser } from '../../context/UserContext';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
});

const useApi = () => {
    const { token, logout } = useUser();

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(config => {
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        });

        const responseInterceptor = api.interceptors.response.use(
            response => response,
            error => {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    Swal.fire({
                        title: "Error",
                        text: "Sesión vencida o inválida",
                        icon: "error",
                        confirmButtonColor: "rgb(218, 54, 74)",
                        timer: 1500
                    }).then(() => {
                        logout();
                    });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [token, logout]);

    return api;
};

export default useApi;
