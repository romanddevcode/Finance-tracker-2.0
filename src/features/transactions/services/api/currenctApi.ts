import axios from "axios";

const currencyAPI = axios.create({
  baseURL:
    import.meta.env.VITE_CURRENCY_API_URL ||
    "https://openexchangerates.org/api",
  headers: {
    "Content-Type": "application/json",
  },
});

currencyAPI.interceptors.request.use((config) => {
  const key = import.meta.env.VITE_CURRENCY_API_URL_ACCESS_KEY;

  if (!config.params) config.params = {};
  config.params.app_id = key;

  return config;
});

export default currencyAPI;
