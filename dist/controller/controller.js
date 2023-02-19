"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const axios_1 = __importDefault(require("axios"));
const suppliers_1 = require("../repositories/suppliers");
const products_1 = require("../repositories/products");
require("dotenv/config");
const orders_1 = require("../repositories/orders");
const employees_1 = require("../repositories/employees");
const customers_1 = require("../repositories/customers");
const search_1 = require("../repositories/search");
class Controller {
    static async dash(_req, res) {
        let { data: rawIpData } = await axios_1.default.get(`${process.env.BASE_URL_IPREGISTRY}${process.env.API_KEY}`);
        const { latitude, longitude } = rawIpData.location;
        const { code } = rawIpData.location.country;
        let { data: rawAirportData } = await axios_1.default.get(`${process.env.BASE_URL_AIR}${latitude}&lng=${longitude}&distance=100&api_key=${process.env.API_KEY_AIR}`);
        const airportsArray = rawAirportData.response.airports;
        const nearestAirport = airportsArray.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr);
        res.status(200).send({
            Country: code,
            Colo: nearestAirport.iata_code,
        });
    }
    static async suppliers(_req, res) {
        const response = await suppliers_1.Suppliers.getAllSuppliers();
        res.status(200).send({ response });
    }
    static async suppliersIndexed(req, res) {
        const { supplierId } = req.params;
        const response = await suppliers_1.Suppliers.getIndexedSuppliers(supplierId);
        res.status(200).send({ response });
    }
    static async products(_req, res) {
        const response = await products_1.Products.getAllProducts();
        res.status(200).send({ response });
    }
    static async productsIndexed(req, res) {
        const { productId } = req.params;
        const response = await products_1.Products.getIndexedProducts(productId);
        res.status(200).send({ response });
    }
    static async orders(_req, res) {
        const response = await orders_1.Orders.getAllOrders();
        res.status(200).send({ response });
    }
    static async ordersIndexed(req, res) {
        const { orderId } = req.params;
        const response = await orders_1.Orders.getIndexedOrders(orderId);
        res.status(200).send({ response });
    }
    static async employees(_req, res) {
        const response = await employees_1.Employees.getAllEmployees();
        res.status(200).send({ response });
    }
    static async employeesIndexed(req, res) {
        const { employeeId } = req.params;
        const response = await employees_1.Employees.getIndexedEmployees(employeeId);
        res.status(200).send({ response });
    }
    static async customers(_req, res) {
        const response = await customers_1.Customers.getAllCustomers();
        res.status(200).send({ response });
    }
    static async customersIndexed(req, res) {
        const { customerId } = req.params;
        const response = await customers_1.Customers.getIndexedCustomers(customerId);
        res.status(200).send({ response });
    }
    static async searchProducts(req, res) {
        const { keyword } = req.params;
        const response = await search_1.Search.searchProducts(keyword);
        res.status(200).send({ response });
    }
    static async searchCustomers(req, res) {
        const { keyword } = req.params;
        const response = await search_1.Search.searchCustomers(keyword);
        res.status(200).send({ response });
    }
}
exports.Controller = Controller;
