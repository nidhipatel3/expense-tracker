import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Category } from '../types';
import API, { updateCategory } from '../api/category';

const CategoryUpdate: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Partial<Category>>({
        name: '',
        color: '',
        description: ''
    });

    useEffect(() => {
        // get category data
        const fetchCategory = async () => {
            try {
                const response = await API.get(`/api/category/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error loading category", error);
            }
        };
        if (id) fetchCategory();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // handle category updation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.color || !formData.description) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            await updateCategory(id, formData);
            alert("category updated successfully");
            navigate('/api/category/getcategories');
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Failed to update category.');
        }
    }

    return (
        <div>
            <title>Update Category</title>
            <div className="container mt-5 me-0">
                <form onSubmit={handleSubmit}>
                    <div className="w-50 mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={formData.name || ''} onChange={handleChange} />
                    </div>
                    <div className="w-50 mb-3">
                        <label htmlFor="color" className="form-label">Color</label>
                        <input type="color" className="form-control form-control-color" id="color" name="color" title="Choose your color" value={formData.color || ''} onChange={handleChange} />
                    </div>
                    <div className="w-50 mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={formData.description || ''} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CategoryUpdate;