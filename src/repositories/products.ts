import { badRequest } from "@hapi/boom";
import { eq } from "drizzle-orm/expressions";
import db from "../db/database";
import { productsTable, suppliersTable } from "../db/schema";
import { ProductsResponse, ProductsIndexedResponse } from "../types";
import { executeQueryTime, getTS } from "../utils/utils";

const { database } = db;

export class Products {
  static getAllProducts = async (): Promise<ProductsResponse | undefined> => {
    try {
      const queryTS = getTS();
      const startQueryTime = Date.now();
      const products = await database.select(productsTable);
      const endQueryTime = Date.now();
      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);

      const response = {
        data: products,
        queryInfo: {
          queryString: database.select(productsTable).toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetAllProducts error in database,error message: " + err.message
        );
      }
    }
  };

  static getIndexedProducts = async (
    productId: number
  ): Promise<ProductsIndexedResponse | undefined | string> => {
    try {
      const queryTS = getTS();
      const startQueryTime = Date.now();
      const product = await database
        .select(productsTable)
        .leftJoin(
          suppliersTable,
          eq(productsTable.productID, suppliersTable.supplierID)
        )
        .where(eq(productsTable.productID, productId));
      const endQueryTime = Date.now();
      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);

      if (!product.length)
        return badRequest("No such product").output.payload.message;
      const response = {
        data: product,
        queryInfo: {
          queryString: database
            .select(productsTable)
            .leftJoin(
              suppliersTable,
              eq(productsTable.supplierID, suppliersTable.supplierID)
            )
            .where(eq(productsTable.productID, productId))
            .toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetIndexedProducts error in database,error message: " + err.message
        );
      }
    }
  };
}
