import React, { useState, useEffect } from "react";
import { Category, Expense } from "../types";
import API from "../api/expense";
import Card from "./Card";
import "../styles/dashboard.css";
import ExpenseList from "./ExpenseList";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

interface DashboardProps {
    expenses?: Expense[];
    categories?: Category[];
    showExpenseList?: boolean;
    showTitle?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ expenses: propExpenses, categories: propCategories, showExpenseList = true, showTitle = true }) => {

    const [expenses, setExpenses] = useState<Expense[]>(propExpenses || []);
    const [categories, setCategories] = useState<Category[]>(propCategories || []);

    useEffect(() => {
        // fetch all expenses        
        const fetchExpenses = async () => {
            try {
                if (!propExpenses) {
                    const response = await API.get('/api/expense/getExpenses');
                    setExpenses(response.data);
                } else {
                    setExpenses(propExpenses);
                }
                if (!propCategories) {
                    const catRes = await API.get('/api/category/getCategories');
                    setCategories(catRes.data);
                } else {
                    setCategories(propCategories);
                }

            } catch (error: any) {
                console.error("Error fetching expenses:", error.message);
            }
        };
        fetchExpenses();
    }, [propExpenses, propCategories]);

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

    // bar chart for income vs expense
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthlyData = months.map((month, i) => {

        const income = expenses
            .filter((e) => new Date(e.date).getMonth() === i && e.type === "income")
            .reduce((prev, cur) => prev + cur.amount, 0);
        const expense = expenses
            .filter((e) => new Date(e.date).getMonth() === i && e.type === "expense")
            .reduce((prev, cur) => prev + cur.amount, 0);
        return { month, income, expense };
    });

    // pie chart for category expense
    const categoriesData = Array.from(new Set(expenses
        .filter(e => e.type === "expense")
        .map((e) => typeof e.category === "object" ? e.category.name : e.category)));

    const categoryData = categoriesData.map((cat) => {
        const total = expenses
            .filter((e) => (typeof e.category === "object" ? e.category.name : e.category) === cat && e.type === "expense")
            .reduce((prev, cur) => prev + cur.amount, 0);
        return { name: cat, value: total };
    });

    const COLORS = categoriesData.map((catName) => {
        const matchedCategory = categories.find((cat) => cat.name === catName);
        return matchedCategory?.color;
    });

    return (
        <div>
            <title>Dashboard</title>
            <section className="dashboard mt-5">
                <div className="row">
                    <div className="col-6">
                        {showTitle && <h2>Dashboard</h2>}
                        <div className="cards mt-3">
                            <Card title="Balance" value={totalBalance.toFixed(2)} color="blue" />
                            <Card title="Income" value={totalIncome.toFixed(2)} color="green" />
                            <Card title="Expense" value={totalExpense.toFixed(2)} color="red" />
                        </div>
                        <div className="charts">
                            <div className="chart-container">
                                <h3 className="mb-3">Monthly Income vs Expenses</h3>
                                <ResponsiveContainer width="150%" height={500}>
                                    <BarChart data={monthlyData}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="income" fill="#10b981" name="Income" />
                                        <Bar dataKey="expense" fill="#ef4444" name="Expense" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="transcations">
                            {showExpenseList && <ExpenseList showButton={false} limit={5} title="Recent Transactions" />}
                        </div>
                        <div className="charts">
                            <div className="chart-container">
                                <h3 className="ms-3">Expenses by Category</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={categoryData}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={100}
                                            label>
                                            {categoryData.map((_, index) => (
                                                <Cell key={index} fill={COLORS[index]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;