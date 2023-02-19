import { badRequest } from "@hapi/boom";
import { eq } from "drizzle-orm/expressions";
import db from "../db/database";
import { suppliersTable } from "../db/schema";
import { SuppliersResponse } from "../types";
import { executeQueryTime, getTS } from "../utils/utils";

const { database } = db;

export class Suppliers {
  static getAllSuppliers = async (): Promise<SuppliersResponse | undefined> => {
    try {
      const queryTS = getTS();
      const startQueryTime = Date.now();
      const suppliers = await database.select(suppliersTable);
      const endQueryTime = Date.now();

      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);

      const response = {
        data: suppliers,
        queryInfo: {
          queryString: database.select(suppliersTable).toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetAllSuppliers error in database,error message: " + err.message
        );
      }
    }
  };

  static getIndexedSuppliers = async (
    supplierId: number
  ): Promise<SuppliersResponse | undefined | string> => {
    try {
      const queryTS = getTS();
      const startQueryTime = Date.now();
      const supplier = await database
        .select(suppliersTable)
        .where(eq(suppliersTable.supplierID, supplierId));
      const endQueryTime = Date.now();
      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);
      if (!supplier.length)
        return badRequest("No such supplier").output.payload.message;
      const response = {
        data: supplier,
        queryInfo: {
          queryString: database
            .select(suppliersTable)
            .where(eq(suppliersTable.supplierID, supplierId))
            .toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetIndexedSuppliers error in database,error message: " + err.message
        );
      }
    }
  };
}
