import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success
    const [deliveryDate, setDeliveryDate] = useState(null);

    const handlePayment = () => {
        setPaymentStatus('processing');
        // Simulate payment processing
        setTimeout(() => {
            const date = new Date();
            date.setDate(date.getDate() + 5);
            setDeliveryDate(date.toDateString());
            setPaymentStatus('success');
            clearCart();
        }, 2000); // 2 seconds delay simulation
    };

    if (cart.length === 0 && paymentStatus !== 'success') {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                <Link to="/" className="inline-block bg-agro-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-agro-dark transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-agro-dark">Shopping Cart</h1>

            {paymentStatus === 'success' ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded relative text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Payment Successful! 🎉</h2>
                    <p className="text-xl">Thank you for your order.</p>
                    <p className="mt-4 font-semibold text-lg">Expected Delivery: {deliveryDate}</p>
                    <Link to="/" className="inline-block mt-8 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
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
                                onClick={() => setPaymentModalOpen(true)}
                                className="w-full bg-agro-green text-white py-3 rounded-lg font-bold hover:bg-agro-dark transition shadow-lg text-lg"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {isPaymentModalOpen && paymentStatus !== 'success' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all scale-100">
                        <h3 className="text-2xl font-bold mb-4">Scan to Pay</h3>
                        <div className="bg-gray-100 p-4 rounded-lg mb-6 inline-block">
                            {/* QR Code Placeholder */}
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=demo@upi&pn=AgroStore&am=100"
                                alt="Payment QR Code"
                                className="w-48 h-48 mx-auto mix-blend-multiply"
                            />
                        </div>
                        <p className="text-gray-600 mb-6">Total Amount: <span className="font-bold text-black">₹{cartTotal}</span></p>

                        {paymentStatus === 'processing' ? (
                            <div className="flex justify-center items-center py-2">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agro-green"></div>
                                <span className="ml-2 text-agro-dark font-semibold">Processing...</span>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <button
                                    onClick={handlePayment}
                                    className="w-full bg-agro-green text-white py-2 rounded-lg font-semibold hover:bg-agro-dark transition"
                                >
                                    Payment Done
                                </button>
                                <button
                                    onClick={() => setPaymentModalOpen(false)}
                                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
