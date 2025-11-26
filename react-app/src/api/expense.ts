import axios from "axios";
import { Expense } from "../types";

const API = axios.create({
    baseURL: "http://localhost:8001/",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const addExpense = async (formData: Expense) => {
    const response = await API.post<Expense>('/api/expense/addExpense', formData);
    return response.data;
}

export const updateExpense = async (id: string | undefined, data: Partial<Expense>) => {
    if (!id) throw new Error("Expense ID is required");
    const response = await API.patch<Expense>(`/api/expense/${id}`, data);
    return response.data;
}

export const deleteExpense = async (id: string | undefined) => {
    if (!id) throw new Error("Expense ID is required");
    const response = await API.delete(`/api/expense/${id}`);
    return response.data;
}

export default API;