# AliExpress Clone

This project is an AliExpress clone built using Next.js and Ali-Express Datahub API for data fetching. The goal is to create a fully functional e-commerce platform.

## Table of Contents

- [Features](#features)
- [Live Link](#live-link)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributors](#contributors)
- [Contributing](#contributing)

## Features

- User authentication and authorization
- Product listing and search
- Product details page
- Add to cart functionality
- Checkout process
- Responsive design

## Live Link

You can view a live demo of the project here: [Live Link](https://ali-express-clone-kohl.vercel.app/)

## Technologies Used

- Next.js - React framework for server-side rendering and static site generation
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

   [](#place-1)

## Usage

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and go to http://localhost:3000.

## API Documentation

Full API documentation can be found [Here ](https://documenter.getpostman.com/view/32824294/2sA3rwNuRn).

## Contributors

- Harshal Shinde
  - [Github](https://github.com/Harshal-7)
  - [LinkedIn](https://www.linkedin.com/in/harshal-shinde-77a862210/)
- Shaikh Mohammed Zaid
  - [Github](https://github.com/Shaikhmohamm)
  - [LinkedIn](https://www.linkedin.com/in/zaid-shaikh-37b1b6171/)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code adheres to the project's coding standards and includes relevant tests.
