import axios from "axios";

const currencyAPI = axios.create({
  baseURL:
    import.meta.env.VITE_CURRENCY_API_URL || "https://api.exchangerate.host",
  headers: {
    "Content-Type": "application/json",
  },
});

currencyAPI.interceptors.request.use((config) => {
  console.log("Interceptor config before:", config);
  const key = import.meta.env.VITE_CURRENCY_API_URL_ACCESS_KEY;

  console.log("key", key);
  if (!config.params) config.params = {};
  config.params.app_id = key;

  console.log("Interceptor config after:", config);

  return config;
});

export default currencyAPI;
