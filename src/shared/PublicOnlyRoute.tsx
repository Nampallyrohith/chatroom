// components/PublicOnlyRoute.tsx
// JSX types for component typing
import type { JSX } from "react";

// Navigation component for route redirects
import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("loggedIn");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
