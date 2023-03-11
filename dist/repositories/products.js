"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepo = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const expressions_1 = require("drizzle-orm/expressions");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const info_1 = __importDefault(require("../entities/info"));
const utils_1 = require("../utils/utils");
const { database } = database_1.default;
class ProductsRepo {
    static async productsCount() {
        const ts = (0, utils_1.getTS)();
        const startExec = Date.now();
        const count = await database
            .select({
            count: (0, drizzle_orm_1.sql) `count(${schema_1.productsTable.productID})`,
        })
            .from(schema_1.productsTable);
        if (!count.length)
            return null;
        return {
            data: +count[0].count,
            info: new info_1.default(database
                .select({
                count: (0, drizzle_orm_1.sql) `count(${schema_1.productsTable.productID})`,
            })
                .from(schema_1.productsTable)
                .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
        };
    }
}
exports.ProductsRepo = ProductsRepo;
_a = ProductsRepo;
ProductsRepo.getProductsInOrderByOrderID = async (orderId) => {
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const products = await database
        .select({
        productID: schema_1.orderDetailsTable.productID,
        productName: schema_1.productsTable.productName,
        quantity: schema_1.orderDetailsTable.quantity,
        unitPrice: schema_1.orderDetailsTable.unitPrice,
        totalProductPrice: (0, drizzle_orm_1.sql) `(${schema_1.orderDetailsTable.unitPrice} * ${schema_1.orderDetailsTable.quantity})`,
        discount: schema_1.orderDetailsTable.discount,
    })
        .from(schema_1.orderDetailsTable)
        .leftJoin(schema_1.productsTable, (0, expressions_1.eq)(schema_1.productsTable.productID, schema_1.orderDetailsTable.productID))
        .where((0, expressions_1.eq)(schema_1.orderDetailsTable.orderID, orderId));
    return {
        data: products,
        info: new info_1.default(database
            .select({
            productID: schema_1.orderDetailsTable.productID,
            productName: schema_1.productsTable.productName,
            quantity: schema_1.orderDetailsTable.quantity,
            unitPrice: schema_1.orderDetailsTable.unitPrice,
            totalProductPrice: (0, drizzle_orm_1.sql) `(${schema_1.orderDetailsTable.unitPrice} * ${schema_1.orderDetailsTable.quantity})`,
            discount: schema_1.orderDetailsTable.discount,
        })
            .from(schema_1.orderDetailsTable)
            .leftJoin(schema_1.productsTable, (0, expressions_1.eq)(schema_1.productsTable.productID, schema_1.orderDetailsTable.productID))
            .where((0, expressions_1.eq)(schema_1.orderDetailsTable.orderID, orderId))
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
ProductsRepo.getAllProducts = async (page) => {
    const limit = +process.env.LIMIT;
    const offset = limit * (+page - 1);
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const products = await database
        .select()
        .from(schema_1.productsTable)
        .limit(limit)
        .offset(offset);
    if (!products.length)
        return null;
    return {
        data: products,
        info: new info_1.default(database
            .select()
            .from(schema_1.productsTable)
            .limit(limit)
            .offset(offset)
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
ProductsRepo.getIndexedProducts = async (productId) => {
    const ts = (0, utils_1.getTS)();
    const startExec = Date.now();
    const product = await database
        .select()
        .from(schema_1.productsTable)
        .leftJoin(schema_1.suppliersTable, (0, expressions_1.eq)(schema_1.suppliersTable.supplierID, schema_1.productsTable.supplierID))
        .where((0, expressions_1.eq)(schema_1.productsTable.productID, productId));
    if (!product.length)
        return null;
    return {
        data: product[0],
        info: new info_1.default(database
            .select()
            .from(schema_1.productsTable)
            .leftJoin(schema_1.suppliersTable, (0, expressions_1.eq)(schema_1.suppliersTable.supplierID, schema_1.productsTable.supplierID))
            .where((0, expressions_1.eq)(schema_1.productsTable.productID, productId))
            .toSQL().sql, ts, (0, utils_1.calcExecutionTime)(startExec, Date.now()), utils_1.workerId),
    };
};
