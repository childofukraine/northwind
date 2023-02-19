import express from "express";
import { Controller } from "../controller/controller";

const router = express.Router();
router.get("/dash", Controller.dash);
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

export default router;
