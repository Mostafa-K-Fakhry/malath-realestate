import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv'; // NEW: Import dotenv
import { 
    getHomePage,
    getPropertiesPage,
    getPropertyDetails,
    getPrivacyPage, 
    getTermsPage    
} from './controllers/propertyController.js';
import {
     getDashboardPage,
     getAddPropertyPage,
     createProperty,
     getEditPropertyPage,
     updateProperty,
     deleteProperty,
     upload,
     getLoginPage, 
     handleLogin, 
     handleLogout, 
     requireAuth 
} from './controllers/dashboardController.js';

import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session'; 
import MongoStore from 'connect-mongo'; // NEW: Import MongoStore

dotenv.config(); // NEW: Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Updated for deployment

// Connect to the database
connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// Setup session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI 
    })
}));

// --- Public Routes ---
app.get('/', getHomePage);
app.get('/properties', getPropertiesPage);
app.get('/property-details/:id', getPropertyDetails);
app.get('/privacy', getPrivacyPage);
app.get('/terms', getTermsPage);

// --- Auth Routes ---
app.get('/login', getLoginPage);
app.post('/login', handleLogin);
app.get('/logout', handleLogout);

// --- Dashboard Routes (Protected) ---
app.get('/dashboard', requireAuth, getDashboardPage);

app.get('/add-property', requireAuth, getAddPropertyPage);
app.post('/add-property', requireAuth, upload.fields([
    { name: 'image', maxCount: 1 }, 
    { name: 'gallery', maxCount: 6 }
]), createProperty);

app.get('/edit-property/:id', requireAuth, getEditPropertyPage);
app.post('/edit-property/:id', requireAuth, upload.fields([
    { name: 'image', maxCount: 1 }, 
    { name: 'gallery', maxCount: 6 }
]), updateProperty);

app.post('/delete-property/:id', requireAuth, deleteProperty);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// NEW: Export the app for Vercel Serverless Functions
export default app;