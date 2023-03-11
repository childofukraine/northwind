"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersRepo = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const expressions_1 = require("drizzle-orm/expressions");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const utils_1 = require("../utils/utils");
const info_1 = __importDefault(require("../entities/info"));
dotenv_1.default.config();
const { database } = database_1.default;
class SuppliersRepo {
    static async suppliersCount() {
        const ts = (0, utils_1.getTS)();
        const startExec = Date.now();
        const count = await database
            .select({
            count: (0, drizzle_orm_1.sql) `count(${schema_1.suppliersTable.supplierID})`,
        })
            .from(schema_1.suppliersTable);
        if (!count.length)
            return null;
        return {
            data: +count[0].count,
            info: new info_1.default(database
                .select({
                count: (0, drizzle_orm_1.sql) `count(${schema_1.suppliersTable.supplierID})`,
            })
                .from(schema_1.suppliersTable)
                .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
        };
    }
}
exports.SuppliersRepo = SuppliersRepo;
_a = SuppliersRepo;
SuppliersRepo.getAllSuppliers = async (page) => {
    const limit = +process.env.LIMIT;
    const offset = limit * (+page - 1);
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const suppliers = await database
        .select()
        .from(schema_1.suppliersTable)
        .limit(limit)
        .offset(offset);
    if (!suppliers.length)
        return null;
    return {
        data: suppliers,
        info: new info_1.default(database
            .select()
            .from(schema_1.suppliersTable)
            .limit(limit)
            .offset(offset)
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
SuppliersRepo.getIndexedSuppliers = async (supplierId) => {
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const supplier = await database
        .select()
        .from(schema_1.suppliersTable)
        .where((0, expressions_1.eq)(schema_1.suppliersTable.supplierID, supplierId));
    if (!supplier.length)
        return null;
    return {
        data: supplier[0],
        info: new info_1.default(database
            .select()
            .from(schema_1.suppliersTable)
            .where((0, expressions_1.eq)(schema_1.suppliersTable.supplierID, supplierId))
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
