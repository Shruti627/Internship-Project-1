import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL + "/api",
  withCredentials: true
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

/* ===== REQUEST INTERCEPTOR ===== */
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/* ===== RESPONSE INTERCEPTOR ===== */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    /* ❌ If already retried or auth routes → stop */
    if (
      originalRequest._retry ||
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    /* 🔄 Try refresh once */
    if (error.response?.status === 401) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          API_URL + "/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        setAccessToken(res.data.accessToken);
        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        setAccessToken(null);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
