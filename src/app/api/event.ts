import axios, { AxiosInstance } from "axios";

const axiosEventInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/event",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosEventInstance;
