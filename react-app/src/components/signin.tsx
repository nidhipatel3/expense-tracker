import React, { useState } from 'react';
import { signin } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const SignIn: React.FC = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "danger">("success");
  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await signin(formData);
      setUser(user);
      setAlertType("success");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      setAlertType("danger");
      setAlertMessage(error.response?.data?.error || "Login failed.");
    }
  }

  return (
    <div>
      <title>Signin</title>
      <div className="container mt-5 me-0">
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert" style={{ width: "50%" }}>
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="w-50 mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange} />
          </div>
          <div className="w-50 mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Signin</button>
          <a className="link-primary ms-3" href="/user/signup">Create Account</a>
        </form>
      </div>
    </div>
  )
}

export default SignIn;