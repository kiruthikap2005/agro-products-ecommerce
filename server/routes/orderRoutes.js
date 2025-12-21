const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const Razorpay = require('razorpay');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create Razorpay order (MOCKED for simulation)
// @route   POST /api/orders/razorpay
// @access  Private
router.post('/razorpay', protect, async (req, res) => {
    const { amount } = req.body;
    try {
        const mockOrder = {
            id: `order_mock_${Date.now()}`,
            amount: Math.round(amount * 100),
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            status: 'created'
        };
        res.json(mockOrder);
    } catch (err) {
        console.error('Mock Razorpay Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
    const { orderItems, totalAmount, shippingAddress, paymentInfo } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    // Calculate delivery date: Current date + 5 days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const order = new Order({
        user: req.user._id,
        orderItems,
        totalAmount,
        shippingAddress,
        paymentInfo,
        deliveryDate
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Order Saving Error:', err);
        res.status(400).json({ message: err.message });
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('orderItems.product', 'name price');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
