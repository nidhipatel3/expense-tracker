import React, { useState, useEffect } from "react";
import { Expense } from "../types";
import API, { deleteExpense } from "../api/expense";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

interface ExpenseListProps {
    showButton?: boolean;
    limit?: number;
    title?: string;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ showButton = true, limit = 0, title = '' }) => {

    const [expenses, setExpenses] = useState<Expense[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        // fetch all expenses
        const fetchExpenses = async () => {
            try {
                const response = await API.get('/api/expense/getExpenses');
                setExpenses(response.data);
            } catch (error: any) {
                console.error("Error fetching expenses:", error.message);
            }
        };
        fetchExpenses();
    }, []);

    // handle expense deletion
    const handleDelete = async (id?: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
        if (confirmDelete) {
            try {
                await deleteExpense(id);
                setExpenses((prev) => prev.filter((cat) => cat._id !== id))
            } catch (error) {
                console.error('Error deleting expense:', error);
                alert('Failed to delete expense.');
            }
        }
    }

    return (
        <div>
            <title>Expense</title>
            <div className="row justify-content-start">
                {title && <h3 className="ms-5">{title}</h3>}
                <div className="table-container col-9 mt-5">
                    {showButton && <a className="btn btn-primary mt-2 mb-5" href="/api/expense/addExpense" role="button"> + Add Expense</a>}
                    <table className="expense-table">
                        <thead className="table-secondary">
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Type</th>
                                {showButton && <th scope="col">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {limit ? expenses.slice(0, limit).map(exp => (
                                <tr>
                                    <td>{exp.date.toString().slice(0, 10)}</td>
                                    <td>{exp.category.name}</td>
                                    <td>{exp.description}</td>
                                    <td className={exp.type === "expense" ? "red" : "green"} key={exp._id}>${exp.amount.toFixed(2)}</td>
                                    <td>{exp.type}</td>
                                    {showButton && <td>
                                        <button onClick={() => navigate(`/api/expense/${exp._id}`)} className="btn btn-success me-2"><i className="bi bi-pencil-square"></i></button>
                                        <button onClick={() => handleDelete(exp._id!)} className="btn btn-danger"><i className="bi bi-trash3"></i></button>
                                    </td>}
                                </tr>
                            )) :
                                expenses.map(exp => (
                                    <tr>
                                        <td>{exp.date.toString().slice(0, 10)}</td>
                                        <td>{exp.category.name}</td>
                                        <td>{exp.description}</td>
                                        <td className={exp.type === "expense" ? "red" : "green"} key={exp._id}>${exp.amount.toFixed(2)}</td>
                                        <td>{exp.type}</td>
                                        {showButton && <td>
                                            <button onClick={() => navigate(`/api/expense/${exp._id}`)} className="btn btn-success me-2"><i className="bi bi-pencil-square"></i></button>
                                            <button onClick={() => handleDelete(exp._id!)} className="btn btn-danger"><i className="bi bi-trash3"></i></button>
                                        </td>}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExpenseList;