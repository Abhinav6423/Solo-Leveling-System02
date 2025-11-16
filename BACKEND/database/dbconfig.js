import mongoose from "mongoose";

/**
 * 🌐 Connect to MongoDB
 * ------------------------
 * - Uses MONGO_URI from environment variables
 * - Logs success or error messages
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("👎 Error connecting to MongoDB:", error);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
