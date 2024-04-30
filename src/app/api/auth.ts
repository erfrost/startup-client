import axios, { AxiosInstance } from "axios";

const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosAuthInstance;
