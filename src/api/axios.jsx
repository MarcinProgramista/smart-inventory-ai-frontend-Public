import axios from "axios";
import API_CONFIG from "../config/api.js";

export const axiosPublic = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
