import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (userRole === "admin") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null) {
    return <p>Loading...</p>; // Optional loading state
  }

  return isAuthorized ? children : <Navigate to="/signin" state={{ from: location }} replace />;
};

export default ProtectedRoute;
