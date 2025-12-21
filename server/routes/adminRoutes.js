const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
// @access  Private/Admin
router.get('/orders', protect, isAdmin, async (req, res) => {
    try {
        console.log('Fetching all orders for admin...');
        const orders = await Order.find({})
            .populate('user', 'username email')
            .populate('orderItems.product', 'name price')
            .sort({ createdAt: -1 });

        console.log(`Found ${orders.length} orders`);
        res.json(orders);
    } catch (err) {
        console.error('Admin Orders Fetch Error:', err);
        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
router.put('/orders/:id/status', protect, isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        console.error('Admin Order Update Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, isAdmin, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();
        const orders = await Order.find({});
        const orderCount = orders.length;
        const totalSales = orders.reduce((acc, item) => acc + item.totalAmount, 0);

        res.json({
            users: userCount,
            products: productCount,
            orders: orderCount,
            sales: totalSales
        });
    } catch (err) {
        console.error('Admin Stats Error:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
