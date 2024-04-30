import axios, { AxiosInstance } from "axios";

const axiosClassInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/class",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClassInstance;
