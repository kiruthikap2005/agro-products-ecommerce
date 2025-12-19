import React from 'react';
import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <Carousel />

            <div className="container mx-auto py-12 px-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Featured Seeds */}
                    <Link to="/category/Seeds" className="block relative group overflow-hidden rounded-xl shadow-lg h-64 bg-gray-200">
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">Seeds</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=500" alt="Seeds" className="absolute inset-0 w-full h-full object-cover -z-10" />
                    </Link>

                    {/* Featured Grains */}
                    <Link to="/category/Grains" className="block relative group overflow-hidden rounded-xl shadow-lg h-64 bg-gray-200">
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">Grains</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500" alt="Grains" className="absolute inset-0 w-full h-full object-cover -z-10" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
