import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGOURL;

app.use(express.json());
app.use(bodyParser.json());
//app.use("/api", authRoutes);
app.use("/api/user",userRoutes);

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connected Successfully");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error)=>{
    console.log(`Database connection failed: ${error}`);
});