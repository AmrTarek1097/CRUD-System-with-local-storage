import React, { useContext } from "react";
import { context } from "../Context/Store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { navigateHome } = useContext(context);

  if (!navigateHome) {
    return <Navigate to="/not-found" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
