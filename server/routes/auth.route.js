import * as express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Guide from "../models/guide.model.js";
import { comparepasswords } from "../utils/bcrypthelper.js";
const router = express.Router();
const refreshTokens = [];
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    const isMatch = await comparepasswords(password, user.password);
    if (!isMatch) {
        return res.status(403).json({ message: "credentials invalid" });
    }
    //generate jwt
    const accesToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d"
    });
    const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ id: user.id, accesToken, refreshToken });
});
router.post("/guide-login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Guide.findOne({
        email: email
    });
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    const isMatch = await comparepasswords(password, user.password);
    if (!isMatch) {
        return res.status(403).json({ message: "credentials invalid" });
    }
    //generate jwt
    const accesToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d"
    });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accesToken, refreshToken });
});
router.post("/token", (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(401).json({ message: "refresh token required" });
    if (!refreshTokens.includes(refreshToken))
        return res.status(403).json({ message: "invalid refresh token" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ message: "invalid refresh token" });
        const newaccesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30d"
        });
        res.json({ accesToken: newaccesstoken });
    });
});
router.post("/logout", (req, res) => {
    const { refreshToken } = req.body;
    const index = refreshTokens.indexOf(refreshToken);
    if (index > -1)
        refreshTokens.splice(index, 1);
    res.send("Logged out!!!");
});
export default router;
