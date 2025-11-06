import React, { useState, useEffect } from "react";
import API, { addExpense } from "../api/expense";
import { useNavigate } from "react-router-dom";
import { Expense, Category } from "../types";

const ExpenseAdd: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<Partial<Expense>>({
        type: "expense",
        amount: 0,
        description: "",
        category: { _id: "", name: "", color: "", description: "" },
        date: new Date(),
    });
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // fetch all categories
        const fetchData = async () => {
            try {
                const cat = await API.get(`/api/category/getCategories`);
                setCategories(cat.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target.name === "category") {
            const selectedCategory = categories.find(
                (cat) => cat._id === e.target.value
            );
            setFormData((prev) => ({
                ...prev,
                category: selectedCategory || {
                    _id: "",
                    name: "",
                    color: "",
                    description: "",
                },
            }));
        } else if (e.target.name === "amount") {
            setFormData((prev) => ({ ...prev, [e.target.name]: parseFloat(e.target.value) }));
        } else if (e.target.name === "date") {
            setFormData((prev) => ({ ...prev, [e.target.name]: new Date(e.target.value) }));
        } else {
            setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    // handle expense creation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !formData.type ||
            !formData.amount ||
            !formData.description ||
            !formData.category?._id ||
            !formData.date
        ) {
            alert("Please fill all fields");
            return;
        }
        try {
            const created = await addExpense(formData as Expense);
            setExpenses((prev) => [...prev, created]);
            setFormData({
                type: "expense",
                amount: 0,
                description: "",
                category: { _id: "", name: "", color: "", description: "" },
                date: new Date(),
            });
            alert("expense added successfully");
            navigate("/api/expense/getExpenses");
        } catch (error: any) {
            alert(error.message || "something went wrong");
        }
    };

    return (
        <div>
            <title>Add Expense</title>
            <div className="container mt-5 me-0">
                <form onSubmit={handleSubmit}>
                    <div className="w-50 mb-3">
                        <label htmlFor="type" className="form-label">
                            Type
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option selected value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div className="w-50 mb-3">
                        <label htmlFor="amount" className="form-label">
                            Amount
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={formData.amount || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-50 mb-3">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            id="category"
                            name="category"
                            value={formData.category?._id || ""}
                            onChange={handleChange}
                        >
                            <option selected>Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-50 mb-3">
                        <label htmlFor="date" className="form-label">
                            Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={
                                formData.date
                                    ? new Date(formData.date).toISOString().split("T")[0]
                                    : ""
                            }
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-50 mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ExpenseAdd;
