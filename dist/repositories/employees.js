"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesRepo = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const expressions_1 = require("drizzle-orm/expressions");
const pg_core_1 = require("drizzle-orm/pg-core");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const info_1 = __importDefault(require("../entities/info"));
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class EmployeesRepo {
    static async employeesCount() {
        const ts = (0, utils_1.getTS)();
        const startExec = Date.now();
        const count = await database
            .select({
            count: (0, drizzle_orm_1.sql) `count(${schema_1.employeesTable.employeeID})`,
        })
            .from(schema_1.employeesTable);
        if (!count.length)
            return null;
        return {
            data: +count[0].count,
            info: new info_1.default(database
                .select({
                count: (0, drizzle_orm_1.sql) `count(${schema_1.employeesTable.employeeID})`,
            })
                .from(schema_1.employeesTable)
                .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
        };
    }
}
exports.EmployeesRepo = EmployeesRepo;
_a = EmployeesRepo;
EmployeesRepo.getAllEmployees = async (page) => {
    const limit = +process.env.LIMIT;
    const offset = limit * (+page - 1);
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const employees = await database
        .select()
        .from(schema_1.employeesTable)
        .limit(limit)
        .offset(offset);
    if (!employees.length)
        return null;
    return {
        data: employees,
        info: new info_1.default(database
            .select()
            .from(schema_1.employeesTable)
            .limit(limit)
            .offset(offset)
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
EmployeesRepo.getIndexedEmployees = async (employeeId) => {
    const reportsToTable = (0, pg_core_1.alias)(schema_1.employeesTable, "reportsToTable");
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const employee = await database
        .select()
        .from(schema_1.employeesTable)
        .leftJoin(reportsToTable, (0, expressions_1.eq)(schema_1.employeesTable.reportsTo, reportsToTable.employeeID))
        .where((0, expressions_1.eq)(schema_1.employeesTable.employeeID, employeeId));
    if (!employee.length)
        return null;
    return {
        data: employee[0],
        info: new info_1.default(database
            .select()
            .from(schema_1.employeesTable)
            .leftJoin(reportsToTable, (0, expressions_1.eq)(schema_1.employeesTable.reportsTo, reportsToTable.employeeID))
            .where((0, expressions_1.eq)(schema_1.employeesTable.employeeID, employeeId))
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
