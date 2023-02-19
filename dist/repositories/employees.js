"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employees = void 0;
const boom_1 = require("@hapi/boom");
const expressions_1 = require("drizzle-orm/expressions");
const pg_core_1 = require("drizzle-orm/pg-core");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class Employees {
}
exports.Employees = Employees;
_a = Employees;
Employees.getAllEmployees = async () => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const employees = await database.select(schema_1.employeesTable);
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        const response = {
            data: employees,
            queryInfo: {
                queryString: database.select(schema_1.employeesTable).toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetAllEmployees error in database,error message: " + err.message);
        }
    }
};
Employees.getIndexedEmployees = async (employeeId) => {
    try {
        const reportsToTable = (0, pg_core_1.alias)(schema_1.employeesTable, "reportsToTable");
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const employee = await database
            .select(schema_1.employeesTable)
            .leftJoin(reportsToTable, (0, expressions_1.eq)(schema_1.employeesTable.reportsTo, reportsToTable.employeeID))
            .where((0, expressions_1.eq)(schema_1.employeesTable.employeeID, employeeId));
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        if (!employee.length)
            return (0, boom_1.badRequest)("No such employee").output.payload.message;
        const response = {
            data: employee,
            queryInfo: {
                queryString: database
                    .select(schema_1.employeesTable)
                    .leftJoin(reportsToTable, (0, expressions_1.eq)(schema_1.employeesTable.reportsTo, reportsToTable.employeeID))
                    .where((0, expressions_1.eq)(schema_1.employeesTable.employeeID, employeeId))
                    .toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetIndexedEmployees error in database,error message: " + err.message);
        }
    }
};
