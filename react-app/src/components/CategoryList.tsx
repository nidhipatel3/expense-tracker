import React, { useEffect, useState } from "react";
import { Category } from "../types";
import '../styles/category.css';
import API, { deleteCategory } from '../api/category';
import { useNavigate } from 'react-router-dom';

const CategoryList: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // get category data
        const fetchcategories = async () => {
            try {
                const response = await API.get('/api/category/getcategories');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchcategories();
    }, []);

    // handle category deletion
    const handleDelete = async (id?: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (confirmDelete) {
            try {
                await deleteCategory(id);
                setCategories((prev) => prev.filter((cat) => cat._id !== id));
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Failed to delete category.');
            }
        }
    }

    return (
        <div>
            <title>Category</title>
            <div className="row justify-content-start">
                <div className="table-container col-9 mt-5">
                    <a className="btn btn-primary mt-2 mb-5" href="/api/category/addCategory" role="button"> + Add Category</a>
                    <table className="category-table">
                        <thead className="table-secondary">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Color</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr>
                                    <td key={cat._id}>{cat.name}</td>
                                    <td>{cat.color}</td>
                                    <td>{cat.description}</td>
                                    <td>
                                        <button onClick={() => navigate(`/api/category/${cat._id}`)} className="btn btn-success"><i className="bi bi-pencil-square"></i></button>&nbsp;&nbsp;&nbsp;
                                        <button onClick={() => handleDelete(cat._id!)} className="btn btn-danger"><i className="bi bi-trash3"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;