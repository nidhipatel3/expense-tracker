import React, { useState } from "react";
import { addCategory } from '../api/category';
import { useNavigate } from "react-router-dom";

const Category: React.FC = () => {

    const [formData, setFormData] = useState({ name: '', color: '', description: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // handle category creation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addCategory(formData);
            alert("category added successfully");
            navigate("/getCategories");
        } catch (error: any) {
            alert(error.message || "something went wrong");
        }
    }

    return (
        <div>
            <title>Add Category</title>
            <div className="container mt-5 me-0">
                <form onSubmit={handleSubmit}>
                    <div className="w-50 mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={handleChange} />
                    </div>
                    <div className="w-50 mb-3">
                        <label htmlFor="color" className="form-label">Color</label>
                        <input type="color" className="form-control form-control-color" id="color" name="color" title="Choose your color" onChange={handleChange} />
                    </div>
                    <div className="w-50 mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Category;