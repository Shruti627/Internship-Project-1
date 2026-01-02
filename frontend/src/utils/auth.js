import api from "../api/axios";

export const checkAuth = async () => {
  try {
    await api.get("/auth/me");
    return true;
  } catch {
    return false;
  }
};

export const logout = async () => {
  await api.post("/auth/logout");
};
