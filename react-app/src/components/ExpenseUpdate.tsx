import React, { useState, useEffect } from "react";
import { Category, Expense } from "../types";
import { useParams, useNavigate } from "react-router-dom";
import API, { updateExpense } from "../api/expense";

const ExpenseUpdate: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<Partial<Expense>>({
        type: "expense",
        amount: 0,
        description: '',
        category: { _id: "", name: "", color: "", description: "" },
        date: new Date()
    })

    useEffect(() => {
        // fetch category and expense data
        const fetchData = async () => {
            try {
                const catResponse = await API.get('/api/category/getCategories');
                setCategories(catResponse.data);

                if (id) {
                    const expResponse = await API.get(`/api/expense/${id}`);
                    const expData = expResponse.data;

                    const matchedCategory = catResponse.data.find((cat: Category) => cat._id === expResponse.data.category);

                    setFormData({ ...expData, category: matchedCategory || expData.category });
                }
            } catch (error) {
                console.error("Error loading expense/income", error);
            }
        };
        if (id) fetchData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target.name === "category") {
            console.log("categories", categories);

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

    // handle expense updation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!id) return;
            await updateExpense(id, formData);
            console.log("category", formData.category);

            alert("expense/income updated successfully");
            navigate('/getExpenses');
        } catch (error) {
            console.error('Error updating expense/income:', error);
            alert('Failed to update expense/income.');
        }
    }

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
                            value={formData.type || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select Type</option>
                            <option value="expense">Expense</option>
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
                            <option value="">Select Category</option>
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
}

export default ExpenseUpdate;