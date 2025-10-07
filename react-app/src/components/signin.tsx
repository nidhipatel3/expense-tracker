import React, { useState } from 'react';
import { fetchUser, signin } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const SignIn: React.FC = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signin(formData);
      fetchUser();

      const user = response.data.user;
      const token = response.data.token;

      localStorage.setItem('token', token);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        setUser(null);
      }

      alert('Login successfully');
      navigate("/");

    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div>
      <title>Signin</title>
      <div className="container mt-5 me-0">
        <form action="/user/signin" method="post" onSubmit={handleSubmit}>
          <div className="w-50 mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange} />
          </div>
          <div className="w-50 mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn;