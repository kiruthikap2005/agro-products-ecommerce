const User = require('../models/User');

const initAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.warn('Admin credentials not found in environment variables. Admin user not created.');
            return;
        }

        const adminExists = await User.findOne({ role: 'admin' });

        if (!adminExists) {
            const admin = new User({
                username: 'Admin',
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('Admin user created successfully.');
        } else {
            // Optional: Update admin credentials if they changed in .env
            adminExists.email = adminEmail;
            adminExists.password = adminPassword;
            await adminExists.save();
            console.log('Admin user updated with current .env credentials.');
        }
    } catch (error) {
        console.error('Error initializing admin user:', error);
    }
};

module.exports = initAdmin;
