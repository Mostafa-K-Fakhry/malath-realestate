import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // تفعيل قراءة ملف .env

const connectDB = async () => {
    try {
        // قراءة الرابط المخفي
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
};

export default connectDB;