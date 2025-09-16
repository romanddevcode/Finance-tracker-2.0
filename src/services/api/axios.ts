import axios from "axios";

let accessToken: string = localStorage.getItem("accessToken") ?? "";
let refreshToken: string = localStorage.getItem("refreshToken") ?? "";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && refreshToken) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/refresh`,
          {
            refreshToken,
          }
        );

        accessToken = res.data.accessToken;
        refreshToken = res.data.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // повторяем оригинальный запрос
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return API(error.config);
      } catch (err) {
        // refresh не сработал → кидаем на логин
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
