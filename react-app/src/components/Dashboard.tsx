import React, { useState, useEffect } from "react";
import { Expense } from "../types";
import API from "../api/expense";
import Card from "./Card";
import "../styles/dashboard.css";
import ExpenseList from "./ExpenseList";

const Dashboard: React.FC = () => {

    const [expenses, setExpenses] = useState<Expense[]>([]);

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

    // total income
    const totalIncome = expenses
        .filter((e) => e.type === "income")
        .reduce((prev, cur) => prev + cur.amount, 0);

    // total expense
    const totalExpense = expenses
        .filter((e) => e.type === "expense")
        .reduce((prev, cur) => prev + cur.amount, 0);

    // balance
    const totalBalance = totalIncome - totalExpense;

    return (
        <div>
            <title>Dashboard</title>
            <section className="dashboard mt-5">
                <div className="row">
                    <div className="col-6">
                        <h2>Dashboard</h2>
                        <div className="cards mt-3">
                            <Card title="Balance" value={totalBalance.toFixed(2)} color="blue" />
                            <Card title="Income" value={totalIncome.toFixed(2)} color="green" />
                            <Card title="Expense" value={totalExpense.toFixed(2)} color="red" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="transcations">
                            <ExpenseList showButton={false} limit={5} title="Recent Transactions" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;