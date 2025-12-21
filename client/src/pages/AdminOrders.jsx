import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const { data } = await axios.get('http://localhost:5000/api/admin/orders', config);
            setOrders(data);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error('Fetch Orders Error:', err);
            const msg = err.response?.data?.message || err.message;
            setError(msg);
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            await axios.put(`http://localhost:5000/api/admin/orders/${orderId}/status`, { status: newStatus }, config);
            fetchOrders();
        } catch (err) {
            alert('Failed to update status: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return <div className="p-8 text-center min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agro-green"></div>
    </div>;

    if (error) return (
        <div className="container mx-auto px-4 py-8 text-center">
            <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 max-w-lg mx-auto">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <h3 className="text-xl font-bold mb-2">Error Loading Orders</h3>
                <p className="mb-6">{error}</p>
                <button onClick={fetchOrders} className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold">Retry</button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => navigate('/admin')} className="mb-6 text-agro-green font-bold flex items-center hover:text-agro-dark transition">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold mb-8 text-agro-dark">Manage Orders</h1>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-bold text-gray-700">Order ID</th>
                                <th className="p-4 font-bold text-gray-700">Customer</th>
                                <th className="p-4 font-bold text-gray-700">Total</th>
                                <th className="p-4 font-bold text-gray-700">Payment</th>
                                <th className="p-4 font-bold text-gray-700">Status</th>
                                <th className="p-4 font-bold text-gray-700 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 text-sm text-gray-600 font-mono">#{order._id.slice(-8)}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900">{order.shippingAddress?.name || 'Unknown'}</div>
                                        <div className="text-xs text-gray-500">{order.user?.email || 'N/A'}</div>
                                    </td>
                                    <td className="p-4 font-bold text-gray-900">₹{order.totalAmount}</td>
                                    <td className="p-4">
                                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${order.paymentInfo?.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {order.paymentInfo?.status || 'Pending'}
                                        </span>
                                        <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">{order.paymentInfo?.method}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${order.status === 'Delivered' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {order.status}
                                        </span>
                                        <div className="text-[10px] text-gray-400 mt-1 tracking-tighter">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <select
                                            className="text-xs border rounded-lg p-2 outline-none bg-white shadow-sm focus:ring-2 focus:ring-agro-green"
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                        >
                                            <option value="Order Placed">Order Placed</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {orders.length === 0 && (
                    <div className="p-20 text-center text-gray-500 bg-gray-50 flex flex-col items-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <p className="text-xl font-bold">No orders found.</p>
                        <p className="text-gray-400 mt-2">When customers place orders, they will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
