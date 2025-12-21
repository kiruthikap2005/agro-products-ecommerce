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
    {
        name: "Sunflower Seeds",
        category: "Seeds",
        price: 180,
        image: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&q=80&w=500",
        description: "Giant sunflower seeds for vibrant blooms."
    },
    {
        name: "Carrot Seeds",
        category: "Seeds",
        price: 90,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=500",
        description: "Nantes type carrot seeds for sweet harvests."
    },
    {
        name: "Chili Seeds",
        category: "Seeds",
        price: 110,
        image: "https://images.unsplash.com/photo-1588252303782-cb80119f7054?auto=format&fit=crop&q=80&w=500",
        description: "Hot bird's eye chili seeds."
    },
    {
        name: "Cucumber Seeds",
        category: "Seeds",
        price: 130,
        image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=500",
        description: "Crispy salad cucumber seeds."
    },
    {
        name: "Spinach Seeds",
        category: "Seeds",
        price: 70,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=500",
        description: "Dark green leafy spinach seeds."
    },
    {
        name: "Pumpkin Seeds",
        category: "Seeds",
        price: 160,
        image: "https://images.unsplash.com/photo-1506815444479-bfdb1e96c566?auto=format&fit=crop&q=80&w=500",
        description: "Large pumpkin seeds for home gardening."
    },
    {
        name: "Watermelon Seeds",
        category: "Seeds",
        price: 140,
        image: "https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&q=80&w=500",
        description: "Sweet crimson watermelon seeds."
    },
    {
        name: "Marigold Seeds",
        category: "Seeds",
        price: 85,
        image: "https://images.unsplash.com/photo-1589254065671-b0114f529630?auto=format&fit=crop&q=80&w=500",
        description: "French marigold seeds for pest control."
    },
    {
        name: "Basil Seeds",
        category: "Seeds",
        price: 120,
        image: "https://images.unsplash.com/photo-1618376168193-47b27ce94475?auto=format&fit=crop&q=80&w=500",
        description: "Aromatic Italian basil seeds."
    },
    {
        name: "Radish Seeds",
        category: "Seeds",
        price: 60,
        image: "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=500",
        description: "Quick-growing red radish seeds."
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
    {
        name: "Potash Fertilizer",
        category: "Fertilizers",
        price: 550,
        image: "https://images.unsplash.com/photo-1585314062340-f1a5acc7bb91?auto=format&fit=crop&q=80&w=500",
        description: "Essential for fruit and flower development."
    },
    {
        name: "Bone Meal",
        category: "Fertilizers",
        price: 250,
        image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=500",
        description: "Phosphorus-rich natural fertilizer."
    },
    {
        name: "Seaweed Extract",
        category: "Fertilizers",
        price: 600,
        image: "https://images.unsplash.com/photo-1557090495-ac9312e77b81?auto=format&fit=crop&q=80&w=500",
        description: "Liquid seaweed for overall plant health."
    },
    {
        name: "Epsom Salt",
        category: "Fertilizers",
        price: 150,
        image: "https://images.unsplash.com/photo-1532187863486-abf9d3a35357?auto=format&fit=crop&q=80&w=500",
        description: "Magnesium sulfate for lush green foliage."
    },
    {
        name: "Vermicompost",
        category: "Fertilizers",
        price: 350,
        image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=500",
        description: "High-quality worm castings."
    },
    {
        name: "Neem Cake",
        category: "Fertilizers",
        price: 280,
        image: "https://images.unsplash.com/photo-1599819177626-b50f9dd21c9b?auto=format&fit=crop&q=80&w=500",
        description: "Natural pest repellent and fertilizer."
    },
    {
        name: "Urea Fertilizer",
        category: "Fertilizers",
        price: 400,
        image: "https://images.unsplash.com/photo-1530124566582-aa37dd159a72?auto=format&fit=crop&q=80&w=500",
        description: "Concentrated nitrogen source."
    },
    {
        name: "DAP Fertilizer",
        category: "Fertilizers",
        price: 700,
        image: "https://images.unsplash.com/photo-1536640712247-212fd91286eb?auto=format&fit=crop&q=80&w=500",
        description: "Diammonium Phosphate for root strength."
    },
    {
        name: "Liquid Bio-fertilizer",
        category: "Fertilizers",
        price: 480,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500",
        description: "Microbial liquid fertilizer for soil health."
    },
    {
        name: "NPK 19:19:19",
        category: "Fertilizers",
        price: 320,
        image: "https://images.unsplash.com/photo-1582213708051-933e143b4dbf?auto=format&fit=crop&q=80&w=500",
        description: "Balanced NPK for general use."
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
    {
        name: "Brown Rice",
        category: "Grains",
        price: 150,
        image: "https://images.unsplash.com/photo-1591814448473-7027b88a2ed1?auto=format&fit=crop&q=80&w=500",
        description: "Healthy whole grain brown rice."
    },
    {
        name: "Green Gram",
        category: "Grains",
        price: 180,
        image: "https://images.unsplash.com/photo-1515942400420-5b908719602e?auto=format&fit=crop&q=80&w=500",
        description: "High protein green mung beans."
    },
    {
        name: "Red Lentils",
        category: "Grains",
        price: 140,
        image: "https://images.unsplash.com/photo-1547050605-2f37a54460f4?auto=format&fit=crop&q=80&w=500",
        description: "Nutritious red split lentils."
    },
    {
        name: "Soybeans",
        category: "Grains",
        price: 220,
        image: "https://images.unsplash.com/photo-1582213708051-933e143b4dbf?auto=format&fit=crop&q=80&w=500",
        description: "Quality soybeans for multiple uses."
    },
    {
        name: "Barley",
        category: "Grains",
        price: 110,
        image: "https://images.unsplash.com/photo-1536640712247-212fd91286eb?auto=format&fit=crop&q=80&w=500",
        description: "Wholesome barley grains."
    },
    {
        name: "Oats",
        category: "Grains",
        price: 250,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500",
        description: "Rolled oats for breakfast and more."
    },
    {
        name: "Millet",
        category: "Grains",
        price: 90,
        image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=500",
        description: "Nutritious foxtail millet."
    },
    {
        name: "Chickpeas",
        category: "Grains",
        price: 130,
        image: "https://images.unsplash.com/photo-1515942400420-5b908719602e?auto=format&fit=crop&q=80&w=500",
        description: "Kabuli chickpeas for delicious dishes."
    },
    {
        name: "Kidney Beans",
        category: "Grains",
        price: 160,
        image: "https://images.unsplash.com/photo-1547050605-2f37a54460f4?auto=format&fit=crop&q=80&w=500",
        description: "Classic red kidney beans."
    },
    {
        name: "Pearl Millet",
        category: "Grains",
        price: 95,
        image: "https://images.unsplash.com/photo-1591814448473-7027b88a2ed1?auto=format&fit=crop&q=80&w=500",
        description: "Healthy Bajra or Pearl Millet."
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
    },
    {
        name: "Pruning Shears",
        category: "Equipments",
        price: 550,
        image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=500",
        description: "Sharp and durable pruning shears."
    },
    {
        name: "Digging Fork",
        category: "Equipments",
        price: 850,
        image: "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=500",
        description: "Strong fork for soil aeration."
    },
    {
        name: "Garden Rake",
        category: "Equipments",
        price: 450,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=500",
        description: "Sturdy rake for leveling soil."
    },
    {
        name: "Hoe",
        category: "Equipments",
        price: 380,
        image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=500",
        description: "Traditional garden hoe for weeding."
    },
    {
        name: "Spade",
        category: "Equipments",
        price: 750,
        image: "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=500",
        description: "Flat spade for clean edging."
    },
    {
        name: "Sprayer",
        category: "Equipments",
        price: 1200,
        image: "https://images.unsplash.com/photo-1585314062340-f1a5acc7bb91?auto=format&fit=crop&q=80&w=500",
        description: "Backpack sprayer for fertilizers."
    },
    {
        name: "Wheelbarrow",
        category: "Equipments",
        price: 3500,
        image: "https://images.unsplash.com/photo-1422557379185-474da15ebe67?auto=format&fit=crop&q=80&w=500",
        description: "Heavy-duty garden wheelbarrow."
    },
    {
        name: "Garden Gloves",
        category: "Equipments",
        price: 200,
        image: "https://images.unsplash.com/photo-1589254065671-b0114f529630?auto=format&fit=crop&q=80&w=500",
        description: "Protective nitrile garden gloves."
    },
    {
        name: "Garden Kneeler",
        category: "Equipments",
        price: 950,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=500",
        description: "Comfortable pad for kneeling."
    },
    {
        name: "Hand Trowel",
        category: "Equipments",
        price: 180,
        image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=500",
        description: "Small hand trowel for transplanting."
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
