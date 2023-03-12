import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router";
import { errorHandler } from "./utils/error_handler";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: `http://localhost:${PORT}` , 
    credentials:true,           
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
