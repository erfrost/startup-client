import axios, { AxiosInstance } from "axios";

const axiosChatInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/chat",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosChatInstance;
