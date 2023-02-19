"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const boom_1 = require("@hapi/boom");
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class Orders {
}
exports.Orders = Orders;
_a = Orders;
Orders.getAllOrders = async () => {
    try {
        const queryTS = (0, utils_1.getTS)();
        const startQueryTime = Date.now();
        const orders = await database.select(schema_1.ordersTable);
        const endQueryTime = Date.now();
        const queryExecutionTime = (0, utils_1.executeQueryTime)(startQueryTime, endQueryTime);
        const response = {
            data: orders,
            queryInfo: {
                queryString: database.select(schema_1.ordersTable).toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        return response;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetAllOrders error in database,error message: " + err.message);
        }
    }
};
Orders.getIndexedOrders = async (orderId) => {
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
        const queryTS = (0, utils_1.getTS)();
        const startQueryOrderInfoTime = Date.now();
        const order = await database.execute((0, drizzle_orm_1.sql) `
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
        const queryOrderInfoTimeExecutionTime = (0, utils_1.executeQueryTime)(startQueryOrderInfoTime, endQueryOrderInfoTime);
        const startQueryProductsInOrderTime = Date.now();
        const products = await database.execute((0, drizzle_orm_1.sql) `SELECT
          OrdDet."ProductID",
          Prd."ProductName",
          OrdDet."Quantity",
          OrdDet."UnitPrice",
          (OrdDet."UnitPrice" * OrdDet."Quantity") AS Total_Products_Price,
          OrdDet."Discount"
          FROM order_details OrdDet, Products Prd
          WHERE OrdDet."ProductID" = Prd."ProductID" AND OrdDet."OrderID" = ${orderId}`);
        const endProductsInOrderTime = Date.now();
        const queryProductsInOrderTimeExecutionTime = (0, utils_1.executeQueryTime)(startQueryProductsInOrderTime, endProductsInOrderTime);
        if (!order.rows.length)
            return (0, boom_1.badRequest)("No such order").output.payload.message;
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
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("GetIndexedOrders error in database,error message: " + err.message);
        }
    }
};
