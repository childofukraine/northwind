import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import db from "../db/database";
import {
  orderDetailsTable,
  Products,
  productsTable,
  suppliersTable,
} from "../db/schema";
import Info from "../entities/info";
import { ProductInOrder, ProductWithSupplier } from "../types";
import { calcExecutionTime, getTS, workerId } from "../utils/utils";

const { database } = db;

export class ProductsRepo {
  static async productsCount(): Promise<{ data: number; info: Info } | null> {
    const ts = getTS();
    const startExec = Date.now();

    const count = await database
      .select({
        count: sql<number>`count(${productsTable.productID})`,
      })
      .from(productsTable);

    if (!count.length) return null;

    return {
      data: +count[0].count,
      info: new Info(
        database
          .select({
            count: sql<number>`count(${productsTable.productID})`,
          })
          .from(productsTable)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  }

  static getProductsInOrderByOrderID = async (
    orderId: number
  ): Promise<{ data: ProductInOrder[]; info: Info }> => {
    const ts = getTS();
    const startExec = Date.now();

    const products = await database
      .select({
        productID: orderDetailsTable.productID,
        productName: productsTable.productName,
        quantity: orderDetailsTable.quantity,
        unitPrice: orderDetailsTable.unitPrice,
        totalProductPrice: sql<string>`(${orderDetailsTable.unitPrice} * ${orderDetailsTable.quantity})`,
        discount: orderDetailsTable.discount,
      })
      .from(orderDetailsTable)
      .leftJoin(
        productsTable,
        eq(productsTable.productID, orderDetailsTable.productID)
      )
      .where(eq(orderDetailsTable.orderID, orderId));

    return {
      data: products,
      info: new Info(
        database
          .select({
            productID: orderDetailsTable.productID,
            productName: productsTable.productName,
            quantity: orderDetailsTable.quantity,
            unitPrice: orderDetailsTable.unitPrice,
            totalProductPrice: sql<string>`(${orderDetailsTable.unitPrice} * ${orderDetailsTable.quantity})`,
            discount: orderDetailsTable.discount,
          })
          .from(orderDetailsTable)
          .leftJoin(
            productsTable,
            eq(productsTable.productID, orderDetailsTable.productID)
          )
          .where(eq(orderDetailsTable.orderID, orderId))
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };

  static getAllProducts = async (
    page: number
  ): Promise<{ data: Products[]; info: Info } | null> => {
    const limit = +(process.env.LIMIT as string);
    const offset = limit * (+page - 1);

    const ts = getTS();
    const startExec = Date.now();
    const products = await database
      .select()
      .from(productsTable)
      .limit(limit)
      .offset(offset);

    if (!products.length) return null;

    return {
      data: products,
      info: new Info(
        database
          .select()
          .from(productsTable)
          .limit(limit)
          .offset(offset)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };
  static getIndexedProducts = async (
    productId: number
  ): Promise<{ data: ProductWithSupplier; info: Info } | null> => {
    const ts = getTS();
    const startExec = Date.now();

    const product = await database
      .select()
      .from(productsTable)
      .leftJoin(
        suppliersTable,
        eq(suppliersTable.supplierID, productsTable.supplierID)
      )
      .where(eq(productsTable.productID, productId));

    if (!product.length) return null;

    return {
      data: product[0],
      info: new Info(
        database
          .select()
          .from(productsTable)
          .leftJoin(
            suppliersTable,
            eq(suppliersTable.supplierID, productsTable.supplierID)
          )
          .where(eq(productsTable.productID, productId))
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };
}
