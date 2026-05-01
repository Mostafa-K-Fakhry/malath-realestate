import Property from '../models/Property.js';

export const getHomePage = async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        res.render('home', { title: 'Elite Real Estate - Home', properties });
    } catch (error) {
        console.log("Error fetching home page properties: ", error);
        res.render('home', { title: 'Elite Real Estate - Home', properties: [] });
    }
};

export const getPropertiesPage = async (req, res) => {
    try {
        let query = {};

        if (req.query.location && req.query.location !== 'جميع المناطق') {
            query.location = { $regex: req.query.location, $options: 'i' }; 
        }

        if (req.query.maxPrice && req.query.maxPrice !== '') {
            query.price = { $lte: Number(req.query.maxPrice) }; 
        }

        if (req.query.type && req.query.type !== 'الكل') {
            query.title = { $regex: req.query.type, $options: 'i' };
        }

        let sortLogic = { createdAt: -1 }; 
        if (req.query.sort === 'الأقل سعراً') sortLogic = { price: 1 };
        if (req.query.sort === 'الأعلى سعراً') sortLogic = { price: -1 };

        // Student-level Pagination Logic
        let page = 1;
        if (req.query.page) {
            page = Number(req.query.page);
        }
        
        const limit = 6; // Display exactly 6 properties per page (2 rows x 2 columns)
        const skip = (page - 1) * limit;

        const totalDocs = await Property.countDocuments(query);
        const totalPages = Math.ceil(totalDocs / limit);

        const properties = await Property.find(query).sort(sortLogic).skip(skip).limit(limit);
        
        res.render('properties/properties', { 
            title: 'Elite Real Estate - Properties', 
            properties: properties,
            searchQuery: req.query,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.log("Error: ", error);
        res.render('properties/properties', { 
            title: 'Elite Real Estate - Properties', 
            properties: [], 
            searchQuery: {},
            currentPage: 1,
            totalPages: 1
        });
    }
};

export const getPropertyDetails = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        
        if (!property) {
            return res.redirect('/properties'); 
        }
        
        res.render('properties/property-details', { 
            title: `Elite Real Estate - ${property.title}`, 
            property: property 
        });
    } catch (error) {
        console.log("Error fetching property details: ", error);
        res.redirect('/properties');
    }
};


export const getPrivacyPage = (req, res) => {
    res.render('privacy', { title: 'مَـلاذ العـقـاريـة - سياسة الخصوصية' });
};

export const getTermsPage = (req, res) => {
    res.render('terms', { title: 'مَـلاذ العـقـاريـة - الشروط والأحكام' });
};