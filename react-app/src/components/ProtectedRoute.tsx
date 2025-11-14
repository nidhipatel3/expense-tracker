import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useUser();
    if (loading) {
        return <div style={{ textAlign: "center", marginTop: "20%" }}>Loading...</div>;
    }
    if (!user) {
        return <Navigate to="/user/signin" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;