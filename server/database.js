import mongoose from "mongoose";
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if connection fails
    }
};
export default connectToDatabase;
