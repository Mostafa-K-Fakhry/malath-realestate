import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import session from 'express-session'; 
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Controllers
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

dotenv.config();

// Fix directory path for Vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');

// Crucial fix for Vercel views and static files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

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

export default app;