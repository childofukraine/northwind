"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suppliers = void 0;
const boom_1 = require("@hapi/boom");
const expressions_1 = require("drizzle-orm/expressions");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class Suppliers {
}
exports.Suppliers = Suppliers;
_a = Suppliers;
Suppliers.getAllSuppliers = async () => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const suppliers = await database.select(schema_1.suppliersTable);
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        const response = {
            data: suppliers,
            queryInfo: {
                queryString: database.select(schema_1.suppliersTable).toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetAllSuppliers error in database,error message: " + err.message);
        }
    }
};
Suppliers.getIndexedSuppliers = async (supplierId) => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const supplier = await database
            .select(schema_1.suppliersTable)
            .where((0, expressions_1.eq)(schema_1.suppliersTable.supplierID, supplierId));
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        if (!supplier.length)
            return (0, boom_1.badRequest)("No such supplier").output.payload.message;
        const response = {
            data: supplier,
            queryInfo: {
                queryString: database
                    .select(schema_1.suppliersTable)
                    .where((0, expressions_1.eq)(schema_1.suppliersTable.supplierID, supplierId))
                    .toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetIndexedSuppliers error in database,error message: " + err.message);
        }
    }
};
