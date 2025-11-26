import axios from "axios";
import { Category } from "../types";

const API = axios.create({
  baseURL: "http://localhost:8001/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const addCategory = (formData: Category) => {
  return API.post("/api/category/addCategory", formData);
}

export const updateCategory = async (id: string | undefined, data: Partial<Category>) => {
  const response = await API.patch(`/api/category/${id}`, data);
  return response.data;
}

export const deleteCategory = async (id: string | undefined) => {
  const response = await API.delete(`/api/category/${id}`);
  return response.data;
}

export default API;