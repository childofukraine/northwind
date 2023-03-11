"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRepo = void 0;
const expressions_1 = require("drizzle-orm/expressions");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const info_1 = __importDefault(require("../entities/info"));
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class SearchRepo {
}
exports.SearchRepo = SearchRepo;
_a = SearchRepo;
SearchRepo.searchProducts = async (keyword) => {
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const products = await database
        .select()
        .from(schema_1.productsTable)
        .where((0, expressions_1.ilike)(schema_1.productsTable.productName, `%${keyword}%`));
    if (!products.length)
        return null;
    return {
        data: products,
        info: new info_1.default(database
            .select()
            .from(schema_1.productsTable)
            .where((0, expressions_1.ilike)(schema_1.productsTable.productName, `%${keyword}%`))
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
SearchRepo.searchCustomers = async (keyword) => {
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const customers = await database
        .select()
        .from(schema_1.customersTable)
        .where((0, expressions_1.or)((0, expressions_1.ilike)(schema_1.customersTable.companyName, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.contactName, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.contactTitle, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.address, `%${keyword}%`)));
    if (!customers.length)
        return null;
    return {
        data: customers,
        info: new info_1.default(database
            .select()
            .from(schema_1.customersTable)
            .where((0, expressions_1.or)((0, expressions_1.ilike)(schema_1.customersTable.companyName, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.contactName, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.contactTitle, `%${keyword}%`), (0, expressions_1.ilike)(schema_1.customersTable.address, `%${keyword}%`)))
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
