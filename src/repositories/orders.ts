import { badRequest } from "@hapi/boom";
import { sql } from "drizzle-orm";
import db from "../db/database";
import { ordersTable } from "../db/schema";
import {
  OrderInfo,
  OrdersIndexedResponse,
  OrdersResponse,
  ProductsInOrder,
} from "../types";
import { executeQueryTime, getTS } from "../utils/utils";

const { database } = db;

export class Orders {
  static getAllOrders = async (): Promise<OrdersResponse | undefined> => {
    try {
      const queryTS = getTS();
      const startQueryTime = Date.now();
      const orders = await database.select(ordersTable);
      const endQueryTime = Date.now();
      const queryExecutionTime = executeQueryTime(startQueryTime, endQueryTime);

      const response = {
        data: orders,
        queryInfo: {
          queryString: database.select(ordersTable).toSQL().sql,
          queryTS,
          queryExecutionTime,
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetAllOrders error in database,error message: " + err.message
        );
      }
    }
  };

  static getIndexedOrders = async (
    orderId: number
  ): Promise<OrdersIndexedResponse | string | undefined> => {
    try {
      const queryOrderInfoString = `
          SELECT
          SUM(OrdDet."UnitPrice" * OrdDet."Discount" * OrdDet."Quantity") AS Total_Products_Discount, 
          SUM(OrdDet."UnitPrice" * OrdDet."Quantity") AS Total_Products_Price, 
          SUM(OrdDet."Quantity") AS Total_Products_Items, 
          COUNT(OrdDet."OrderID") AS Total_Products, 
          Ord."CustomerID", 
          Ord."OrderID", 
          Ord."ShippedDate", 
          Ord."ShipName", 
          Ord."ShipCity", 
          Shp."CompanyName", 
          Ord."ShipCountry", 
          Ord."Freight",
          Ord."OrderDate", 
          Ord."RequiredDate",
          Ord."ShipRegion", 
          Ord."ShipPostalCode"
          FROM order_details OrdDet, Orders Ord, Shippers Shp
          WHERE OrdDet."OrderID" = Ord."OrderID" AND Ord."ShipVia" = Shp."ShipperID" AND Ord."OrderID" = ${orderId}
          group by Ord."OrderID", Shp."ShipperID"
        `;

      const queryProductsInOrderString = `
          SELECT
          OrdDet."ProductID",
          Prd."ProductName",
          OrdDet."Quantity",
          OrdDet."UnitPrice",
          (OrdDet."UnitPrice" * OrdDet."Quantity") AS Total_Products_Price,
          OrdDet."Discount"
          FROM order_details OrdDet, Products Prd
          WHERE OrdDet."ProductID" = Prd."ProductID" AND OrdDet."OrderID" = ${orderId}
        `;

      const queryTS = getTS();
      const startQueryOrderInfoTime = Date.now();
      const order = await database.execute<OrderInfo>(sql`
          SELECT
          SUM(OrdDet."UnitPrice" * OrdDet."Discount" * OrdDet."Quantity") AS Total_Products_Discount, 
          SUM(OrdDet."UnitPrice" * OrdDet."Quantity") AS Total_Products_Price, 
          SUM(OrdDet."Quantity") AS Total_Products_Items, 
          COUNT(OrdDet."OrderID") AS Total_Products, 
          Ord."CustomerID", 
          Ord."OrderID", 
          Ord."ShippedDate", 
          Ord."ShipName", 
          Ord."ShipCity", 
          Shp."CompanyName", 
          Ord."ShipCountry", 
          Ord."Freight",
          Ord."OrderDate", 
          Ord."RequiredDate",
          Ord."ShipRegion", 
          Ord."ShipPostalCode"
          FROM order_details OrdDet, Orders Ord, Shippers Shp
          WHERE OrdDet."OrderID" = Ord."OrderID" AND Ord."ShipVia" = Shp."ShipperID" AND Ord."OrderID" = ${orderId}
          group by Ord."OrderID", Shp."ShipperID"
          `);
      const endQueryOrderInfoTime = Date.now();
      const queryOrderInfoTimeExecutionTime = executeQueryTime(
        startQueryOrderInfoTime,
        endQueryOrderInfoTime
      );

      const startQueryProductsInOrderTime = Date.now();
      const products = await database.execute<ProductsInOrder>(sql`SELECT
          OrdDet."ProductID",
          Prd."ProductName",
          OrdDet."Quantity",
          OrdDet."UnitPrice",
          (OrdDet."UnitPrice" * OrdDet."Quantity") AS Total_Products_Price,
          OrdDet."Discount"
          FROM order_details OrdDet, Products Prd
          WHERE OrdDet."ProductID" = Prd."ProductID" AND OrdDet."OrderID" = ${orderId}`);

      const endProductsInOrderTime = Date.now();

      const queryProductsInOrderTimeExecutionTime = executeQueryTime(
        startQueryProductsInOrderTime,
        endProductsInOrderTime
      );

      if (!order.rows.length)
        return badRequest("No such order").output.payload.message;
      const response = {
        data: {
          orderInfo: order.rows,
          productsInfo: products.rows,
        },
        queryInfo: {
          orderInfo: {
            queryString: queryOrderInfoString,
            queryTS,
            queryExecutionTime: queryOrderInfoTimeExecutionTime,
          },
          productsInOrder: {
            queryString: queryProductsInOrderString,
            queryTS,
            queryExecutionTime: queryProductsInOrderTimeExecutionTime,
          },
        },
      };
      return response;
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "GetIndexedOrders error in database,error message: " + err.message
        );
      }
    }
  };
}
