<div align="center">
  <img src="https://via.placeholder.com/150x150.png?text=Malath+Logo" alt="Malath Real Estate Logo" width="120" height="120" />

  # 🏙️ Malath Real Estate (مَـلاذ العقارية)

  **A Premium, Full-Stack Real Estate Management & Discovery Platform.**

  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey.svg?style=for-the-badge&logo=express)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black.svg?style=for-the-badge&logo=vercel)](https://vercel.com)
  [![License](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](#-license)
</div>

---

## 📖 Project Overview

**Malath Real Estate (مَـلاذ العقارية)** is a sophisticated, production-ready web application designed to bridge the gap between property administrators and potential buyers/renters. Built with a robust Node.js and Express backend, connected to a highly scalable MongoDB database, this platform offers a seamless experience for browsing, filtering, and managing premium real estate listings.

This repository serves as the core monolithic application, featuring both a rich, responsive customer-facing storefront (rendered server-side with EJS) and a secure, session-authenticated administrative dashboard for inventory management.

---

## ✨ Core Features

### 🧑‍💻 For Users (Customer Portal)
- **Advanced Property Search & Filtering**: Filter properties by location, maximum price, and property type.
- **Smart Sorting & Pagination**: Sort results by price (High/Low) or newest listings, with optimized server-side pagination.
- **Detailed Property Views**: Rich property profiles showcasing high-resolution galleries, amenities (rooms, bathrooms, area), and descriptions.
- **Fully Responsive UI**: Mobile-first design ensuring a pixel-perfect experience across all devices.
- **Bilingual Support Foundations**: Pre-configured for Arabic/English audiences.

### 🛡️ For Administrators (Admin Dashboard)
- **Secure Authentication**: Environment-variable driven secure login with MongoStore session management.
- **Full CRUD Operations**: Effortlessly Add, Edit, Delete, and View property listings.
- **Dynamic Media Management**: Integrated Cloudinary support for single images and multi-image galleries. Administrators can upload files directly or provide image URLs.
- **Inventory Metrics**: At-a-glance dashboard statistics showing total and active properties.

---

## 🏗️ Technical Architecture

The application follows the **MVC (Model-View-Controller)** architectural pattern, ensuring a clean separation of concerns, scalability, and maintainability.

- **Models**: Defines the MongoDB schemas using Mongoose (e.g., `Property` schema).
- **Views**: Server-side rendering using EJS templates, broken down into partials for reusability.
- **Controllers**: Handles business logic, database interactions, and routes requests to the appropriate views.

### 🌐 API & Routes Overview

#### Public Routes
| Method | Route | Controller | Description |
|--------|-------|------------|-------------|
| `GET` | `/` | `getHomePage` | Renders the main landing page with recent properties. |
| `GET` | `/properties` | `getPropertiesPage` | Renders property catalog with search, filter, and pagination logic. |
| `GET` | `/property-details/:id` | `getPropertyDetails` | Renders full details for a specific property. |
| `GET` | `/privacy` & `/terms` | `getPrivacyPage` / `getTermsPage`| Static informational pages. |

#### Authentication & Admin Routes (Protected)
| Method | Route | Controller | Description |
|--------|-------|------------|-------------|
| `GET/POST`| `/login` | `getLoginPage` / `handleLogin` | Admin authentication flow. |
| `GET` | `/logout` | `handleLogout` | Destroys session. |
| `GET` | `/dashboard` | `getDashboardPage` | Main admin panel. |
| `GET/POST`| `/add-property` | `createProperty` | Form to upload and save new property. |
| `GET/POST`| `/edit-property/:id`| `updateProperty` | Form to modify existing properties. |
| `POST` | `/delete-property/:id`| `deleteProperty` | Deletes a property from the database. |

---

## 💻 Tech Stack

### Backend & Core
- **Node.js**: JavaScript runtime environment.
- **Express.js (v5)**: Fast, unopinionated, minimalist web framework.
- **Mongoose**: Elegant MongoDB object modeling.
- **Express Session & Connect-Mongo**: Secure, persistent session handling.

### Frontend
- **EJS (Embedded JavaScript)**: Server-side templating engine.
- **CSS3 / HTML5**: Vanilla styling optimized for performance.
- **JavaScript (Vanilla)**: Client-side interactions.

### Cloud & Infrastructure
- **MongoDB Atlas**: Fully managed cloud database.
- **Cloudinary**: Cloud-based image and video management services.
- **Multer**: Middleware for handling `multipart/form-data` (file uploads).
- **Vercel**: Serverless deployment platform.

---

## 📂 Folder Structure

```text
📦 real-estate
 ┣ 📂 config
 ┃ ┗ 📜 db.js                   # MongoDB connection setup
 ┣ 📂 controllers
 ┃ ┣ 📜 dashboardController.js  # Admin logic, auth, & upload handling
 ┃ ┗ 📜 propertyController.js   # Public-facing views logic & search
 ┣ 📂 models
 ┃ ┗ 📜 Property.js             # Mongoose schema for properties
 ┣ 📂 public                    # Static assets (CSS, JS, Images)
 ┣ 📂 views                     # EJS Templates
 ┃ ┣ 📂 dashboard               # Admin views (login, add, edit, index)
 ┃ ┣ 📂 partials                # Reusable UI components (header, footer)
 ┃ ┣ 📂 properties              # Customer views (list, details)
 ┃ ┣ 📜 home.ejs                # Landing page
 ┃ ┣ 📜 privacy.ejs             # Privacy Policy
 ┃ ┗ 📜 terms.ejs               # Terms and Conditions
 ┣ 📜 app.js                    # Express app setup & route mapping
 ┣ 📜 package.json              # Project dependencies and scripts
 ┣ 📜 vercel.json               # Vercel deployment configuration
 ┗ 📜 .env                      # Environment variables (Ignored in Git)
```

---

## ⚙️ Database Structure

The core data entity is the **Property**.

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Title of the listing |
| `description`| String | Detailed property description |
| `price` | Number | Property cost/rent |
| `rooms` | Number | Number of bedrooms |
| `bathrooms` | Number | Number of bathrooms |
| `area` | Number | Square footage/meters |
| `location` | String | Physical address/neighborhood |
| `image` | String | URL to main thumbnail (Cloudinary default) |
| `gallery` | Array | Array of image URLs for the property gallery |
| `status` | String | Default: `Active`. Used for availability tracking |
| `timestamps`| Dates | `createdAt` and `updatedAt` |

---

## 🚀 Installation & Local Development

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- A [Cloudinary](https://cloudinary.com/) account for image uploads.

### 2. Clone the Repository
```bash
git clone https://github.com/Mostafa-K-Fakhry/malath-realestate.git
cd malath-realestate
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables Setup
Create a `.env` file in the root directory and add the following keys:

```env
# Server
PORT=3000

# Database & Sessions
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/realestate?retryWrites=true&w=majority
SESSION_SECRET=your_super_secret_session_key

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password_here

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Run the Development Server
```bash
node app.js
# Note: To use nodemon for auto-restarts: npx nodemon app.js
```
The application will be accessible at `http://localhost:3000`.

---

## 🌍 Production Deployment

This project is configured out-of-the-box for serverless deployment on **Vercel**.

1. Connect your GitHub repository to your Vercel account.
2. Ensure you add all `.env` variables to your Vercel Project Settings -> Environment Variables.
3. Vercel will automatically read `vercel.json` to configure the Express.js serverless functions.
4. **Deploy!**

> **Note**: Path resolving in `app.js` is strictly bound to `__dirname` logic tailored to avoid Vercel serverless environment pathing issues with EJS views.

---

## 🔒 Scalability & Security Notes

- **Session Security**: Uses `connect-mongo` to store sessions in the database, preventing memory leaks on the server and allowing horizontal scaling.
- **Asset Offloading**: All heavy media assets are handled by Cloudinary, reducing server bandwidth, storage costs, and significantly improving CDN delivery speeds.
- **Query Optimization**: Mongoose queries for properties implement pagination (`skip` & `limit`) and field specific sorting to ensure fast response times even as the database grows.
- **Serverless Ready**: The architecture is stateless (outside of the DB), making it perfect for serverless edge functions.

---

## ⚡ Performance & SEO Optimization

- **Server-Side Rendering (SSR)**: Utilizing EJS ensures that page content is fully generated on the server before reaching the browser. This drastically improves Initial Page Load and guarantees excellent SEO indexability by search engine crawlers.
- **Semantic HTML**: Ensures accessibility and improved search rankings.
- **Image Optimization**: Images uploaded via Cloudinary can easily be formatted automatically to WebP, significantly reducing page size.

---

## 📱 Mobile Responsiveness
The application UI is engineered with a mobile-first philosophy. Using modern CSS Flexbox/Grid techniques, the layout fluidly adapts to mobile phones, tablets, and desktop displays. Navigation menus and property grids gracefully degrade to accommodate smaller viewports without sacrificing functionality.

---

## 📸 Interface Screenshots

| Home Page | Properties Catalog | Admin Dashboard |
|-----------|--------------------|-----------------|
| <img src="https://via.placeholder.com/400x250.png?text=Home+Page+View" alt="Home Page" width="300" /> | <img src="https://via.placeholder.com/400x250.png?text=Property+Listings" alt="Properties Page" width="300" /> | <img src="https://via.placeholder.com/400x250.png?text=Admin+Dashboard" alt="Admin Dashboard" width="300" /> |

*(Note: Replace placeholder links with actual application screenshots)*

---

## 🛤️ Future Roadmap

- [ ] **Multi-language Support (i18n)**: Full localization with toggle between English and Arabic.
- [ ] **Advanced Analytics**: Integration of Google Analytics for user traffic tracking.
- [ ] **Map Integration**: Implement Google Maps / Mapbox API for property locations.
- [ ] **User Accounts**: Allow buyers to create accounts and favorite properties.
- [ ] **Email Notifications**: Automated alerts for new property listings.

---

## 🤝 Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **ISC License**. See the `package.json` file for more details.

---

## 👨‍💻 Author

**Malath Real Estate Team**
- GitHub: [@Mostafa-K-Fakhry](https://github.com/Mostafa-K-Fakhry)

---

<div align="center">
  <sub>Built with ❤️ for scalable real estate management.</sub>
</div>
