require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
    // Seeds
    {
        name: "Hybrid Tomato Seeds",
        category: "Seeds",
        price: 150,
        image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "High yield hybrid tomato seeds."
    },
    {
        name: "Organic Wheat Seeds",
        category: "Seeds",
        price: 200,
        image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Certified organic wheat seeds."
    },
    {
        name: "Sunflower Seeds",
        category: "Seeds",
        price: 180,
        image: "https://images.pexels.com/photos/53469/sunflowers-sunflower-field-sunflower-field-53469.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Giant sunflower seeds for vibrant blooms."
    },
    {
        name: "Carrot Seeds",
        category: "Seeds",
        price: 90,
        image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Nantes type carrot seeds for sweet harvests."
    },
    {
        name: "Chili Seeds",
        category: "Seeds",
        price: 110,
        image: "https://images.pexels.com/photos/209482/pexels-photo-209482.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Hot bird's eye chili seeds."
    },
    {
        name: "Cucumber Seeds",
        category: "Seeds",
        price: 130,
        image: "https://images.pexels.com/photos/37528/cucumber-salad-food-healthy-37528.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Crispy salad cucumber seeds."
    },
    {
        name: "Spinach Seeds",
        category: "Seeds",
        price: 70,
        image: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Dark green leafy spinach seeds."
    },
    {
        name: "Pumpkin Seeds",
        category: "Seeds",
        price: 160,
        image: "https://images.pexels.com/photos/90967/pexels-photo-90967.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Large pumpkin seeds for home gardening."
    },
    {
        name: "Watermelon Seeds",
        category: "Seeds",
        price: 140,
        image: "https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Sweet crimson watermelon seeds."
    },
    {
        name: "Marigold Seeds",
        category: "Seeds",
        price: 85,
        image: "https://images.pexels.com/photos/56866/garden-flower-orange-flowers-56866.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "French marigold seeds for pest control."
    },
    {
        name: "Basil Seeds",
        category: "Seeds",
        price: 120,
        image: "https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Aromatic Italian basil seeds."
    },
    {
        name: "Radish Seeds",
        category: "Seeds",
        price: 60,
        image: "https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Quick-growing red radish seeds."
    },

    // Fertilizers
    {
        name: "Organic Compost",
        category: "Fertilizers",
        price: 450,
        image: "https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Nutrient-rich organic compost."
    },
    {
        name: "Nitrogen Fertilizer",
        category: "Fertilizers",
        price: 300,
        image: "https://images.pexels.com/photos/5560184/pexels-photo-5560184.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "High nitrogen content for leafy growth."
    },
    {
        name: "Potash Fertilizer",
        category: "Fertilizers",
        price: 550,
        image: "https://images.pexels.com/photos/6945008/pexels-photo-6945008.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Essential for fruit and flower development."
    },
    {
        name: "Bone Meal",
        category: "Fertilizers",
        price: 250,
        image: "https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Phosphorus-rich natural fertilizer."
    },
    {
        name: "Seaweed Extract",
        category: "Fertilizers",
        price: 600,
        image: "https://images.pexels.com/photos/5989931/pexels-photo-5989931.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Liquid seaweed for overall plant health."
    },
    {
        name: "Epsom Salt",
        category: "Fertilizers",
        price: 150,
        image: "https://images.pexels.com/photos/7262775/pexels-photo-7262775.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Magnesium sulfate for lush green foliage."
    },
    {
        name: "Vermicompost",
        category: "Fertilizers",
        price: 350,
        image: "https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "High-quality worm castings."
    },
    {
        name: "Neem Cake",
        category: "Fertilizers",
        price: 280,
        image: "https://images.pexels.com/photos/6945105/pexels-photo-6945105.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Natural pest repellent and fertilizer."
    },
    {
        name: "Urea Fertilizer",
        category: "Fertilizers",
        price: 400,
        image: "https://images.pexels.com/photos/7658385/pexels-photo-7658385.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Concentrated nitrogen source."
    },
    {
        name: "DAP Fertilizer",
        category: "Fertilizers",
        price: 700,
        image: "https://images.pexels.com/photos/4750271/pexels-photo-4750271.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Diammonium Phosphate for root strength."
    },
    {
        name: "Liquid Bio-fertilizer",
        category: "Fertilizers",
        price: 480,
        image: "https://images.pexels.com/photos/6944945/pexels-photo-6944945.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Microbial liquid fertilizer for soil health."
    },
    {
        name: "NPK 19:19:19",
        category: "Fertilizers",
        price: 320,
        image: "https://images.pexels.com/photos/5560072/pexels-photo-5560072.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Balanced NPK for general use."
    },

    // Grains
    {
        name: "Basmati Rice",
        category: "Grains",
        price: 120,
        image: "https://images.pexels.com/photos/7456656/pexels-photo-7456656.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Premium long grain Basmati rice."
    },
    {
        name: "Yellow Corn",
        category: "Grains",
        price: 80,
        image: "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Fresh yellow corn grains."
    },
    {
        name: "Brown Rice",
        category: "Grains",
        price: 150,
        image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Healthy whole grain brown rice."
    },
    {
        name: "Green Gram",
        category: "Grains",
        price: 180,
        image: "https://images.pexels.com/photos/4033318/pexels-photo-4033318.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "High protein green mung beans."
    },
    {
        name: "Red Lentils",
        category: "Grains",
        price: 140,
        image: "https://images.pexels.com/photos/2232058/pexels-photo-2232058.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Nutritious red split lentils."
    },
    {
        name: "Soybeans",
        category: "Grains",
        price: 220,
        image: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Quality soybeans for multiple uses."
    },
    {
        name: "Barley",
        category: "Grains",
        price: 110,
        image: "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Wholesome barley grains."
    },
    {
        name: "Oats",
        category: "Grains",
        price: 250,
        image: "https://images.pexels.com/photos/3021382/pexels-photo-3021382.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Rolled oats for breakfast and more."
    },
    {
        name: "Millet",
        category: "Grains",
        price: 90,
        image: "https://images.pexels.com/photos/3377419/pexels-photo-3377419.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Nutritious foxtail millet."
    },
    {
        name: "Chickpeas",
        category: "Grains",
        price: 130,
        image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Kabuli chickpeas for delicious dishes."
    },
    {
        name: "Kidney Beans",
        category: "Grains",
        price: 160,
        image: "https://images.pexels.com/photos/3850214/pexels-photo-3850214.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Classic red kidney beans."
    },
    {
        name: "Pearl Millet",
        category: "Grains",
        price: 95,
        image: "https://images.pexels.com/photos/5560094/pexels-photo-5560094.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Healthy Bajra or Pearl Millet."
    },

    // Equipments
    {
        name: "Garden Trowel",
        category: "Equipments",
        price: 250,
        image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Durable stainless steel trowel."
    },
    {
        name: "Watering Can",
        category: "Equipments",
        price: 350,
        image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Classic metal watering can."
    },
    {
        name: "Pruning Shears",
        category: "Equipments",
        price: 550,
        image: "https://images.pexels.com/photos/4750342/pexels-photo-4750342.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Sharp and durable pruning shears."
    },
    {
        name: "Digging Fork",
        category: "Equipments",
        price: 850,
        image: "https://images.pexels.com/photos/1301857/pexels-photo-1301857.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Strong fork for soil aeration."
    },
    {
        name: "Garden Rake",
        category: "Equipments",
        price: 450,
        image: "https://images.pexels.com/photos/4505168/pexels-photo-4505168.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Sturdy rake for leveling soil."
    },
    {
        name: "Hoe",
        category: "Equipments",
        price: 380,
        image: "https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Traditional garden hoe for weeding."
    },
    {
        name: "Spade",
        category: "Equipments",
        price: 750,
        image: "https://images.pexels.com/photos/6945107/pexels-photo-6945107.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Flat spade for clean edging."
    },
    {
        name: "Sprayer",
        category: "Equipments",
        price: 1200,
        image: "https://images.pexels.com/photos/7329670/pexels-photo-7329670.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Backpack sprayer for fertilizers."
    },
    {
        name: "Wheelbarrow",
        category: "Equipments",
        price: 3500,
        image: "https://images.pexels.com/photos/4505169/pexels-photo-4505169.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Heavy-duty garden wheelbarrow."
    },
    {
        name: "Garden Gloves",
        category: "Equipments",
        price: 200,
        image: "https://images.pexels.com/photos/6190327/pexels-photo-6190327.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Protective nitrile garden gloves."
    },
    {
        name: "Garden Kneeler",
        category: "Equipments",
        price: 950,
        image: "https://images.pexels.com/photos/5699523/pexels-photo-5699523.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Comfortable pad for kneeling."
    },
    {
        name: "Hand Trowel",
        category: "Equipments",
        price: 180,
        image: "https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=500",
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
