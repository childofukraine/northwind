import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/", router);
app.use(cors());

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
