import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken as setAxiosToken } from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore
    } finally {
      setAxiosToken(null);
      setUser(null);
    }
  };

  // 🔁 Restore session ONLY on first app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post("/auth/refresh");
        setAxiosToken(res.data.accessToken);

        const me = await api.get("/auth/me");
        setUser(me.data);
      } catch {
        setAxiosToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
