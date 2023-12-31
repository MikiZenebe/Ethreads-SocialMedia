import express from "express";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

//Connect to database
connectDB();

//Middleware --
app.use(express.json()); //It allows to parse the incoming data from req
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //Get the cookie from the req & set the cookie inside res

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//Start the server
app.listen(PORT, () => console.log("Server is started at port" + PORT));
