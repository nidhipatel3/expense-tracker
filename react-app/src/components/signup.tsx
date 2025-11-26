import React, { useState } from 'react';
import { signup } from '../api/user';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {

  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value, files } = e.target;

    if (name === 'profileImage' && files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }
    try {
      await signup({ ...formData, profileImageURL: file, });
      alert('User registered successfully');
      navigate("/user/signin");
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <title>Signup</title>
      <div className="container mt-5 me-0">
        <form onSubmit={handleSubmit}>
          <div className="w-50 mb-3">
            <label htmlFor="fullName" className="form-label">Name</label>
            <input type="text" className="form-control" id="fullName" name="fullName" onChange={handleChange} />
          </div>
          <div className="w-50 mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange} />
          </div>
          <div className="w-50 mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
          </div>
          <div className="w-50 mb-3">
            <label htmlFor="profileImage" className="form-label">Profile Image</label>
            <input type="file" className="form-control" id="profileImage" name="profileImage" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp;