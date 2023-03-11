import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import db from "../db/database";
import { Customers, customersTable } from "../db/schema";
import Info from "../entities/info";
import { calcExecutionTime, getTS, workerId } from "../utils/utils";

const { database } = db;

export class CustomersRepo {
  static async customersCount(): Promise<{ data: number; info: Info } | null> {
    const ts = getTS();
    const startExec = Date.now();

    const count = await database
      .select({
        count: sql<number>`count(${customersTable.customerID})`,
      })
      .from(customersTable);

    if (!count.length) return null;

    return {
      data: +count[0].count,
      info: new Info(
        database
          .select({
            count: sql<number>`count(${customersTable.customerID})`,
          })
          .from(customersTable)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  }

  static getAllCustomers = async (
    page: number
  ): Promise<{ data: Customers[]; info: Info } | null> => {
    const limit = +(process.env.LIMIT as string);
    const offset = limit * (+page - 1);

    const ts = getTS();
    const startExec = Date.now();
    const customers = await database
      .select()
      .from(customersTable)
      .limit(limit)
      .offset(offset);

    if (!customers.length) return null;

    return {
      data: customers,
      info: new Info(
        database
          .select()
          .from(customersTable)
          .limit(limit)
          .offset(offset)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };
  static getIndexedCustomers = async (
    customerId: string
  ): Promise<{ data: Customers; info: Info } | null> => {
    const ts = getTS();
    const startExec = Date.now();

    const customer = await database
      .select()
      .from(customersTable)
      .where(eq(customersTable.customerID, customerId));

    if (!customer.length) return null;

    return {
      data: customer[0],
      info: new Info(
        database
          .select()
          .from(customersTable)
          .where(eq(customersTable.customerID, customerId))
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };
}
