import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
            <div className="h-48 overflow-hidden bg-gray-100 relative group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-agro-dark rounded-full uppercase tracking-wide">
                        {product.category}
                    </span>
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-agro-green text-white py-2 rounded-lg font-semibold hover:bg-agro-dark transition-colors duration-200 shadow-md active:scale-95 transform"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
