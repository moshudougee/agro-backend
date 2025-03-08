import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET;
const prisma = new PrismaClient();
// Middleware to verify JWT and attach user to request
export const authenticate = async (req, res, next) => {
    const token = req.signedCookies.auth_token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // Fetch user from database
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        //console.log(user)
        if (!user) {
            res.status(401).json({ message: "Invalid token." });
            return;
        }
        req.user = { id: user.id, email: user.email, role: user.role };
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
// Middleware to check if user is an admin
export const authenticateAdmin = async (req, res, next) => {
    if (!req.user) {
        res.status(403).json({ message: "Unauthorized. No user found." });
        return;
    }
    if (req.user.role !== "ADMIN") {
        res.status(403).json({ message: "Access denied. Admins only." });
        return;
    }
    next();
};
