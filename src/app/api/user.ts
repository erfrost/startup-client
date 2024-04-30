import axios, { AxiosInstance } from "axios";

const axiosUserInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/user",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosUserInstance;
