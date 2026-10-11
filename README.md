# 🎟️ BookMyEvent

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-purple?style=for-the-badge)](#license)

**BookMyEvent** is a modern, full-stack event discovery, booking, and ticket management platform built with the MERN stack. Designed with a sleek dark-themed UI, the platform incorporates real-time event exploration, secure OTP-based authentication and bookings via email, role-based access control (RBAC), and dedicated dashboards for both **Users** and **Administrators**.

---

## 📑 Table of Contents

- [Features Overview](#-features-overview)
- [System Architecture](#-system-architecture)
- [User Panel Deep Dive](#-user-panel-deep-dive)
- [Admin Panel Deep Dive](#-admin-panel-deep-dive)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Installation](#-getting-started--installation)
- [Environment Variables](#-environment-variables)
- [Demo Credentials & Seeding](#-demo-credentials--seeding)
- [API Reference](#-api-reference)
- [Contributing & License](#-license)

---

## ✨ Features Overview

- 🔐 **Dual-Layer Email OTP Authentication**: 6-digit OTP verification for user registration and booking validation powered by Nodemailer.
- 🎭 **Role-Based Access Control (RBAC)**: Distinct permissions and experiences for regular users (`user`) and administrators (`admin`).
- 🔍 **Real-Time Event Search & Filtering**: Debounced instant search by event title and category filters.
- 🎟️ **Live Inventory Tracking**: Dynamic seat count tracking prevents overbooking when events sell out.
- 📧 **Automated Email Notifications**: Instant confirmation emails dispatched upon admin booking approval.
- ⚡ **Modern Dark UI/UX**: Glassmorphic dark theme styled with Tailwind CSS, React Icons, and responsive design.

---

## 🏛️ System Architecture

```mermaid
graph TD
    subgraph Client ["Client (React 19 + Vite + Tailwind CSS)"]
        UI[Public Event Catalog & Search]
        AuthModal[Register / Login / OTP Verification]
        UserDash[User Dashboard (/dashboard)]
        AdminDash[Admin Dashboard (/admin)]
    end

    subgraph Server ["Server (Node.js + Express 5)"]
        AuthMiddleware[JWT & Role Verification Middleware]
        AuthCtrl[Auth Controller]
        EventCtrl[Event Controller]
        BookingCtrl[Booking Controller]
        EmailUtil[Nodemailer Email Service]
    end

    subgraph Database ["Database & Cloud Services"]
        MongoDB[(MongoDB Atlas)]
        GmailSMTP[Gmail SMTP Service]
    end

    Client -->|REST API Calls with JWT| Server
    Server -->|Mongoose Queries| MongoDB
    Server -->|Dispatches OTPs & Confirmations| GmailSMTP
    GmailSMTP -->|Emails| Client
```

---

## 👤 User Panel Deep Dive

The **User Panel** provides attendees with a streamlined experience from discovery to attendance:

### 1. Event Discovery & Real-Time Search
- **Home Showcase**: Browse featured concerts, tech retreats, business summits, and art expos.
- **Dynamic Search**: Instant debounced search bar updates event listings as you type.
- **Event Cards**: View essential metadata including dates, ticket prices (free or paid), venue locations, and real-time seat availability badges.

### 2. Registration & Account Verification
- Users register with their name, email, and password.
- An automated **6-digit verification OTP** is dispatched to the user's email inbox.
- Accounts remain unverified until the OTP is provided, preventing spam and fake accounts.

### 3. Secure Event Booking with Two-Factor OTP
- On the **Event Detail** page (`/events/:id`), users can review comprehensive event details.
- To confirm intent, users click **Book Now**, triggering a one-time booking OTP sent directly to their registered email.
- Submitting the OTP creates a booking in `pending` state and reserves the user's spot pending admin verification.

### 4. User Dashboard (`/dashboard`)
- **Personalized Header**: Displays user initials, name, and account status badge.
- **Booking Request Cards**: Lists all user bookings organized with clear visual indicators:
  - **Booking Status**: `pending` (amber), `confirmed` (green), or `cancelled` (red).
  - **Payment Status**: `paid` or `not_paid`.
  - **Financial Summary**: Shows ticket amounts (`Free` or ₹ pricing) and request timestamps.
- **Direct Navigation & Actions**:
  - **View Event**: Quick link to view original event details.
  - **Self-Service Cancellation**: Users can cancel pending or confirmed bookings directly; cancelled confirmed tickets automatically return seats to the available pool.

---

## 🛡️ Admin Panel Deep Dive

The **Admin Panel** (`/admin`) serves as the administrative command center for event organizers and platform managers. It is strictly protected by both frontend route guards and backend role-verification middleware (`protect, admin`).

### 1. Key Business Metrics & Analytics
- 💰 **Total Revenue**: Real-time calculated revenue from all confirmed and paid bookings.
- 👥 **Paid Clients**: Distinct count of unique paying attendees.
- ⏳ **Pending Requests**: Count of reservations awaiting review and confirmation.

### 2. Event Management (Full CRUD)
- **Interactive Event Creation**: A dedicated modal/form to publish events with:
  - Title and detailed description
  - Category (Tech, Music, Business, Art, etc.)
  - Event date and venue location
  - Total seat capacity
  - Ticket pricing (₹0 for free events)
  - Cover image URL
- **Event Overview Table**: Real-time list of all events with dates, live remaining seat ratios (`availableSeats / totalSeats`), and a one-click **Delete** action.

### 3. Booking Workflow & Approval System
- **Comprehensive Booking Stream**: Shows all bookings across the platform with attendee name, email address, booked date, and event seat status.
- **Manual Verification & Payment Control**:
  - **Approve as Paid**: Confirms the booking, marks payment as `paid`, decrements the event's available seats, and triggers an automated confirmation email to the attendee.
  - **Approve Undecided**: Confirms the booking while retaining payment as `not_paid` (for offline payments or complimentary entries).
  - **Reject Booking**: Rejects the reservation request and updates the status to `cancelled`.

---

## 💻 Tech Stack

### Frontend (`client/`)
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend (`server/`)
- **Runtime**: [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Mailing**: [Nodemailer](https://nodemailer.com/) (Gmail SMTP Integration)
- **Process Management**: [Nodemon](https://nodemon.io/) & [Concurrently](https://www.npmjs.com/package/concurrently)

---

## 📂 Project Directory Structure

```text
BookMyEvent/
├── package.json             # Root scripts (runs client and server concurrently)
├── README.md                # Project documentation
│
├── client/                  # Frontend Vite React application
│   ├── index.html           # HTML entry point
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── src/
│       ├── App.jsx          # Main client router & layout
│       ├── main.jsx         # Application entry point
│       ├── components/
│       │   └── Navbar.jsx   # Global responsive navigation bar
│       ├── context/
│       │   └── AuthContext.jsx # Authentication state & session provider
│       ├── pages/
│       │   ├── Home.jsx           # Landing page with hero & event search
│       │   ├── EventDetail.jsx    # Event details & OTP booking trigger
│       │   ├── Login.jsx          # User & Admin login
│       │   ├── Register.jsx       # Registration with OTP verification
│       │   ├── UserDashboard.jsx  # User booking dashboard
│       │   ├── AdminDashboard.jsx # Admin metrics, events & bookings manager
│       │   ├── PaymentSuccess.jsx # Payment success screen
│       │   └── PaymentFailed.jsx  # Payment failure screen
│       └── utils/
│           └── axios.js     # Configured Axios instance with auth interceptors
│
└── server/                  # Backend Node.js Express REST API
    ├── index.js             # Express server setup and DB connection
    ├── seed.js              # Database seed script for mock users and events
    ├── .env                 # Environment variables configuration
    ├── models/
    │   ├── User.js          # User schema (roles: user, admin; isVerified)
    │   ├── Event.js         # Event schema (seats, dates, prices)
    │   ├── Booking.js       # Booking schema (status, paymentStatus, amount)
    │   └── OTP.js           # OTP schema with automatic TTL expiry (5 mins)
    ├── routes/
    │   ├── auth.js          # Authentication routes (/api/auth)
    │   ├── event.js         # Event routes (/api/events)
    │   └── booking.js       # Booking routes (/api/bookings)
    ├── controller/
    │   ├── authController.js    # Register, login, and OTP handlers
    │   ├── eventController.js   # Event CRUD operations
    │   └── bookingController.js # Booking creation, approval, and cancellation
    ├── middleware/
    │   └── auth.js          # JWT protection and admin verification middleware
    └── utils/
        └── email.js         # Nodemailer SMTP transporter and templates
```

---

## 🚀 Getting Started & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) (for sending OTPs and confirmation emails)

### 1. Clone the Repository
```bash
git clone https://github.com/abhay01soni/BookMyEvent.git
cd BookMyEvent
```

### 2. Install Dependencies
Install dependencies for both client and server simultaneously using the root script:
```bash
npm run install:all
```
*(Or install manually: `cd server && npm install`, then `cd ../client && npm install`)*

### 3. Configure Server Environment
Create or verify your `server/.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_digit_gmail_app_password
JWT_SECRET=your_jwt_secret_key
```

### 4. Seed the Database (Optional but Recommended)
Populate the database with sample administrators, test users, and events:
```bash
cd server
node seed.js
cd ..
```

### 5. Run the Application
Run both backend and frontend concurrently with a single command from the project root:
```bash
npm run dev
```

- **Frontend Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🔑 Demo Credentials & Seeding

After running `node seed.js`, you can log in immediately with the following accounts:

| Role | Email | Password | Access / Dashboard |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@bookmyevent.com` | `password123` | Full access (`/admin`) |
| **User** | `user@bookmyevent.com` | `password123` | Attendee access (`/dashboard`) |
| **User** | `alice@bookmyevent.com` | `password123` | Attendee access (`/dashboard`) |

---

## 📡 API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user and dispatch email OTP | No |
| `POST` | `/api/auth/verify-otp` | Verify 6-digit OTP to activate account and receive JWT | No |
| `POST` | `/api/auth/login` | Authenticate existing user | No |

### 🎪 Events (`/api/events`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/events` | List all events (supports `?search=` and `?category=`) | No |
| `GET` | `/api/events/:id` | Fetch specific event details | No |
| `POST` | `/api/events` | Create a new event | **Admin Only** |
| `PUT` | `/api/events/:id` | Update event information | **Admin Only** |
| `DELETE` | `/api/events/:id` | Remove an event | **Admin Only** |

### 🎫 Bookings (`/api/bookings`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/bookings/send-otp` | Send booking verification OTP to user email | **User** |
| `POST` | `/api/bookings` | Submit booking request with verified OTP | **User** |
| `GET` | `/api/bookings/my` | Get user's bookings (or all bookings if admin) | **User / Admin** |
| `PUT` | `/api/bookings/:id/confirm` | Approve booking (`paid` or `not_paid`) & send email | **Admin Only** |
| `DELETE` | `/api/bookings/:id` | Cancel a booking request and release reserved seat | **User / Admin** |

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
