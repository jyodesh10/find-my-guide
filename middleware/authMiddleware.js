import jwt from "jsonwebtoken";
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "access denied" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        try {
            if (err)
                return res.status(403).json({ message: "invalid token" });
            console.log("JWT Payload:", user);
            req.user = user.user._id;
            next();
        } catch (error) {
            console.error("Error in JWT verify callback:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
export default authenticateToken;
