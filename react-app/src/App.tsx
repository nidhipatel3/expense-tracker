import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import { UserProvider } from "./context/UserContext";
import Category from "./components/Category";
import CategoryList from "./components/CategoryList";
import CategoryUpdate from "./components/CategoryUpdate";
import ExpenseAdd from "./components/Expense";
import ExpenseList from "./components/ExpenseList";
import ExpenseUpdate from "./components/ExpenseUpdate";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";

const App: React.FC = () => {
    return (
        <Router>
            <UserProvider>
                <Header />
                <div className="row justify-content-end">
                    <div className="col-2">
                        <SideBar />
                    </div>
                    <div className="col-10">
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/user/signup" element={<SignUp />} />
                            <Route path="/user/signin" element={<SignIn />} />
                            <Route path="/getCategories" element={<CategoryList />} />
                            <Route path="/addCategory" element={<Category />} />
                            <Route path="/category/:id" element={<CategoryUpdate />} />
                            <Route path="/addExpense" element={<ExpenseAdd />} />
                            <Route path="/getExpenses" element={<ExpenseList />} />
                            <Route path="/expense/:id" element={<ExpenseUpdate />} />
                            <Route path="/reports" element={<Reports />} />
                        </Routes>
                    </div>
                </div>
            </UserProvider>
        </Router>
    );
};

export default App;