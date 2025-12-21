import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, sales: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const { data } = await axios.get('http://localhost:5000/api/admin/stats', config);
                setStats(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch stats:', err);
                setLoading(false);
            }
        };
        fetchStats();
    }, [user.token]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return <div className="p-8 text-center min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agro-green"></div>
    </div>;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 shadow-2xl">
                <div className="p-6 text-2xl font-bold border-b border-gray-800 flex items-center gap-2">
                    <div className="w-8 h-8 bg-agro-green rounded-lg flex items-center justify-center text-black text-sm">A</div>
                    AgroAdmin
                </div>
                <nav className="flex-grow p-4 space-y-2 mt-4">
                    <button onClick={() => navigate('/admin')} className="w-full text-left p-3 rounded-lg bg-agro-green text-black font-bold flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        Overview
                    </button>
                    <button onClick={() => navigate('/admin/products')} className="w-full text-left p-3 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center gap-3 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        Products
                    </button>
                    <button onClick={() => navigate('/admin/orders')} className="w-full text-left p-3 rounded-lg hover:bg-gray-800 text-gray-400 flex items-center gap-3 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        Orders
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-800 bg-black/20">
                    <button onClick={handleLogout} className="w-full p-3 text-left text-red-400 hover:bg-red-400/10 rounded-lg flex items-center gap-3 transition font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow pl-64 flex flex-col">
                <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
                        <p className="text-sm text-gray-500">Managing Agro Store as {user?.username}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm px-3 py-1 rounded-full bg-green-50 text-green-700 font-bold border border-green-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            System Active
                        </span>
                    </div>
                </header>

                <main className="p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-[1.02] transition">
                            <div className="text-gray-400 text-xs font-bold uppercase mb-2">Total Revenue</div>
                            <div className="text-3xl font-black text-gray-900">₹{stats.sales.toLocaleString()}</div>
                            <div className="text-green-500 text-xs mt-2 font-bold flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path></svg>
                                12% Growth
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-[1.02] transition">
                            <div className="text-gray-400 text-xs font-bold uppercase mb-2">Total Orders</div>
                            <div className="text-3xl font-black text-gray-900">{stats.orders}</div>
                            <button onClick={() => navigate('/admin/orders')} className="text-agro-green text-xs mt-2 font-bold hover:underline">View All Orders</button>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-[1.02] transition">
                            <div className="text-gray-400 text-xs font-bold uppercase mb-2">Customers</div>
                            <div className="text-3xl font-black text-gray-900">{stats.users}</div>
                            <div className="text-blue-500 text-xs mt-2 font-bold">Registered Users</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-[1.02] transition">
                            <div className="text-gray-400 text-xs font-bold uppercase mb-2">Products</div>
                            <div className="text-3xl font-black text-gray-900">{stats.products}</div>
                            <button onClick={() => navigate('/admin/products')} className="text-agro-green text-xs mt-2 font-bold hover:underline">Manage Catalog</button>
                        </div>
                    </div>

                    {/* Quick Management */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900">
                                <svg className="w-5 h-5 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => navigate('/admin/products')} className="group p-6 bg-agro-green/5 border border-agro-green/10 rounded-2xl flex flex-col items-center gap-4 hover:bg-agro-green/10 transition text-center">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-agro-green group-hover:scale-110 transition">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <span className="font-bold text-gray-900">Add Product</span>
                                </button>
                                <button onClick={() => navigate('/admin/orders')} className="group p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col items-center gap-4 hover:bg-blue-100 transition text-center">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 transition">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg>
                                    </div>
                                    <span className="font-bold text-gray-900">Manage Orders</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                System Health
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="text-gray-600 text-sm">Server Latency</span>
                                    <span className="text-sm font-black text-agro-green">24ms</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="text-gray-600 text-sm">Database Load</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="w-1/3 h-full bg-agro-green"></div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-500">Normal</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="text-gray-600 text-sm">Current Level</span>
                                    <span className="text-xs px-2 py-1 bg-black text-white rounded font-bold uppercase tracking-wider">Super Administrator</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
