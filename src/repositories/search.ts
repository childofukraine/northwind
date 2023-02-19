import { badRequest } from "@hapi/boom";
import { ilike, or } from "drizzle-orm/expressions";
import db from "../db/database";
import { customersTable, productsTable } from "../db/schema";
import { CustomersResponse, ProductsResponse } from "../types";
import { executeQueryTime, getTS } from "../utils/utils";

const { database } = db;

export class Search {
  static searchProducts = async (
    keyword: string
  ): Promise<ProductsResponse | string | undefined> => {
    try {
      const queryTS = getTS();
      const startQueryTime = Date.now();
      const product = await database
        .select(productsTable)
        .where(ilike(productsTable.productName, `%${keyword}%`));

      const endQueryTime = Date.now();

      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);
      if (!product.length)
        return badRequest("Product not found").output.payload.message;
      const response = {
        data: product,
        queryInfo: {
          queryString: database
            .select(productsTable)
            .where(ilike(productsTable.productName, `%${keyword}%`))
            .toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "SearchProducts error in database,error message: " + err.message
        );
      }
    }
  };

  static searchCustomers = async (
    keyword: string
  ): Promise<CustomersResponse | string | undefined> => {
    try {
      const queryTS = getTS();

      const startQueryTime = Date.now();
      const customers = await database
        .select(customersTable)
        .where(
          or(
            ilike(customersTable.companyName, `%${keyword}%`),
            ilike(customersTable.contactName, `%${keyword}%`),
            ilike(customersTable.contactTitle, `%${keyword}%`),
            ilike(customersTable.address, `%${keyword}%`)
          )
        );

      const endQueryTime = Date.now();

      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);
      if (!customers.length)
        return badRequest("Customer not found").output.payload.message;
      const response = {
        data: customers,
        queryInfo: {
          queryString: database
            .select(customersTable)
            .where(
              or(
                ilike(customersTable.companyName, `%${keyword}%`),
                ilike(customersTable.contactName, `%${keyword}%`),
                ilike(customersTable.contactTitle, `%${keyword}%`),
                ilike(customersTable.address, `%${keyword}%`)
              )
            )
            .toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "SearchCustomers error in database,error message: " + err.message
        );
      }
    }
  };
}
