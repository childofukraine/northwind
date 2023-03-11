"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const boom_1 = require("@hapi/boom");
require("dotenv/config");
const customers_1 = require("../repositories/customers");
const employees_1 = require("../repositories/employees");
const orders_1 = require("../repositories/orders");
const products_1 = require("../repositories/products");
const suppliers_1 = require("../repositories/suppliers");
const search_1 = require("../repositories/search");
class Controller {
    static async suppliers(req, res, next) {
        const { page } = req.query;
        try {
            const count = await suppliers_1.SuppliersRepo.suppliersCount();
            if (!count)
                throw (0, boom_1.notFound)();
            const suppliers = await suppliers_1.SuppliersRepo.getAllSuppliers(+page);
            if (!suppliers)
                throw (0, boom_1.notFound)();
            res.json({ suppliers, count });
        }
        catch (err) {
            next(err);
        }
    }
    static async suppliersIndexed(req, res, next) {
        const { supplierId } = req.params;
        try {
            const supplier = await suppliers_1.SuppliersRepo.getIndexedSuppliers(+supplierId);
            if (!supplier)
                throw (0, boom_1.notFound)();
            res.json({ supplier });
        }
        catch (err) {
            next(err);
        }
    }
    static async products(req, res, next) {
        const { page } = req.query;
        try {
            const count = await products_1.ProductsRepo.productsCount();
            if (!count)
                throw (0, boom_1.notFound)();
            const products = await products_1.ProductsRepo.getAllProducts(+page);
            if (!products)
                throw (0, boom_1.notFound)();
            res.json({ products, count });
        }
        catch (err) {
            next(err);
        }
    }
    static async productsIndexed(req, res, next) {
        const { productId } = req.params;
        try {
            const product = await products_1.ProductsRepo.getIndexedProducts(+productId);
            if (!product)
                throw (0, boom_1.notFound)();
            res.json({ product });
        }
        catch (err) {
            next(err);
        }
    }
    static async orders(req, res, next) {
        const { page } = req.query;
        try {
            const count = await orders_1.OrdersRepo.ordersCount();
            if (!count)
                throw (0, boom_1.notFound)();
            const orders = await orders_1.OrdersRepo.getAllOrders(+page);
            if (!orders)
                throw (0, boom_1.notFound)();
            res.json({ count, orders });
        }
        catch (err) {
            next(err);
        }
    }
    static async ordersIndexed(req, res, next) {
        const { orderId } = req.params;
        try {
            const order = await orders_1.OrdersRepo.getIndexedOrders(+orderId);
            if (!order)
                throw (0, boom_1.notFound)();
            const productsInOrder = await products_1.ProductsRepo.getProductsInOrderByOrderID(+orderId);
            res.json({ order, productsInOrder });
        }
        catch (err) {
            next(err);
        }
    }
    static async employees(req, res, next) {
        const { page } = req.query;
        try {
            const count = await employees_1.EmployeesRepo.employeesCount();
            if (!count)
                throw (0, boom_1.notFound)();
            const employees = await employees_1.EmployeesRepo.getAllEmployees(page);
            if (!employees)
                throw (0, boom_1.notFound)();
            res.json({ count, employees });
        }
        catch (err) {
            next(err);
        }
    }
    static async employeesIndexed(req, res, next) {
        const { employeeId } = req.params;
        try {
            const employee = await employees_1.EmployeesRepo.getIndexedEmployees(+employeeId);
            if (!employee)
                throw (0, boom_1.notFound)();
            res.json({ employee });
        }
        catch (err) {
            next(err);
        }
    }
    static async customers(req, res, next) {
        const { page } = req.query;
        try {
            const count = await customers_1.CustomersRepo.customersCount();
            if (!count)
                throw (0, boom_1.notFound)();
            const customers = await customers_1.CustomersRepo.getAllCustomers(+page);
            if (!customers)
                throw (0, boom_1.notFound)();
            res.json({ count, customers });
        }
        catch (err) {
            next(err);
        }
    }
    static async customersIndexed(req, res, next) {
        const { customerId } = req.params;
        try {
            const customer = await customers_1.CustomersRepo.getIndexedCustomers(customerId);
            if (!customer)
                throw (0, boom_1.notFound)();
            res.json({ customer });
        }
        catch (err) {
            next(err);
        }
    }
    static async searchProducts(req, res, next) {
        const { keyword } = req.params;
        try {
            const products = await search_1.SearchRepo.searchProducts(keyword);
            if (!products)
                throw (0, boom_1.notFound)();
            return res.json(products);
        }
        catch (err) {
            next(err);
        }
    }
    static async searchCustomers(req, res, next) {
        const { keyword } = req.params;
        try {
            const customers = await search_1.SearchRepo.searchCustomers(keyword);
            if (!customers)
                throw (0, boom_1.notFound)();
            return res.json(customers);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.Controller = Controller;
