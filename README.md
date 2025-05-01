# Stellar Beauty Hub - Salon Appointment Booking Backend

A full-featured backend API for a salon appointment booking system, built with Node.js, Express, and SQL. This API supports user authentication, role-based access control, appointment scheduling, service management, payments, and notifications.

## 🚀 Features

- JWT-based user authentication
- Role-based access control (Admin, Staff, Customer)
- Manage services, appointments, users, and reviews
- Payment integration (Cashfree)
- Email/SMS notification support
- RESTful API structure

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQL (MySQL/PostgreSQL)
- **Authentication:** JWT
- **Payments:** Cashfree

## 📁 Project Structure

```text
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── app.js
```

## 🔐 Environment Variables

Create a `.env` file in the root with the following:

```env

PORT =

#database connection
DB_USER =
DB_PASSWORD =
DB_NAME =
DB_HOST =
DB_DIALECT =

#frontend connection
FRONTEND_URL =

#JWT Secret
JWT_SECRET =

#admin signup acess code
ADMIN_SIGNUP_CODE =

# cashfree_secret
CLIENT_ID=
CLIENT_SECRET=

```

## 📦 Installation

```bash
git clone https://github.com/yourusername/salon-backend.git
cd salon-backend
npm install
```

## ▶️ Running the App

```bash
# For development
npm run start:dev

# For production
npm start
```

## 📌 API Endpoints Overview

### 🔐 Auth

- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user

### 👤 Users

- `GET /api/users/profile` – Get logged-in user info
- `PUT /api/users/profile` – Update profile

### 💇 Services

- `GET /api/services` – List all services
- `POST /api/services` – (Admin only) Add a service
- `PUT /api/services` – (Admin only) Update a service
- `DELETE /api/services` – (Admin only) Delete a service

### 📅 Appointments

- `GET /api/appointments` – Get user's appointments
- `POST /api/appointments` – Book appointment
- `GET /api/appointments/admin` – (Admin only) Get all Users scheduled appointments
- `PUT /api/appointments/cancel/:id` – Cancel appointment
- `PUT /api/appointments/assign/:id` – (Admin only) Assign staff to appointment
- `PUT /api/appointments/complete/admin/:id` – (Admin only) Complete an appointment

### 💳 Payments

- `POST /api/payments/appoinment-payment` – Initiate payment (Cashfree)
- `GET /api/payments/verify/:paymentId` – Verify payment status

### 👥 Staffs (Admin only)

- `GET /api/staffs` – Get all Staffs
- `POST /api/staffs` – Add a Staff
- `DELETE /api/staffs/:id` – Remove a Staff

### 📝 Reviews

- `POST /api/reviews/:appointmentId` – Submit review
- `GET /api/reviews/:serviceId` – Get reviews of a service

## 🧑‍💻 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.

---

> Built with ❤️ by [Subhankar](https://github.com/subha-guchait)
