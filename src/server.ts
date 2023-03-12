import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import router from "./router/router";
import { Controller } from "./controller/controller"
import { errorHandler } from "./utils/error_handler";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const router = express.Router();
router.get("/suppliers", Controller.suppliers);
router.get("/suppliers/:supplierId", Controller.suppliersIndexed);
router.get("/products", Controller.products);
router.get("/products/:productId", Controller.productsIndexed);
router.get("/orders", Controller.orders);
router.get("/orders/:orderId", Controller.ordersIndexed);
router.get("/employees", Controller.employees);
router.get("/employees/:employeeId", Controller.employeesIndexed);
router.get("/customers", Controller.customers);
router.get("/customers/:customerId", Controller.customersIndexed);
router.get("/search-products/:keyword", Controller.searchProducts);
router.get("/search-customers/:keyword", Controller.searchCustomers);
console.log('hi')
app.use("/", router);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
