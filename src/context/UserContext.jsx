import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_SERVER_URL;

const userContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");

    if (token) localStorage.setItem("token", JSON.stringify(token));
    else localStorage.removeItem("token");
  }, [user, token]);


  // Token expirado el usuario se desloguea
  useEffect(() => {
    const checkTokenValidity = async () => {
        if (token) {
            try {
                await axios.get(`${URL}/verify-token`, {
                    headers: { Authorization: token }
                });
            } catch (error) {
                logout();
            }
        }
    };


    //Tiempo que expira el Token y saca al usuario de la sesion 1H 
    const interval = setInterval(checkTokenValidity, 3600000); 
    return () => clearInterval(interval);
}, [token]);



  async function login(data) {
    try {
      const response = await axios.post(`${URL}/login`, data);

      setUser(response.data.user);
      setToken(response.data.token);

      Swal.fire({
        title: response.data.message,
        text: "El login se realizó correctamente, será redirigido en un instante",
        icon: "success",
        timer: 1500,
        confirmButtonColor: 'rgb(218, 54, 74)'
      }).then(() => {
        navigate("/");
      });

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo hacer el login",
        icon: "error",
        confirmButtonColor: 'rgb(218, 54, 74)'
      });
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    navigate("/");
  }

  return (
    <userContext.Provider value={{ user, token, login, logout }}>
      {children}
    </userContext.Provider>
  );
}