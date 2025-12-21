import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
    const { cartTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.username || '',
        phone: '',
        street: '',
        city: '',
        pincode: '',
        state: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
        if (!formData.street) newErrors.street = 'Street address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';
        if (!formData.state) newErrors.state = 'State is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            localStorage.setItem('shippingAddress', JSON.stringify(formData));
            navigate('/payment');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-agro-dark">Delivery Address</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-agro-green outline-none ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="Receiver's Name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-agro-green outline-none ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="10-digit mobile number"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Street Address</label>
                    <textarea
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-agro-green outline-none ${errors.street ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="House No., Building, Street, Area"
                        rows="3"
                    ></textarea>
                    {errors.street && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-agro-green outline-none ${errors.city ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="City"
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.city}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-agro-green outline-none ${errors.pincode ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="6-digit PIN"
                        />
                        {errors.pincode && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.pincode}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-agro-green outline-none ${errors.state ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="State"
                        />
                        {errors.state && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.state}</p>}
                    </div>
                </div>

                <div className="pt-6 border-t">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-600 font-medium">Order Total:</span>
                        <span className="text-2xl font-bold text-agro-dark">₹{cartTotal}</span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-agro-green text-black py-4 rounded-xl font-bold hover:bg-agro-dark transition shadow-xl text-lg transform active:scale-95"
                    >
                        Save Address & Proceed to Payment
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="w-full mt-4 text-gray-500 font-medium hover:text-agro-dark transition"
                    >
                        Back to Cart
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
