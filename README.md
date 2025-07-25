﻿# Backend API

## Overview

This is a RESTful API for ecommerce management built using Express.js and MongoDB. It includes user signup, login, role-based authorization, and basic CRUD operations for product and user management.

## Features

- Products Management: Basic CRUD operations with role based access on products.
- User Authentication: Signup and login with JWT-based authentication.
- Role-Based Access Control (RBAC): Restrict access based on user roles.
- User Management: CRUD operations for users (Admin only.
- Error Handling: Centralized error handling middleware.
- Database Transactions: Ensures data integrity with MongoDB transactions.

## Tech Stack

- Node.js
- Express.js
- Zod
- MongoDB (Mongoose)
- JWT (JsonWebToken)
- Bcrypt.js (Password Hashing)

## Installation

#### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- MongoDB

#### Setup

1. Clone the repository

```bash
git clone https://github.com/seif-ashraf-007/ecommerce-backend

cd jwt-user-auth
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables: Create a `.env` file in project root directory and add the following variables:

```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1d
```

4. Start the server

```bash
npm run dev
```

## Contributing

Contributions are always welcome!

Feel free to fork the repository, create a branch, and submit a pull request.
