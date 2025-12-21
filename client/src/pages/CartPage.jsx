import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleProceedToCheckout = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <button onClick={() => navigate(-1)} className="mb-6 text-gray-600 hover:text-agro-green font-semibold flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back
                </button>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h2>
                <Link to="/" className="inline-block bg-agro-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-agro-dark transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => navigate(-1)} className="mb-6 text-gray-600 hover:text-agro-green font-semibold flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back
            </button>
            <h1 className="text-3xl font-bold mb-8 text-agro-dark">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3 space-y-4">
                    {cart.map(item => (
                        <div key={item._id} className="bg-white p-4 rounded-lg shadow flex items-center gap-4 border border-gray-200">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                                <p className="text-gray-600 font-medium">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => updateQuantity(item._id, -1)} className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-bold">-</button>
                                <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, 1)} className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-bold">+</button>
                            </div>
                            <div className="font-bold text-lg min-w-[80px] text-right text-gray-900">
                                ₹{item.price * item.quantity}
                            </div>
                            <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 p-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow sticky top-24 border border-gray-200">
                        <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-900">Order Summary</h3>

                        <div className="flex justify-between mb-2 text-gray-700 font-medium">
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-700 font-medium">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl mb-6 pt-2 border-t text-gray-900">
                            <span>Total</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <button
                            onClick={handleProceedToCheckout}
                            className="w-full bg-agro-green text-black py-3 rounded-lg font-bold hover:bg-agro-dark transition shadow-lg text-lg transform active:scale-95"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
