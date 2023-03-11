"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersRepo = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const expressions_1 = require("drizzle-orm/expressions");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const info_1 = __importDefault(require("../entities/info"));
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class CustomersRepo {
    static async customersCount() {
        const ts = (0, utils_1.getTS)();
        const startExec = Date.now();
        const count = await database
            .select({
            count: (0, drizzle_orm_1.sql) `count(${schema_1.customersTable.customerID})`,
        })
            .from(schema_1.customersTable);
        if (!count.length)
            return null;
        return {
            data: +count[0].count,
            info: new info_1.default(database
                .select({
                count: (0, drizzle_orm_1.sql) `count(${schema_1.customersTable.customerID})`,
            })
                .from(schema_1.customersTable)
                .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
        };
    }
}
exports.CustomersRepo = CustomersRepo;
_a = CustomersRepo;
CustomersRepo.getAllCustomers = async (page) => {
    const limit = +process.env.LIMIT;
    const offset = limit * (+page - 1);
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const customers = await database
        .select()
        .from(schema_1.customersTable)
        .limit(limit)
        .offset(offset);
    if (!customers.length)
        return null;
    return {
        data: customers,
        info: new info_1.default(database
            .select()
            .from(schema_1.customersTable)
            .limit(limit)
            .offset(offset)
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
CustomersRepo.getIndexedCustomers = async (customerId) => {
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const customer = await database
        .select()
        .from(schema_1.customersTable)
        .where((0, expressions_1.eq)(schema_1.customersTable.customerID, customerId));
    if (!customer.length)
        return null;
    return {
        data: customer[0],
        info: new info_1.default(database
            .select()
            .from(schema_1.customersTable)
            .where((0, expressions_1.eq)(schema_1.customersTable.customerID, customerId))
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
