"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRepo = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const expressions_1 = require("drizzle-orm/expressions");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const info_1 = __importDefault(require("../entities/info"));
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class OrdersRepo {
    static async ordersCount() {
        const ts = (0, utils_1.getTS)();
        const startExec = Date.now();
        const count = await database
            .select({
            count: (0, drizzle_orm_1.sql) `count(${schema_1.ordersTable.orderID})`,
        })
            .from(schema_1.ordersTable);
        if (!count.length)
            return null;
        return {
            data: +count[0].count,
            info: new info_1.default(database
                .select({
                count: (0, drizzle_orm_1.sql) `count(${schema_1.ordersTable.orderID})`,
            })
                .from(schema_1.ordersTable)
                .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
        };
    }
}
exports.OrdersRepo = OrdersRepo;
_a = OrdersRepo;
OrdersRepo.getAllOrders = async (page) => {
    const limit = +process.env.LIMIT;
    const offset = limit * (+page - 1);
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const orders = await database
        .select({
        orderID: schema_1.ordersTable.orderID,
        totalProductPrice: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.unitPrice} * ${schema_1.orderDetailsTable.quantity})`,
        totalProductsItems: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.quantity})`,
        totalProductsQuantity: (0, drizzle_orm_1.sql) `count(${schema_1.orderDetailsTable.orderID})`,
        shippedDate: schema_1.ordersTable.shippedDate,
        shipName: schema_1.ordersTable.shipName,
        shipCity: schema_1.ordersTable.shipCity,
        shipCountry: schema_1.ordersTable.shipCountry,
    })
        .from(schema_1.ordersTable)
        .leftJoin(schema_1.orderDetailsTable, (0, expressions_1.eq)(schema_1.ordersTable.orderID, schema_1.orderDetailsTable.orderID))
        .limit(limit)
        .offset(offset)
        .groupBy(schema_1.ordersTable.orderID);
    if (!orders.length)
        return null;
    return {
        data: orders,
        info: new info_1.default(database
            .select({
            orderID: schema_1.ordersTable.orderID,
            totalProductPrice: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.unitPrice} * ${schema_1.orderDetailsTable.quantity})`,
            totalProductsItems: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.quantity})`,
            totalProductsQuantity: (0, drizzle_orm_1.sql) `count(${schema_1.orderDetailsTable.orderID})`,
            shippedDate: schema_1.ordersTable.shippedDate,
            shipName: schema_1.ordersTable.shipName,
            shipCity: schema_1.ordersTable.shipCity,
            shipCountry: schema_1.ordersTable.shipCountry,
        })
            .from(schema_1.ordersTable)
            .leftJoin(schema_1.orderDetailsTable, (0, expressions_1.eq)(schema_1.ordersTable.orderID, schema_1.orderDetailsTable.orderID))
            .limit(limit)
            .offset(offset)
            .groupBy(schema_1.ordersTable.orderID)
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
OrdersRepo.getIndexedOrders = async (orderId) => {
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const order = await database
        .select({
        orderID: schema_1.ordersTable.orderID,
        totalProductDiscount: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.unitPrice} * ${schema_1.orderDetailsTable.discount} * ${schema_1.orderDetailsTable.quantity})`,
        totalProductPrice: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.unitPrice} * ${schema_1.orderDetailsTable.quantity})`,
        totalProductsItems: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.quantity})`,
        totalProductsQuantity: (0, drizzle_orm_1.sql) `count(${schema_1.orderDetailsTable.orderID})`,
        customerID: schema_1.ordersTable.customerID,
        shippedDate: schema_1.ordersTable.shippedDate,
        shipName: schema_1.ordersTable.shipName,
        shipCity: schema_1.ordersTable.shipCity,
        shipCountry: schema_1.ordersTable.shipCountry,
        companyName: schema_1.shippersTable.companyName,
        freight: schema_1.ordersTable.freight,
        orderDate: schema_1.ordersTable.orderDate,
        requiredDate: schema_1.ordersTable.requiredDate,
        shipRegion: schema_1.ordersTable.shipRegion,
        shipPostalCode: schema_1.ordersTable.shipPostalCode,
    })
        .from(schema_1.ordersTable)
        .leftJoin(schema_1.orderDetailsTable, (0, expressions_1.eq)(schema_1.ordersTable.orderID, schema_1.orderDetailsTable.orderID))
        .leftJoin(schema_1.shippersTable, (0, expressions_1.eq)(schema_1.shippersTable.shipperID, schema_1.ordersTable.shipVia))
        .where((0, expressions_1.eq)(schema_1.orderDetailsTable.orderID, orderId))
        .groupBy(schema_1.ordersTable.orderID, schema_1.shippersTable.shipperID);
    if (!order.length)
        return null;
    return {
        data: order[0],
        info: new info_1.default(database
            .select({
            orderID: schema_1.ordersTable.orderID,
            totalProductDiscount: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.unitPrice} * ${schema_1.orderDetailsTable.discount} * ${schema_1.orderDetailsTable.quantity})`,
            totalProductPrice: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.unitPrice} * ${schema_1.orderDetailsTable.quantity})`,
            totalProductsItems: (0, drizzle_orm_1.sql) `sum(${schema_1.orderDetailsTable.quantity})`,
            totalProductsQuantity: (0, drizzle_orm_1.sql) `count(${schema_1.orderDetailsTable.orderID})`,
            customerID: schema_1.ordersTable.customerID,
            shippedDate: schema_1.ordersTable.shippedDate,
            shipName: schema_1.ordersTable.shipName,
            shipCity: schema_1.ordersTable.shipCity,
            shipCountry: schema_1.ordersTable.shipCountry,
            companyName: schema_1.shippersTable.companyName,
            freight: schema_1.ordersTable.freight,
            orderDate: schema_1.ordersTable.orderDate,
            requiredDate: schema_1.ordersTable.requiredDate,
            shipRegion: schema_1.ordersTable.shipRegion,
            shipPostalCode: schema_1.ordersTable.shipPostalCode,
        })
            .from(schema_1.ordersTable)
            .leftJoin(schema_1.orderDetailsTable, (0, expressions_1.eq)(schema_1.ordersTable.orderID, schema_1.orderDetailsTable.orderID))
            .leftJoin(schema_1.shippersTable, (0, expressions_1.eq)(schema_1.shippersTable.shipperID, schema_1.ordersTable.shipVia))
            .where((0, expressions_1.eq)(schema_1.orderDetailsTable.orderID, orderId))
            .groupBy(schema_1.ordersTable.orderID, schema_1.shippersTable.shipperID)
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
