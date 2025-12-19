import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-4 py-12">
            <button onClick={() => navigate(-1)} className="mb-6 text-gray-600 hover:text-agro-green font-semibold flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back
            </button>
            <h1 className="text-4xl font-bold text-agro-dark mb-6 text-center">About Agro Store</h1>
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Welcome to <strong>Agro Store</strong>, your number one source for all things agriculture. We're dedicated to providing you the very best of seeds, fertilizers, and farming equipment, with an emphasis on quality, sustainability, and customer service.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-agro-green mb-3">Our Mission</h3>
                        <p className="text-gray-600">
                            To empower farmers and gardeners with high-quality, eco-friendly agricultural products that ensure bountiful harvests and a healthier planet.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-agro-green mb-3">Our Vision</h3>
                        <p className="text-gray-600">
                            To become the most trusted partner in the agricultural community, bridging the gap between traditional farming and modern sustainable practices.
                        </p>
                    </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Founded in 2024, Agro Store has come a long way from its beginnings. When we first started out, our passion for "eco-friendly farming solutions" drove us to start our own business.
                </p>
                <p className="text-lg text-gray-700 mt-4 leading-relaxed">
                    We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                </p>
                <div className="mt-8 text-center pt-8 border-t">
                    <p className="text-gray-500 font-semibold">Sincerely,</p>
                    <p className="text-xl text-agro-dark font-bold">The Agro Store Team</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
