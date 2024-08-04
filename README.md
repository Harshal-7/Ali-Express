# AliExpress Clone

This project is an AliExpress clone built using Next.js and Ali-Express Datahub API for data fetching. The goal is to create a fully functional e-commerce platform.

## Table of Contents

- Features
- Live Link
- Technologies Used
- Installation
- Usage
- API Endpoints
- Authentication
- Contributing

## Features

- User authentication and authorization
- Product listing and search
- Product details page
- Add to cart functionality
- Checkout process
- User profile and order history
- Responsive design

## Live Link

You can view a live demo of the project here: [Live Link](https://pages.github.com/)

## Technologies Used

- Next.js - React framework for server-side rendering and static site generation
- Auth.js - Authentication library
- Tailwind CSS - Utility-first CSS framework for styling
- MongoDB - Database for storing user and product data
- API - Custom APIs for fetching product data, categories, etc.

## Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:Harshal-7/Ali-Express.git
   cd Ali-Express
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:  
   Create a **_.env.local_** file in the root directory and add the following variables:

   ```env
   ALIEXPRESS_API_URL=your_api_url
   AUTH_SECRET=your_auth_secret
   DATABASE_URL=your_mongodb_uri
   ```

## Usage

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and go to http://localhost:3000.

## API Endpoints

- **GET** _/api/item_detail_
  - Fetch product details by ID
- **GET** _/api/item_search_
  - Fetch multiple products by name
- **GET** _/api/category_list_1_
  - Fetch product categories

## Authentication

This project uses [Auth.js](https://authjs.dev/) for authentication. Users can register and log in to access protected routes like cart, wishlist. Authentication tokens are stored in cookies for secure access.
