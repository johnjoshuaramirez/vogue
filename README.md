## ✨ Features

- **User Registration & Login**  
  Users can create accounts, securely log in, and manage sessions (login/logout).

- **Product Listing & Details View**  
  Browse all available items using a list/detail layout to view full product information.

- **Search, Filter & Sort**  
  Quickly find products with keyword search, filter by category or attributes, and sort by price, name, or date.

- **Shopping Cart Functionality**  
  Add items to a shopping cart and view all selected items in a single place.

- **Cart Item Quantity Controls**  
  Easily increment or decrement item quantities within the cart.

- **Item Selection & Checkout Preparation**  
  Select specific products and prepare them for checkout.

## ⚙️ Application Specifications

- **Frontend: React with Tailwind CSS**  
  The user interface is built using React, providing a component-based, scalable architecture. Tailwind CSS ensures a clean, responsive design that adapts seamlessly across devices.

- **Backend: Node.js with Express.js**  
  A lightweight and performant backend API developed using Express.js, running on Node.js. It handles all business logic, routing, and communication with the database.

- **Database: MongoDB (NoSQL)**  
  MongoDB is used for persistent data storage, offering flexibility in managing user records, products, and transactions in a JSON-like format.

- **Authentication & Security**  
  User registration and login are secured using **bcrypt** for password hashing. Authenticated access is managed through protected routes, ensuring only authorized users can access restricted features.

- **State Management: React Context API & Custom Hooks**  
  Application state (e.g., user session, cart data) is handled using the Context API. Custom hooks encapsulate logic for reusability and cleaner code structure.

- **Routing: React Router**  
  Page navigation is handled using React Router, enabling seamless transitions between views without full page reloads. This allows users to navigate across public and protected pages.
  
- **Protected Routes**  
  Specific routes in the frontend are guarded based on user authentication status, preventing unauthorized access to sensitive pages or data.


