const dotenv = require("dotenv");
const express = require("express");
const dbconnection = require("./database.js");
const authRoute = require("./routes/auth.route.js");
const userRoute = require("./routes/users.route.js");
const guideRoute = require("./routes/guide.route.js");

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use("/api/users", userRoute);
app.use("/api/guides", guideRoute);
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