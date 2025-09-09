import React from 'react';

const SideBar: React.FC = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
  <ul className="nav nav-pills flex-column mb-auto">
    <li className="nav-item">
      <a href="#" className="nav-link active" aria-current="page">
        <i className="bi bi-speedometer2 me-2"></i>
        Dashboard
      </a>
    </li>
    <li>
      <a href="#" className="nav-link text-white">
        <i className="bi bi-graph-up-arrow me-2"></i>
        Income
      </a>
    </li>
    <li>
      <a href="#" className="nav-link text-white">
        <i className="bi bi-wallet me-2" ></i>
        Expense
      </a>
    </li>
    <li>
      <a href="#" className="nav-link text-white">
        <i className="bi bi-journal-text me-2"></i>
        Reports
      </a>
    </li>
    <li>
      <a href="#" className="nav-link text-white">
        <i className="bi bi-calendar3 me-2" ></i>
        Transactions
      </a>
    </li>
  </ul>
  <hr/>
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser"
        data-bs-toggle="dropdown" aria-expanded="false">
        <img src="<%= user.profileImageURL %>" alt="" width="32" height="32" className="rounded-circle me-2"/>
        <strong>
          {/* <%= locals.user.fullName %> */}
        </strong>
      </a>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser">
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li>
          <hr className="dropdown-divider"/>
        </li>
        <li><a className="dropdown-item" href="/user/logout">Signout</a></li>
      </ul>
    </div>
</div>
    )
}

export default SideBar;