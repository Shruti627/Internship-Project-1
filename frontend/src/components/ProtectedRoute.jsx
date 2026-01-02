import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    checkAuth().then(setAllowed);
  }, []);

  if (allowed === null) return null;
  if (!allowed) return <Navigate to="/login" />;

  return children;
}
