🌱 Agro Products E-Commerce Website (MERN Stack)

A full-stack Agro Products E-Commerce web application built using the MERN stack, designed to provide a smooth online shopping experience for agricultural products such as seeds, fertilizers, grains, and equipment. The platform includes secure authentication, role-based access (User & Admin), order management, and payment options.

🚀 Features 👤 User Features

User registration & login with JWT authentication

Browse products by category (Seeds, Fertilizers, Grains, Equipment)

Add products to cart

Secure checkout flow:

Login required before payment

Delivery address collection

Payment method selection (QR / Cash on Delivery / Gateway-ready)

Order confirmation with expected delivery date

Responsive UI for mobile, tablet, and desktop

🛠️ Admin Features

Secure admin login (role-based access)

Admin badge visible in navbar

Product management:

Add new products

Edit existing products

Delete products

View all customer orders

Monitor order details (user, total amount, payment method, date)

🔐 Authentication & Security

Passwords hashed using bcrypt

JWT-based authentication

Protected routes for checkout and admin dashboard

Role validation to prevent unauthorized access

Admin-only APIs secured using middleware

💳 Payment Flow

Users must be logged in to proceed to checkout

Address collection before payment (Amazon-style flow)

Multiple payment options supported:

QR code payment

Cash on Delivery (COD)

Payment gateway ready (Razorpay can be integrated)

🧑‍💻 Tech Stack

Frontend

React.js

React Router

Axios

CSS / Responsive Design

Backend

Node.js

Express.js

JWT Authentication

Bcrypt

Database

MongoDB (MongoDB Atlas)

Tools

Git & GitHub

Postman

VS Code

📂 Project Structure agro_products/ │ 
├── client/ # React frontend │ 
├── server/ # Node + Express backend │
├── models/ │
├── routes/ │ 
├── controllers/ │
├── middleware/ │ 
└── .env │
└── README.md

🌟 Future Enhancements

Razorpay payment gateway integration

Order status tracking (Pending → Shipped → Delivered)

Email notifications for orders

Product reviews & ratings

Stock management

👩‍💻 Author

Kiruthika P Engineering Student | Full Stack Developer 📍 Tamil Nadu, India 📫 GitHub: https://github.com/kiruthikap2005

🙌 Acknowledgements

Built with passion using the MERN stack and guided by hands-on learning.
