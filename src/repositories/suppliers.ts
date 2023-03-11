import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import dotenv from "dotenv";
import db from "../db/database";
import { Suppliers, suppliersTable } from "../db/schema";
import { calcExecutionTime, getTS, workerId } from "../utils/utils";
import Info from "../entities/info";

dotenv.config();

const { database } = db;

export class SuppliersRepo {
  static async suppliersCount(): Promise<{ data: number; info: Info } | null> {
    const ts = getTS();
    const startExec = Date.now();

    const count = await database
      .select({
        count: sql<number>`count(${suppliersTable.supplierID})`,
      })
      .from(suppliersTable);

    if (!count.length) return null;

    return {
      data: +count[0].count,
      info: new Info(
        database
          .select({
            count: sql<number>`count(${suppliersTable.supplierID})`,
          })
          .from(suppliersTable)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  }

  static getAllSuppliers = async (
    page: number
  ): Promise<{ data: Suppliers[]; info: Info } | null> => {
    const limit = +(process.env.LIMIT as string);
    const offset = limit * (+page - 1);

    const ts = getTS();
    const startExec = Date.now();

    const suppliers = await database
      .select()
      .from(suppliersTable)
      .limit(limit)
      .offset(offset);

    if (!suppliers.length) return null;

    return {
      data: suppliers,
      info: new Info(
        database
          .select()
          .from(suppliersTable)
          .limit(limit)
          .offset(offset)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };

  static getIndexedSuppliers = async (
    supplierId: number
  ): Promise<{ data: Suppliers; info: Info } | null> => {
    const ts = getTS();
    const startExec = Date.now();

    const supplier = await database
      .select()
      .from(suppliersTable)
      .where(eq(suppliersTable.supplierID, supplierId));

    if (!supplier.length) return null;

    return {
      data: supplier[0],
      info: new Info(
        database
          .select()
          .from(suppliersTable)
          .where(eq(suppliersTable.supplierID, supplierId))
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };
}
