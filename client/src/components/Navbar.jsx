import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    return (
        <nav className="bg-agro-dark text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                    <span className="text-3xl">🌱</span>
                    <span>Agro Store</span>
                </Link>

                {/* Mobile Menu Button (Hamburger) */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 font-medium items-center">
                    <li><Link to="/category/Seeds" className="hover:text-agro-light transition">Seeds</Link></li>
                    <li><Link to="/category/Fertilizers" className="hover:text-agro-light transition">Fertilizers</Link></li>
                    <li><Link to="/category/Grains" className="hover:text-agro-light transition">Grains</Link></li>
                    <li><Link to="/category/Equipments" className="hover:text-agro-light transition">Equipments</Link></li>
                </ul>

                {/* Right Actions (Desktop) */}
                <ul className="hidden md:flex space-x-4 items-center">
                    <li><Link to="/about" className="hover:text-agro-light transition">About Us</Link></li>
                    <li><Link to="/contact" className="hover:text-agro-light transition">Contact Us</Link></li>
                    <li>
                        <Link to="/cart" className="relative flex items-center hover:text-agro-light transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </li>
                    {user ? (
                        <li className="flex items-center space-x-3">
                            <span className="font-semibold text-agro-light">Hi, {user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition font-semibold"
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link
                                to="/login"
                                className="bg-white text-agro-dark border border-white px-5 py-1.5 rounded-lg hover:bg-gray-100 transition font-bold"
                            >
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-agro-dark border-t border-agro-green">
                    <ul className="flex flex-col p-4 space-y-3 font-medium">
                        <li><Link to="/category/Seeds" onClick={() => setIsOpen(false)} className="block hover:text-agro-light">Seeds</Link></li>
                        <li><Link to="/category/Fertilizers" onClick={() => setIsOpen(false)} className="block hover:text-agro-light">Fertilizers</Link></li>
                        <li><Link to="/category/Grains" onClick={() => setIsOpen(false)} className="block hover:text-agro-light">Grains</Link></li>
                        <li><Link to="/category/Equipments" onClick={() => setIsOpen(false)} className="block hover:text-agro-light">Equipments</Link></li>
                        <hr className="border-agro-green" />
                        <li><Link to="/about" onClick={() => setIsOpen(false)} className="block hover:text-agro-light">About Us</Link></li>
                        <li><Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:text-agro-light">Contact Us</Link></li>
                        <li className="flex justify-between items-center">
                            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 hover:text-agro-light">
                                <span>Cart ({cartCount})</span>
                            </Link>
                        </li>
                        <hr className="border-agro-green" />
                        {user ? (
                            <>
                                <li className="text-agro-light font-semibold">Hi, {user.username}</li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left bg-red-500 text-white px-4 py-2 rounded font-bold"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block bg-white text-agro-dark p-2 rounded text-center font-bold"
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
