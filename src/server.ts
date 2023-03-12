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
app.use(cors());

app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
