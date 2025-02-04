// import AdminJSExpress from "@adminjs/express";
// import * as AdminJSMongoose from "@adminjs/mongoose";
// import AdminJS from "adminjs";
// import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbconnection from "./database.js";
// import blogResource from "./resources/blog.resource.js";
// import bookingResource from "./resources/booking.resource.js";
// import guideResource from "./resources/guide.resource.js";
// import homeResource from "./resources/home.resource.js";
// import reviewResource from "./resources/review.resource.js";
// import tourResource from "./resources/tour.resource.js";
// import tourreviewResource from "./resources/tour_review.resource.js";
// import userResource from "./resources/user.resource.js";
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

// AdminJS.registerAdapter(AdminJSMongoose);
dotenv.config();
const app = express();


// //admins
// const adminJs = new AdminJS({
//     resources: [
//         // homeResource
//         userResource,
//         blogResource,
//         tourResource,
//         guideResource,
//         tourreviewResource,
//         homeResource,
//         reviewResource,
//         bookingResource
//     ],
//     rootPath: "/admin", // Path to the AdminJS dashboard.
// });

// // const ConnectSession = MongoStore(session);
// const sessionStore = MongoStore.create({
//     mongoUrl: process.env.URI, // Replace with your connection string
//     collection: 'sessions',
// })

// const DEFAULT_ADMIN = {
//     email: process.env.ADMIN_EMAIL,
//     password: process.env.ADMIN_PASSWORD,
// }

// const authenticate = async (email, password) => {
//     if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//         return Promise.resolve(DEFAULT_ADMIN)
//     }
//     return null
// }

// const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//     adminJs,
//     {
//         authenticate,
//         cookieName: 'adminjs',
//         cookiePassword: 'sessionsecret',
//     },
//     null,
//     {
//         store: sessionStore,
//         resave: true,
//         saveUninitialized: true,
//         secret: 'sessionsecret',
//         // cookie: {
//         //     httpOnly: process.env.NODE_ENV === 'production',
//         //     secure: process.env.NODE_ENV === 'production',
//         // },
//         name: 'adminjs',
//     }
// )

// app.use(adminJs.options.rootPath, adminRouter);

//middleware
app.use(cors());
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
