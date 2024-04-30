import axios, { AxiosInstance } from "axios";

const axiosDefaultInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosDefaultInstance;
