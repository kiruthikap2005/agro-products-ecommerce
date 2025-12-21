const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        price: { type: Number, default: 0 }
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
        state: { type: String, required: true }
    },
    paymentInfo: {
        method: { type: String, required: true }, // 'Razorpay' or 'COD'
        status: { type: String, default: 'Pending' }, // 'Pending', 'Paid', 'Failed'
        razorpayOrderId: { type: String },
        razorpayPaymentId: { type: String }
    },
    status: { type: String, default: 'Order Placed' },
    deliveryDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
