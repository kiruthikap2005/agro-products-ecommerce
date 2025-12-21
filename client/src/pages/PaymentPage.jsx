import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PaymentPage = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('Razorpay'); // Razorpay or COD
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const savedAddress = localStorage.getItem('shippingAddress');
        if (!savedAddress) {
            navigate('/checkout');
        } else {
            setAddress(JSON.parse(savedAddress));
        }
    }, [navigate]);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const commonOrderData = {
            orderItems: cart.map(item => ({
                product: item._id,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: cartTotal,
            shippingAddress: address
        };

        if (paymentMethod === 'COD') {
            try {
                const orderData = {
                    ...commonOrderData,
                    paymentInfo: { method: 'COD', status: 'Pending' }
                };
                await axios.post('http://localhost:5000/api/orders', orderData, config);
                finalizeOrder();
            } catch (err) {
                alert('Order failed: ' + err.message);
                setLoading(false);
            }
        } else {
            // Razorpay SIMULATION
            try {
                const { data: rzpOrder } = await axios.post('http://localhost:5000/api/orders/razorpay', { amount: cartTotal }, config);

                // Simulate payment processing delay
                setLoading(true);
                // We'll use a specific message in the button
                const btnBackup = document.querySelector('button[type="submit"]')?.innerHTML;
                if (document.querySelector('button[type="submit"]')) {
                    document.querySelector('button[type="submit"]').innerHTML = "Simulating Secure Payment...";
                }

                setTimeout(async () => {
                    try {
                        const orderData = {
                            ...commonOrderData,
                            paymentInfo: {
                                method: 'Razorpay (Simulated)',
                                status: 'Paid',
                                razorpayOrderId: rzpOrder.id,
                                razorpayPaymentId: 'pay_simulated_' + Date.now()
                            }
                        };
                        await axios.post('http://localhost:5000/api/orders', orderData, config);
                        finalizeOrder();
                    } catch (err) {
                        alert('Simulation failed to save order: ' + err.message);
                        setLoading(false);
                    }
                }, 2000);

            } catch (err) {
                alert('Razorpay Simulation failed: ' + err.message);
                setLoading(false);
            }
        }
    };

    const finalizeOrder = () => {
        const date = new Date();
        date.setDate(date.getDate() + 5);
        setDeliveryDate(date.toDateString());
        setOrderSuccess(true);
        clearCart();
        setLoading(false);
        localStorage.removeItem('shippingAddress');
    };

    if (orderSuccess) {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
                <div className="bg-white p-12 rounded-2xl shadow-2xl border border-green-100">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">Order Placed Successfully! 🎉</h2>
                    <p className="text-xl text-gray-600 mb-8">Thank you for shopping with Agro Store.</p>

                    <div className="bg-gray-50 p-6 rounded-xl text-left border border-gray-200 mb-8">
                        <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">Estimated Delivery</h3>
                        <p className="text-2xl font-bold text-agro-green">{deliveryDate}</p>
                        <p className="text-sm text-gray-500 mt-2">Item(s) will be delivered to: <br /> <span className="font-medium text-gray-700">{address?.street}, {address?.city}</span></p>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-agro-green text-black py-4 rounded-xl font-bold hover:bg-agro-dark transition shadow-lg text-lg"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-agro-dark">Payment Options</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Payment Form */}
                <div className="lg:w-2/3">
                    <form onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
                        <div className="space-y-4">
                            <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'Razorpay' ? 'border-agro-green bg-green-50' : 'border-gray-100'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Razorpay"
                                    checked={paymentMethod === 'Razorpay'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-5 h-5 text-agro-green"
                                />
                                <div className="ml-4">
                                    <p className="font-bold text-gray-900">Online Payment (Razorpay)</p>
                                    <p className="text-sm text-gray-500">Card, UPI, Netbanking, Wallet</p>
                                </div>
                                <div className="ml-auto flex gap-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Razorpay_logo.svg" alt="Razorpay" className="h-6" />
                                </div>
                            </label>

                            <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-agro-green bg-green-50' : 'border-gray-100'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-5 h-5 text-agro-green"
                                />
                                <div className="ml-4">
                                    <p className="font-bold text-gray-900">Cash on Delivery (COD)</p>
                                    <p className="text-sm text-gray-500">Pay when you receive the product</p>
                                </div>
                            </label>
                        </div>

                        <div className="pt-6 border-t mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-agro-green text-black py-4 rounded-xl font-bold hover:bg-agro-dark transition shadow-xl text-lg transform active:scale-95 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-black rounded-full" viewBox="0 0 24 24"></svg>
                                        Processing Order...
                                    </>
                                ) : (
                                    paymentMethod === 'COD' ? 'Place Order (COD)' : 'Proceed to Razorpay'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                        <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-900">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            {cart.map(item => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                    <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-agro-green font-bold">Free</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-sm text-gray-800 mb-2">Delivery to:</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                {address?.name}<br />
                                {address?.street}, {address?.city}<br />
                                {address?.state} - {address?.pincode}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
