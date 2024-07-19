import axios from "axios";
import Constants from "../config/constants";
import CryptoUtil from "@/utils/cryptoUtil";

const axiosClient = axios.create({
  baseURL: Constants.BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request inerceptor
axiosClient.interceptors.request.use(
  function (config) {
    let tokenStorage = localStorage.getItem("adminAuthenticate");

    if (tokenStorage) {
      const token_access = JSON.parse(CryptoUtil.decrypt("secret key", tokenStorage))["accessToken"];
      config.headers.Authorization = "Bearer " + token_access;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
