const dotenv = require("dotenv");
const express = require("express");
const dbconnection = require("./database.js");
const authRoute = require("./routes/auth.route.js");
const userRoute = require("./routes/users.route.js");
const guideRoute = require("./routes/guide.route.js");
const tourRoute = require("./routes/tour.route.js");
const languageRoute = require("./routes/language.route.js");
const specializationRoute = require("./routes/specialization.route.js");
const reviewRoute = require("./routes/review.route.js");
const tourreviewRoute = require("./routes/tour_review.route.js");
const wishlistRoute = require("./routes/wishlist.route.js");

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));


//routes
app.use("/api/users", userRoute);
app.use("/api/guides", guideRoute);
app.use("/api/tours", tourRoute);
app.use("/api/specializations", specializationRoute);
app.use("/api/languages", languageRoute);
app.use("/api/review", reviewRoute);
app.use("/api/tour-review", tourreviewRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/auth", authRoute);

app.get('/', (req, res) => {
    res.send("Welcome")
})



const startserver = () => {
    dbconnection().then(() => {
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server running at localhost:${PORT}`)
        })
    });
}

module.exports = startserver;