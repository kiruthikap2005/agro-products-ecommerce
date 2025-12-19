require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
    // Seeds
    {
        name: "Hybrid Tomato Seeds",
        category: "Seeds",
        price: 150,
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=500",
        description: "High yield hybrid tomato seeds."
    },
    {
        name: "Organic Wheat Seeds",
        category: "Seeds",
        price: 200,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=500",
        description: "Certified organic wheat seeds."
    },
    // Fertilizers
    {
        name: "Organic Compost",
        category: "Fertilizers",
        price: 450,
        image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=500",
        description: "Nutrient-rich organic compost."
    },
    {
        name: "Nitrogen Fertilizer",
        category: "Fertilizers",
        price: 300,
        image: "https://plus.unsplash.com/premium_photo-1661963024760-7a4c582570d6?auto=format&fit=crop&q=80&w=500",
        description: "High nitrogen content for leafy growth."
    },
    // Grains
    {
        name: "Basmati Rice",
        category: "Grains",
        price: 120,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500",
        description: "Premium long grain Basmati rice."
    },
    {
        name: "Yellow Corn",
        category: "Grains",
        price: 80,
        image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=500",
        description: "Fresh yellow corn grains."
    },
    // Equipments
    {
        name: "Garden Trowel",
        category: "Equipments",
        price: 250,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=500",
        description: "Durable stainless steel trowel."
    },
    {
        name: "Watering Can",
        category: "Equipments",
        price: 350,
        image: "https://images.unsplash.com/photo-1422557379185-474da15ebe67?auto=format&fit=crop&q=80&w=500",
        description: "Classic metal watering can."
    }
];

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('MongoDB Connected');
        await Product.deleteMany({});
        console.log('Old products removed');
        await Product.insertMany(products);
        console.log('Seed data imported');
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
