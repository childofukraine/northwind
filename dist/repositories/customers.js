"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customers = void 0;
const boom_1 = require("@hapi/boom");
const expressions_1 = require("drizzle-orm/expressions");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class Customers {
}
exports.Customers = Customers;
_a = Customers;
Customers.getAllCustomers = async () => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const customers = await database.select(schema_1.customersTable);
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        const response = {
            data: customers,
            queryInfo: {
                queryString: database.select(schema_1.customersTable).toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetAllCustomers error in database,error message: " + err.message);
        }
    }
};
Customers.getIndexedCustomers = async (customerId) => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const customer = await database
            .select(schema_1.customersTable)
            .where((0, expressions_1.eq)(schema_1.customersTable.customerID, customerId));
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        if (!customer.length)
            return (0, boom_1.badRequest)("No such customer").output.payload.message;
        const response = {
            data: customer,
            queryInfo: {
                queryString: database
                    .select(schema_1.customersTable)
                    .where((0, expressions_1.eq)(schema_1.customersTable.customerID, customerId))
                    .toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetIndexedCustomers error in database,error message: " + err.message);
        }
    }
};
