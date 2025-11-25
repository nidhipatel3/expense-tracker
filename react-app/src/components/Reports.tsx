import React, { useState, useEffect } from "react";
import API from "../api/expense";
import { Category, Expense } from "../types";
import Dashboard from "./Dashboard";
import "../styles/reports.css";

const Reports: React.FC = () => {

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [filtered, setFiltered] = useState<Expense[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [category, setCategory] = useState("All");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // fetch category and expense data
        const fetchData = async () => {
            const catResponse = await API.get('/api/category/getCategories');
            setCategories(catResponse.data);
            const response = await API.get('/api/expense/getExpenses');
            setExpenses(response.data);
            setFiltered(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        // date range and category filter
        let data = [...expenses];

        if (startDate)
            data = data.filter((e) => new Date(e.date) >= new Date(startDate));
        if (endDate)
            data = data.filter((e) => new Date(e.date) <= new Date(endDate));
        if (category !== "All")
            data = data.filter((e) => (typeof e.category === "object" ? e.category.name : e.category) === category);
        setFiltered(data);
    }, [startDate, endDate, category, expenses]);

    return (
        <div className="reports-page">
            <div className="filters">
                <div>
                    <label htmlFor="startdate" className="form-label">Start Date :</label>
                    <input type="date" name="startdate" id="startdate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="enddate" className="form-label">End Date :</label>
                    <input type="date" name="enddate" id="enddate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="category" className="form-label">Category :</label>
                    <select value={category} name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                        <option value="All">All</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <Dashboard expenses={filtered} categories={categories} showExpenseList={false} showTitle={false} />
        </div>
    );
}

export default Reports;