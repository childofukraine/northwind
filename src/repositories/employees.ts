import { badRequest } from "@hapi/boom";
import { eq } from "drizzle-orm/expressions";
import { alias } from "drizzle-orm/pg-core";
import db from "../db/database";
import { employeesTable } from "../db/schema";
import { EmployeesIndexedResponse, EmployeesResponse } from "../types";
import { executeQueryTime, getTS } from "../utils/utils";

const { database } = db;

export class Employees {
  static getAllEmployees = async (): Promise<EmployeesResponse | undefined> => {
    try {
      const queryTS = getTS();
      const startQueryTime = Date.now();
      const employees = await database.select(employeesTable);
      const endQueryTime = Date.now();
      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);

      const response = {
        data: employees,
        queryInfo: {
          queryString: database.select(employeesTable).toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetAllEmployees error in database,error message: " + err.message
        );
      }
    }
  };

  static getIndexedEmployees = async (
    employeeId: number
  ): Promise<EmployeesIndexedResponse | string | undefined> => {
    try {
      const reportsToTable = alias(employeesTable, "reportsToTable");
      const queryTS = getTS();

      const startQueryTime = Date.now();
      const employee = await database
        .select(employeesTable)
        .leftJoin(
          reportsToTable,
          eq(employeesTable.reportsTo, reportsToTable.employeeID)
        )
        .where(eq(employeesTable.employeeID, employeeId));
      const endQueryTime = Date.now();
      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);
      if (!employee.length)
        return badRequest("No such employee").output.payload.message;
      const response = {
        data: employee,
        queryInfo: {
          queryString: database
            .select(employeesTable)
            .leftJoin(
              reportsToTable,
              eq(employeesTable.reportsTo, reportsToTable.employeeID)
            )
            .where(eq(employeesTable.employeeID, employeeId))
            .toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetIndexedEmployees error in database,error message: " + err.message
        );
      }
    }
  };
}
