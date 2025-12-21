import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        description: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                await axios.delete(`http://localhost:5000/api/products/${id}`, config);
                fetchProducts();
            } catch (err) {
                alert('Delete failed: ' + err.message);
            }
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditMode(true);
            setCurrentProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category,
                image: product.image,
                description: product.description
            });
        } else {
            setEditMode(false);
            setFormData({ name: '', price: '', category: '', image: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            if (editMode) {
                await axios.put(`http://localhost:5000/api/products/${currentProduct._id}`, formData, config);
            } else {
                await axios.post('http://localhost:5000/api/products', formData, config);
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (err) {
            alert('Operation failed: ' + err.message);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading products...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <button onClick={() => navigate('/admin')} className="mb-2 text-agro-green font-bold flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-agro-dark">Manage Products</h1>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-agro-green text-black px-6 py-3 rounded-lg font-bold hover:bg-agro-dark transition flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add New Product
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col">
                        <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                        <div className="p-4 flex-grow">
                            <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                            <p className="text-agro-green font-bold">₹{product.price}</p>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded uppercase font-bold mt-2 inline-block">{product.category}</span>
                            <p className="text-gray-500 text-xs mt-3 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="p-4 bg-gray-50 border-t flex gap-2">
                            <button
                                onClick={() => openModal(product)}
                                className="flex-grow bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="flex-grow bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h2 className="text-2xl font-bold mb-6">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-agro-green"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-agro-green"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                    <select
                                        required
                                        className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-agro-green"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        <option value="seeds">Seeds</option>
                                        <option value="fertilizers">Fertilizers</option>
                                        <option value="tools">Tools</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-agro-green"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-agro-green"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-grow bg-agro-green text-black py-3 rounded-lg font-bold hover:bg-agro-dark transition"
                                >
                                    {editMode ? 'Update Product' : 'Create Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
