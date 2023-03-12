import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router";
import { errorHandler } from "./utils/error_handler";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: [
      "http://192.168.0.157:3000",
      "http://213.111.67.182:5173",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["HEAD", "OPTIONS", "POST", "GET", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Uppy-Versions",
      "Accept",
      "x-requested-with",
      "Access-Control-Allow-Origin",
    ],
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  }));

app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
