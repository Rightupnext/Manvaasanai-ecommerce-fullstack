import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (allowedRoles.includes(userRole)) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [allowedRoles]);

  if (isAuthorized === null) {
    return <p>Loading...</p>; // Optional loading state
  }

  return isAuthorized ? children : <Navigate to="/signin" state={{ from: location }} replace />;
};


export default ProtectedRoute;
