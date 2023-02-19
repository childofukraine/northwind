"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const boom_1 = require("@hapi/boom");
const expressions_1 = require("drizzle-orm/expressions");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class Search {
}
exports.Search = Search;
_a = Search;
Search.searchProducts = async (keyword) => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const product = await database
            .select(schema_1.productsTable)
            .where((0, expressions_1.ilike)(schema_1.productsTable.productName, `%${keyword}%`));
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        if (!product.length)
            return (0, boom_1.badRequest)("Product not found").output.payload.message;
        const response = {
            data: product,
            queryInfo: {
                queryString: database
                    .select(schema_1.productsTable)
                    .where((0, expressions_1.ilike)(schema_1.productsTable.productName, `%${keyword}%`))
                    .toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("SearchProducts error in database,error message: " + err.message);
        }
    }
};
Search.searchCustomers = async (keyword) => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const customers = await database
            .select(schema_1.customersTable)
            .where((0, expressions_1.or)((0, expressions_1.ilike)(schema_1.customersTable.companyName, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.contactName, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.contactTitle, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.address, `%${keyword}%`)));
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        if (!customers.length)
            return (0, boom_1.badRequest)("Customer not found").output.payload.message;
        const response = {
            data: customers,
            queryInfo: {
                queryString: database
                    .select(schema_1.customersTable)
                    .where((0, expressions_1.or)((0, expressions_1.ilike)(schema_1.customersTable.companyName, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.contactName, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.contactTitle, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.address, `%${keyword}%`)))
                    .toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("SearchCustomers error in database,error message: " + err.message);
        }
    }
};
