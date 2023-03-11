import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import { alias } from "drizzle-orm/pg-core";
import db from "../db/database";
import { Employees, employeesTable } from "../db/schema";
import Info from "../entities/info";
import { FullEmployeeData } from "../types";
import { calcExecutionTime, getTS, workerId } from "../utils/utils";

const { database } = db;

export class EmployeesRepo {
  static async employeesCount(): Promise<{ data: number; info: Info } | null> {
    const ts = getTS();
    const startExec = Date.now();

    const count = await database
      .select({
        count: sql<number>`count(${employeesTable.employeeID})`,
      })
      .from(employeesTable);

    if (!count.length) return null;

    return {
      data: +count[0].count,
      info: new Info(
        database
          .select({
            count: sql<number>`count(${employeesTable.employeeID})`,
          })
          .from(employeesTable)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  }

  static getAllEmployees = async (
    page: number
  ): Promise<{ data: Employees[]; info: Info } | null> => {
    const limit = +(process.env.LIMIT as string);
    const offset = limit * (+page - 1);

    const ts = getTS();
    const startExec = Date.now();

    const employees = await database
      .select()
      .from(employeesTable)
      .limit(limit)
      .offset(offset);

    if (!employees.length) return null;

    return {
      data: employees,
      info: new Info(
        database
          .select()
          .from(employeesTable)
          .limit(limit)
          .offset(offset)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };

  static getIndexedEmployees = async (
    employeeId: number
  ): Promise<{ data: FullEmployeeData; info: Info } | null> => {
    const reportsToTable = alias(employeesTable, "reportsToTable");

    const ts = getTS();
    const startExec = Date.now();

    const employee = await database
      .select()
      .from(employeesTable)
      .leftJoin(
        reportsToTable,
        eq(employeesTable.reportsTo, reportsToTable.employeeID)
      )
      .where(eq(employeesTable.employeeID, employeeId));

    if (!employee.length) return null;

    return {
      data: employee[0],
      info: new Info(
        database
          .select()
          .from(employeesTable)
          .leftJoin(
            reportsToTable,
            eq(employeesTable.reportsTo, reportsToTable.employeeID)
          )
          .where(eq(employeesTable.employeeID, employeeId))
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };
}
