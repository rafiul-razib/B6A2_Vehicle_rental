# 🚗 Vehicle Rental System

## 🌐 Live URL

[Visit the Live Application](https://vehiclerental-ahkr44wdo-rafiul-razibs-projects.vercel.app/)

---

## 📌 Project Overview

The **Vehicle Rental System** is a backend-driven web application that allows users to rent vehicles for a specific time period. Customers can browse available vehicles and create bookings, while administrators can manage vehicles and bookings.

The system ensures that **the same vehicle cannot be booked for overlapping rental dates**, maintaining booking integrity.

---

## ✨ Features

### 👤 User Features

- View available vehicles
- Book vehicles with rental start and end dates
- View personal booking history
- Authentication using JWT

### 🛠️ Admin Features

- Add, update, and delete vehicles
- View all bookings in the system
- Update booking status (active, returned, cancelled)
- Manage vehicle availability

### 🔒 Booking Validation

- Prevents **double booking of the same vehicle during overlapping dates**
- Calculates **total rental price automatically** based on rental duration

---

## 🧰 Technology Stack

### Backend

- **Node.js**
- **Express.js**
- **TypeScript**

### Database

- **PostgreSQL**

### Authentication

- **JWT (JSON Web Token)**

### Development Tools

- **Postman** – API testing
- **Git & GitHub** – Version control

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rafiul-razib/B6A2_Vehicle_rental.git
cd B6A2_Vehicle_rental
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root folder:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 📡 API Usage Example

### Create Booking

```
POST /api/v1/bookings
```

Example Request Body:

```json
{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2026-03-10",
  "rent_end_date": "2026-03-12"
}
```

---

## 📂 Project Structure

```
vehicle-rental-system
│
├── .vercel
├── dist
├── node_modules
│
├── src
│   ├── config
│   │   └── db.ts
│   │
│   ├── middlewares
│   │
│   ├── modules
│   │   ├── auth
│   │   ├── bookings
│   │   ├── user
│   │   └── vehicles
│   │
│   ├── types
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── vercel.json
```

### Folder Description

- **config** → Database configuration and environment setup
- **middlewares** → Custom middleware such as authentication and error handling
- **modules** → Core business modules of the application
  - **auth** → Authentication logic (JWT login/register)
  - **bookings** → Booking creation, update, and validation
  - **user** → User management
  - **vehicles** → Vehicle CRUD operations

- **types** → TypeScript type definitions
- **app.ts** → Express app configuration
- **server.ts** → Application entry point

---

## 🚀 Future Improvements

- Payment integration
- Vehicle image uploads
- Advanced search & filtering
- Admin dashboard analytics

---

## 👨‍💻 Author

Developed by **Rafiul Razib**

Passionate about building scalable backend systems and exploring modern web technologies.
