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
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/user/signup" element={<SignUp />} />
                            <Route path="/user/signin" element={<SignIn />} />
                            <Route path="/api/category/getcategories" element={<CategoryList />} />
                            <Route path="/api/category/addCategory" element={<Category />} />
                            <Route path="/api/category/:id" element={<CategoryUpdate />} />
                            <Route path="/api/expense/addExpense" element={<ExpenseAdd />} />
                            <Route path="/api/expense/getExpenses" element={<ExpenseList />} />
                            <Route path="/api/expense/:id" element={<ExpenseUpdate />} />
                        </Routes>
                    </div>
                </div>
            </UserProvider>
        </Router>
    );
};

export default App;