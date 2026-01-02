import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken as setAxiosToken } from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await api.post("/auth/logout");
    setAccessToken(null);
    setAxiosToken(null);   // 🔑 SYNC HERE
    setUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post("/auth/refresh");

        setAccessToken(res.data.accessToken);
        setAxiosToken(res.data.accessToken); // 🔑 SYNC HERE

        const me = await api.get("/auth/me");
        setUser(me.data);
      } catch {
        setAccessToken(null);
        setAxiosToken(null); // 🔑 SYNC HERE
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
