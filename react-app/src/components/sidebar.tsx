import React from "react";
import { useUser } from "../context/UserContext";
import { logout } from "../api/user";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

interface SideBarProps {
  isOpen: boolean;
  toggle: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggle }) => {
  const { setUser, user } = useUser();

  // handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      window.location.href = "/user/signin";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      className={`sidebar-wrapper d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${isOpen ? "open" : ""
        }`}
    >
      <i className="bi bi-x-lg mb-3" onClick={toggle}></i>
      <nav className="flex-grow-1" style={{ height: "800px" }}>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className="nav-link"
              aria-current="page"
              end
            >
              <i
                className="bi bi-speedometer2 me-2"
                style={{ width: "16", height: "16" }}
              ></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/getCategories" className="nav-link text-white">
              <i
                className="bi bi-diagram-3-fill me-2"
                style={{ width: "16", height: "16" }}
              ></i>
              Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/addExpense" className="nav-link text-white">
              <i
                className="bi bi-wallet me-2"
                style={{ width: "16", height: "16" }}
              ></i>
              Expense/Income
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className="nav-link text-white">
              <i
                className="bi bi-journal-text me-2"
                style={{ width: "16", height: "16" }}
              ></i>
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/getExpenses" className="nav-link text-white">
              <i
                className="bi bi-calendar3 me-2"
                style={{ width: "16", height: "16" }}
              ></i>
              Transactions
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />

      {user ? (
        <div className="dropdown">
          <a
            href="/profile"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user.profileImageURL}
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>{user.fullName}</strong>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser"
          >
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to="/user/logout"
                onClick={handleLogout}
              >
                Signout
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default SideBar;
