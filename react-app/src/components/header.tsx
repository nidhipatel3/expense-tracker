import React from 'react';
import logo from '../wallet.png';
// import { useEffect, useState } from 'react';

// interface User{
//     id: string;
//     fullName: string;
//     email: string;
//     profileImage: string;
// }

const Header: React.FC = () => {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container-fluid ms-0">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center me-2 mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src={logo} alt="" height="50px" width="50px"/>
                </a>
                <h3 className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">Expense Tracker</h3>

                {/* if (!locals.user) { */}
                    <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                    <button type="button" id="btnLogin" className="btn btn-outline-light me-2">
                        <a className="nav-link" href="/user/signin">Signin</a>
                    </button>

                    <button type="button" id="btnSignup" className="btn btn-outline-warning">
                        <a className="nav-link" href="/user/signup">Create Account</a>
                    </button>
                    </div>
                    {/* }  */}
                </div>
            </div>
        </header>

// if (locals.error) {
//   <div class="container mt-4">
//     <div class="alert alert-danger" role="alert">
//       <%= locals.error %>
//     </div>
//   </div>
//   }
    )
}

export default Header;