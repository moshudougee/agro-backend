import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { PrismaClient } from "@prisma/client";
import errorHandler from "./middleware/errorHandler.js";
import orderRoutes from "./routes/orderRoutes.js";
import fertilizerRoutes from "./routes/fertilizerRoutes.js";
import seedsRoutes from "./routes/seedsRoutes.js";
import detailsRoutes from "./routes/detailsRoutes.js";
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const corsOptions = {
    credentials: false,
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://my-agro-store.vercel.app/',
};
console.log(corsOptions);
// Middleware
app.use(cors(corsOptions));
//app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
// Verify database connection
prisma
    .$connect()
    .then(() => {
    console.log('Database connected successfully');
})
    .catch((err) => {
    console.error('Database connection error:', err);
});
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/fertilizers", fertilizerRoutes);
app.use("/api/seeds", seedsRoutes);
app.use("/api/details", detailsRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
