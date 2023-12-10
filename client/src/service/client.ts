import { router } from "@/router";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("@userToken");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        router.navigate("/");
        // throw new Error("A sua sessão expirou.");
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
