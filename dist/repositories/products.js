"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const boom_1 = require("@hapi/boom");
const expressions_1 = require("drizzle-orm/expressions");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class Products {
}
exports.Products = Products;
_a = Products;
Products.getAllProducts = async () => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const products = await database.select(schema_1.productsTable);
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        const response = {
            data: products,
            queryInfo: {
                queryString: database.select(schema_1.productsTable).toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetAllProducts error in database,error message: " + err.message);
        }
    }
};
Products.getIndexedProducts = async (productId) => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const product = await database
            .select(schema_1.productsTable)
            .leftJoin(schema_1.suppliersTable, (0, expressions_1.eq)(schema_1.productsTable.productID, schema_1.suppliersTable.supplierID))
            .where((0, expressions_1.eq)(schema_1.productsTable.productID, productId));
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        if (!product.length)
            return (0, boom_1.badRequest)("No such product").output.payload.message;
        const response = {
            data: product,
            queryInfo: {
                queryString: database
                    .select(schema_1.productsTable)
                    .leftJoin(schema_1.suppliersTable, (0, expressions_1.eq)(schema_1.productsTable.supplierID, schema_1.suppliersTable.supplierID))
                    .where((0, expressions_1.eq)(schema_1.productsTable.productID, productId))
                    .toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetIndexedProducts error in database,error message: " + err.message);
        }
    }
};
