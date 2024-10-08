import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const AdminGuard = ({ children }) => {
    const { user } = useUser();

    if (!user) {
    
        return <Navigate to="/login" />;
    }

    if (user?.role !== 'ADMIN_ROLE') {
        
        return <Navigate to="/" />;
    }


    return children;
};

export default AdminGuard;
