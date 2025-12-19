import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200", // Agriculture field
    "https://images.unsplash.com/photo-1625246333195-55197c3241d7?auto=format&fit=crop&q=80&w=1200", // Farmer with tablet
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200"  // Wheat field
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gray-900">
            <AnimatePresence mode='wait'>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="absolute w-full h-full object-cover opacity-70"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.7, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8 }}
                />
            </AnimatePresence>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
                >
                    Grow With Nature
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl md:text-2xl mb-8 drop-shadow-md"
                >
                    Best Quality Seeds & Organic Fertilizers
                </motion.p>
            </div>

            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-agro-green" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
