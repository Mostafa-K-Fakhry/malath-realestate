import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    bathrooms:{
        type : Number,
        required : true 
    },
      area:{
        type : Number,
        required : true 
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'default-property.jpg'
    },
    gallery: {
         type: [String],
         default: [] 
    },
    status: {
        type: String,
        default: 'Active' // Can be 'Active' or 'Sold'
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Property = mongoose.model('Property', propertySchema);

export default Property;