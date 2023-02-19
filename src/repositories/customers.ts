import { badRequest } from "@hapi/boom";
import { eq } from "drizzle-orm/expressions";
import db from "../db/database";
import { customersTable } from "../db/schema";
import { CustomersResponse } from "../types";
import { executeQueryTime, getTS } from "../utils/utils";

const { database } = db;

export class Customers {
  static getAllCustomers = async (): Promise<CustomersResponse | undefined> => {
    try {
      const queryTS = getTS();
      const startQueryTime = Date.now();
      const customers = await database.select(customersTable);
      const endQueryTime = Date.now();
      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);

      const response = {
        data: customers,
        queryInfo: {
          queryString: database.select(customersTable).toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetAllCustomers error in database,error message: " + err.message
        );
      }
    }
  };

  static getIndexedCustomers = async (
    customerId: string
  ): Promise<CustomersResponse | undefined | string> => {
    try {
      const queryTS = getTS();
      const startQueryTime = Date.now();
      const customer = await database
        .select(customersTable)
        .where(eq(customersTable.customerID, customerId));
      const endQueryTime = Date.now();
      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);
      if (!customer.length)
        return badRequest("No such customer").output.payload.message;
      const response = {
        data: customer,
        queryInfo: {
          queryString: database
            .select(customersTable)
            .where(eq(customersTable.customerID, customerId))
            .toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetIndexedCustomers error in database,error message: " + err.message
        );
      }
    }
  };
}
