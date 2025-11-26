import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";

const Layout: React.FC = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    const hideSidebarRoutes = ["/user/signup", "/user/signin"];
    const showSidebar = !hideSidebarRoutes.includes(location.pathname);
    return (
        <>
            <Header />
            <div className="row justify-content-end">
                {showSidebar && (
                    <div className="col-2">
                        <button className="btn btn-dark" onClick={() => setIsOpen(!isOpen)}>
                            <i className="bi bi-list"></i>
                        </button>
                        <SideBar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
                    </div>
                )}
                <div className={showSidebar ? "col-10" : "col-12"}>
                    <Routes>
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/user/signup" element={<SignUp />} />
                        <Route path="/user/signin" element={<SignIn />} />
                        <Route path="/getCategories" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
                        <Route path="/addCategory" element={<ProtectedRoute><Category /></ProtectedRoute>} />
                        <Route path="/category/:id" element={<ProtectedRoute><CategoryUpdate /></ProtectedRoute>} />
                        <Route path="/addExpense" element={<ProtectedRoute><ExpenseAdd /></ProtectedRoute>} />
                        <Route path="/getExpenses" element={<ProtectedRoute><ExpenseList /></ProtectedRoute>} />
                        <Route path="/expense/:id" element={<ProtectedRoute><ExpenseUpdate /></ProtectedRoute>} />
                        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <UserProvider>
                <Layout />
            </UserProvider>
        </Router>
    );
};

export default App;