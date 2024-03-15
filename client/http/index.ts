import axios from "axios";

const $host = axios.create({
  baseURL: process.env.APP_API_URL,
});

const $authhost = axios.create({
  baseURL: process.env.APP_API_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authhost.interceptors.request.use(authInterceptor);

export { $host, $authhost };
