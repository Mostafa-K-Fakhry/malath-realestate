import Property from '../models/Property.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary Configuration using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Setup Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'elite_real_estate',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
    }
});

export const upload = multer({ storage: storage });

export const getDashboardPage = async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        
        const totalProperties = properties.length;
        const activeProperties = properties.filter(prop => prop.status === 'Active').length;

        res.render('dashboard/dashboard', { 
            title: 'Elite Real Estate - Dashboard', 
            properties: properties,
            totalProperties: totalProperties,
            activeProperties: activeProperties
        });
    } catch (error) {
        console.log("Error fetching dashboard data: ", error);
        res.render('dashboard/dashboard', { 
            title: 'Elite Real Estate - Dashboard', 
            properties: [],
            totalProperties: 0,
            activeProperties: 0
        });
    }
};

export const getAddPropertyPage = (req, res) => {
    res.render('dashboard/add-property', { title: 'Elite Real Estate - Add Property' });
};

export const createProperty = async (req, res) => {
    try {
        let imageUrl = 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'; // Default image
        let galleryImages = [];

        // --- Main Image Logic ---
        if (req.body.imageLink && req.body.imageLink.trim() !== '') {
            // Option 1: User provided a direct URL
            imageUrl = req.body.imageLink;
        } else if (req.files && req.files['image'] && req.files['image'].length > 0) {
            // Option 2: User uploaded a file
            imageUrl = req.files['image'][0].path; 
        }

        // --- Gallery Logic ---
        // Option 1: User provided direct URLs (separated by commas)
        if (req.body.galleryLinks && req.body.galleryLinks.trim() !== '') {
            const links = req.body.galleryLinks.split(',').map(link => link.trim()).filter(link => link !== '');
            galleryImages = galleryImages.concat(links);
        }
        
        // Option 2: User uploaded files
        if (req.files && req.files['gallery'] && req.files['gallery'].length > 0) {
            for (let i = 0; i < req.files['gallery'].length; i++) {
                galleryImages.push(req.files['gallery'][i].path);
            }
        }

        const newProperty = new Property({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rooms: req.body.rooms,
            bathrooms: req.body.bathrooms,
            area: req.body.area,
            location: req.body.location,
            image: imageUrl,
            gallery: galleryImages 
        });

        await newProperty.save();
        res.redirect('/dashboard'); 
    } catch (error) {
        console.log("Error saving property: ", error);
        res.redirect('/add-property'); 
    }
};

export const getEditPropertyPage = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        
        if (!property) {
            return res.redirect('/dashboard');
        }
        
        res.render('dashboard/edit-property', { 
            title: 'Elite Real Estate - Edit Property',
            property: property 
        });
    } catch (error) {
        console.log("Error loading edit page: ", error);
        res.redirect('/dashboard');
    }
};

export const updateProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rooms: req.body.rooms,
            bathrooms: req.body.bathrooms,
            area: req.body.area,
            location: req.body.location
        };

        // --- Main Image Logic (Update) ---
        if (req.body.imageLink && req.body.imageLink.trim() !== '') {
            updatedData.image = req.body.imageLink;
        } else if (req.files && req.files['image'] && req.files['image'].length > 0) {
            updatedData.image = req.files['image'][0].path;
        }

        // --- Gallery Logic (Update) ---
        let newGallery = [];
        let hasNewGallery = false;

        if (req.body.galleryLinks && req.body.galleryLinks.trim() !== '') {
            const links = req.body.galleryLinks.split(',').map(link => link.trim()).filter(link => link !== '');
            newGallery = newGallery.concat(links);
            hasNewGallery = true;
        }

        if (req.files && req.files['gallery'] && req.files['gallery'].length > 0) {
            for (let i = 0; i < req.files['gallery'].length; i++) {
                newGallery.push(req.files['gallery'][i].path);
            }
            hasNewGallery = true;
        }

        if (hasNewGallery) {
            updatedData.gallery = newGallery;
        }

        await Property.findByIdAndUpdate(propertyId, updatedData);
        res.redirect('/dashboard');
        
    } catch (error) {
        console.log("Error updating property: ", error);
        res.redirect('/dashboard');
    }
};

export const deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        await Property.findByIdAndDelete(propertyId);
        res.redirect('/dashboard');
    } catch (error) {
        console.log("Error deleting property: ", error);
        res.redirect('/dashboard');
    }
};

export const requireAuth = (req, res, next) => {
    if (req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
};

export const getLoginPage = (req, res) => {
    if (req.session.isAuthenticated) {
        return res.redirect('/dashboard');
    }
    res.render('dashboard/login', { title: 'Admin Login' });
};

// Handle login logic
export const handleLogin = (req, res) => {
    const { username, password } = req.body;
    
    // Check credentials from environment variables
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.isAuthenticated = true;
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
};

export const handleLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};