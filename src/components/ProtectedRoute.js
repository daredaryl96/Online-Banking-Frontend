import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element, requiredRole }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // If the user role is not authorized, redirect to the home page
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;
