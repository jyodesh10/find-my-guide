import mongoose from "mongoose";
const homeSchema = new mongoose.Schema({
    recommended_tours: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tour',
        },
    ],
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
    guides_nearby: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Guide',
        },
    ],
});
const Home = mongoose.model('Home', homeSchema);
export default Home;
