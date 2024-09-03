# Package Delivery API

This is a package delivery API built using Node.js and Express. It allows users to register, add items for delivery, track the status of their packages, and enables admin users to manage and update the delivery status of items.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **User Registration**: Users can register and log in to manage their packages.
- **Add Items**: Users can add items to be sent to a specific location, including details such as description, destination, and weight.
- **Package Tracking**: Users can track their packages using a unique package number.
- **Admin Management**: Admins can view all users and their items, update the delivery status of any item.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hydrogencoded/package-delivery-api.git
   cd package-delivery-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add the following variables:

   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. **Start the server**:

   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`.

## Usage

1. **Register a User**: Use the `auth/register` endpoint to create a new user account.
2. **Login**: Use the `/auth/login` endpoint to log in and create a session.
3. **Add an Item**: Use the `i/tems/add` endpoint to add an item for delivery.
4. **Track an Item**: Use the `/items/track/:packageNumber` endpoint to get the status of an item.
5. **Update Item Status**: Admin users can use the `/api/items/update-status` endpoint to update the delivery status of an item.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout the current user

### Items

- `POST /items/add` - Add a new item for delivery (User only)
- `GET /items/track/:packageNumber` - Track an item by package number (User only)
- `PATCH /items/update-status` - Update the delivery status of an item (Admin only)
- `GET /items/all` - Get all items (Admin only)

### Admin

- `GET /admin/users` - Get all users (Admin only)

## Project Structure
