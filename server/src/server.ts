import express from 'express'
import colors from "colors";
import morgan from 'morgan'
import cors from "cors";

// CORS Config
import { CORSConfig } from './config/cors';

// Database config
import { db } from "./config/db";

// Routers
import authRouter from "./routes/authRouter";
// import imageRouter from "./routes/imageRouter";

async function connectDB () {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.blue.bold("Connected to the database sucessfully"));
    } catch (error) {
        console.log(colors.red.bold(`Error while connecting to the database: ${error}`));
    }
}
connectDB();

const app = express()

app.use(cors(CORSConfig))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())

// Routers
app.use("/api/auth/", authRouter);

export default app