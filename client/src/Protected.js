import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const token = localStorage.getItem("user");

    if (!token) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Protected;