
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbconnection from "./database.js";
import authRoute from "./routes/auth.route.js";
import blogRoute from "./routes/blog.route.js";
import bookingRoute from "./routes/booking.route.js";
import chatRoute from "./routes/chat.route.js";
import guideRoute from "./routes/guide.route.js";
import homeRoute from "./routes/home.route.js";
import languageRoute from "./routes/language.route.js";
import reviewRoute from "./routes/review.route.js";
import specializationRoute from "./routes/specialization.route.js";
import tourRoute from "./routes/tour.route.js";
import tourreviewRoute from "./routes/tour_review.route.js";
import userRoute from "./routes/users.route.js";
import wishlistRoute from "./routes/wishlist.route.js";

dotenv.config();
const app = express();

const allowedOrigins = ['http://localhost:5173']; // Replace with your React app's URL

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) { // Allow requests without origin (like Postman) or from allowed origins
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Only if you need credentials (cookies, etc.)
};
// const corsOptions = {
//     AccessControlAllowOrigin: 'http://localhost:5173',
//     origin: 'http://localhost:5173',
//     credentials: true
//     // methods: ["GET","PUT","PATCH","POST","DELETE"]
//   }

//middleware 
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));


//routes
app.get('/', (req, res) => {
    res.send("Welcome");
});
app.use("/api/home", homeRoute);
app.use("/api/users", userRoute);
app.use("/api/guides", guideRoute);
app.use("/api/tours", tourRoute);
app.use("/api/specializations", specializationRoute);
app.use("/api/languages", languageRoute);
app.use("/api/review", reviewRoute);
app.use("/api/tour-review", tourreviewRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/blog", blogRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/chat", chatRoute);
app.use("/auth", authRoute);


const startserver = () => {
    dbconnection().then(() => {
        const PORT = 3030;
        app.listen(PORT, () => {
            console.log(`Server running at localhost:${PORT}`);
        });
    });
};
export default startserver;
