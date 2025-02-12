import axios from "axios";

const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (role) {
      config.headers["User-Role"] = role;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
