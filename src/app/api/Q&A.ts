import axios, { AxiosInstance } from "axios";

const axiosQAInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/QA",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosQAInstance;
