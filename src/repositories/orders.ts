import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";
import db from "../db/database";
import { orderDetailsTable, ordersTable, shippersTable } from "../db/schema";
import Info from "../entities/info";
import { OrderByIDInfo, OrderInfo } from "../types";
import { calcExecutionTime, getTS, workerId } from "../utils/utils";

const { database } = db;

export class OrdersRepo {
  static async ordersCount(): Promise<{ data: number; info: Info } | null> {
    const ts = getTS();
    const startExec = Date.now();

    const count = await database
      .select({
        count: sql<number>`count(${ordersTable.orderID})`,
      })
      .from(ordersTable);

    if (!count.length) return null;

    return {
      data: +count[0].count,
      info: new Info(
        database
          .select({
            count: sql<number>`count(${ordersTable.orderID})`,
          })
          .from(ordersTable)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  }

  static getAllOrders = async (
    page: number
  ): Promise<{ data: OrderInfo[]; info: Info } | null> => {
    const limit = +(process.env.LIMIT as string);
    const offset = limit * (+page - 1);

    const ts = getTS();
    const startExec = Date.now();
    const orders = await database
      .select({
        orderID: ordersTable.orderID,
        totalProductPrice: sql<string>`sum(${orderDetailsTable.unitPrice} * ${orderDetailsTable.quantity})`,
        totalProductsItems: sql<string>`sum(${orderDetailsTable.quantity})`,
        totalProductsQuantity: sql<string>`count(${orderDetailsTable.orderID})`,
        shippedDate: ordersTable.shippedDate,
        shipName: ordersTable.shipName,
        shipCity: ordersTable.shipCity,
        shipCountry: ordersTable.shipCountry,
      })
      .from(ordersTable)
      .leftJoin(
        orderDetailsTable,
        eq(ordersTable.orderID, orderDetailsTable.orderID)
      )
      .limit(limit)
      .offset(offset)
      .groupBy(ordersTable.orderID);

    if (!orders.length) return null;

    return {
      data: orders,
      info: new Info(
        database
          .select({
            orderID: ordersTable.orderID,
            totalProductPrice: sql<string>`sum(${orderDetailsTable.unitPrice} * ${orderDetailsTable.quantity})`,
            totalProductsItems: sql<string>`sum(${orderDetailsTable.quantity})`,
            totalProductsQuantity: sql<string>`count(${orderDetailsTable.orderID})`,
            shippedDate: ordersTable.shippedDate,
            shipName: ordersTable.shipName,
            shipCity: ordersTable.shipCity,
            shipCountry: ordersTable.shipCountry,
          })
          .from(ordersTable)
          .leftJoin(
            orderDetailsTable,
            eq(ordersTable.orderID, orderDetailsTable.orderID)
          )
          .limit(limit)
          .offset(offset)
          .groupBy(ordersTable.orderID)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };

  static getIndexedOrders = async (
    orderId: number
  ): Promise<{ data: OrderByIDInfo; info: Info } | null> => {
    const ts = getTS();
    const startExec = Date.now();

    const order = await database
      .select({
        orderID: ordersTable.orderID,
        totalProductDiscount: sql<string>`sum(${orderDetailsTable.unitPrice} * ${orderDetailsTable.discount} * ${orderDetailsTable.quantity})`,
        totalProductPrice: sql<string>`sum(${orderDetailsTable.unitPrice} * ${orderDetailsTable.quantity})`,
        totalProductsItems: sql<string>`sum(${orderDetailsTable.quantity})`,
        totalProductsQuantity: sql<string>`count(${orderDetailsTable.orderID})`,
        customerID: ordersTable.customerID,
        shippedDate: ordersTable.shippedDate,
        shipName: ordersTable.shipName,
        shipCity: ordersTable.shipCity,
        shipCountry: ordersTable.shipCountry,
        companyName: shippersTable.companyName,
        freight: ordersTable.freight,
        orderDate: ordersTable.orderDate,
        requiredDate: ordersTable.requiredDate,
        shipRegion: ordersTable.shipRegion,
        shipPostalCode: ordersTable.shipPostalCode,
      })
      .from(ordersTable)
      .leftJoin(
        orderDetailsTable,
        eq(ordersTable.orderID, orderDetailsTable.orderID)
      )
      .leftJoin(shippersTable, eq(shippersTable.shipperID, ordersTable.shipVia))
      .where(eq(orderDetailsTable.orderID, orderId))
      .groupBy(ordersTable.orderID, shippersTable.shipperID);

    if (!order.length) return null;

    return {
      data: order[0],
      info: new Info(
        database
          .select({
            orderID: ordersTable.orderID,
            totalProductDiscount: sql<string>`sum(${orderDetailsTable.unitPrice} * ${orderDetailsTable.discount} * ${orderDetailsTable.quantity})`,
            totalProductPrice: sql<string>`sum(${orderDetailsTable.unitPrice} * ${orderDetailsTable.quantity})`,
            totalProductsItems: sql<string>`sum(${orderDetailsTable.quantity})`,
            totalProductsQuantity: sql<string>`count(${orderDetailsTable.orderID})`,
            customerID: ordersTable.customerID,
            shippedDate: ordersTable.shippedDate,
            shipName: ordersTable.shipName,
            shipCity: ordersTable.shipCity,
            shipCountry: ordersTable.shipCountry,
            companyName: shippersTable.companyName,
            freight: ordersTable.freight,
            orderDate: ordersTable.orderDate,
            requiredDate: ordersTable.requiredDate,
            shipRegion: ordersTable.shipRegion,
            shipPostalCode: ordersTable.shipPostalCode,
          })
          .from(ordersTable)
          .leftJoin(
            orderDetailsTable,
            eq(ordersTable.orderID, orderDetailsTable.orderID)
          )
          .leftJoin(
            shippersTable,
            eq(shippersTable.shipperID, ordersTable.shipVia)
          )
          .where(eq(orderDetailsTable.orderID, orderId))
          .groupBy(ordersTable.orderID, shippersTable.shipperID)
          .toSQL().sql,
        ts,
        calcExecutionTime(startExec, Date.now()),
        workerId
      ),
    };
  };
}
