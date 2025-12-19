import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <button onClick={() => navigate(-1)} className="mb-6 text-gray-600 hover:text-agro-green font-semibold flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back
            </button>
            <h1 className="text-4xl font-bold text-agro-dark mb-8 text-center">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="bg-agro-green text-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                    <div className="space-y-4">
                        <p className="flex items-center space-x-3">
                            <span className="text-2xl">📍</span>
                            <span>123 Green Farm Road, Agri City, India 560001</span>
                        </p>
                        <p className="flex items-center space-x-3">
                            <span className="text-2xl">📞</span>
                            <span>+91 98765 43210</span>
                        </p>
                        <p className="flex items-center space-x-3">
                            <span className="text-2xl">✉️</span>
                            <span>support@agrostore.com</span>
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {submitted ? (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-4">✅</div>
                            <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
                            <p className="text-gray-600">We'll get back to you shortly.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-6 text-agro-green font-bold hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-green bg-white text-gray-900"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-green bg-white text-gray-900"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-green bg-white text-gray-900"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-agro-dark text-white py-3 rounded-lg font-bold hover:bg-agro-light transition transform active:scale-95"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
