import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import userRoutes from './routes/users.js';
import relationshipRoutes from './routes/relationships.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = 8800;

// Serve static files from the public folder
app.use("/public/uploads", express.static("public/uploads"));

// MIDDLEWARES
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

// ROUTE DEFINITIONS
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/upload", uploadRoutes);

// START SERVER
app.listen(PORT, () => {
    console.log(`API working on port ${PORT}!`);
});
