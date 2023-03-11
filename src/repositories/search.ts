import { ilike, or } from "drizzle-orm/expressions";
import db from "../db/database";
import {
  Customers,
  customersTable,
  Products,
  productsTable,
} from "../db/schema";
import Info from "../entities/info";
import { calcExecutionTime, getTS, workerId } from "../utils/utils";

const { database } = db;

export class SearchRepo {
  static searchProducts = async (
    keyword: string
  ): Promise<{
    data: Products[];
    info: Info;
  } | null> => {
    const ts = getTS();
    const startExec = Date.now();

    const products = await database
      .select()
      .from(productsTable)
      .where(ilike(productsTable.productName, `%${keyword}%`));

    if (!products.length) return null;

    return {
      data: products,
      info: new Info(
        database
          .select()
          .from(productsTable)
          .where(ilike(productsTable.productName, `%${keyword}%`))
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };

  static searchCustomers = async (
    keyword: string
  ): Promise<{
    data: Customers[];
    info: Info;
  } | null> => {
    const ts = getTS();
    const startExec = Date.now();

    const customers = await database
      .select()
      .from(customersTable)
      .where(
        or(
          ilike(customersTable.companyName, `%${keyword}%`),
          ilike(customersTable.contactName, `%${keyword}%`),
          ilike(customersTable.contactTitle, `%${keyword}%`),
          ilike(customersTable.address, `%${keyword}%`)
        )
      );

    if (!customers.length) return null;

    return {
      data: customers,
      info: new Info(
        database
          .select()
          .from(customersTable)
          .where(
            or(
              ilike(customersTable.companyName, `%${keyword}%`),
              ilike(customersTable.contactName, `%${keyword}%`),
              ilike(customersTable.contactTitle, `%${keyword}%`),
              ilike(customersTable.address, `%${keyword}%`)
            )
          )
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };
}
