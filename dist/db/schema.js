"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailsTable = exports.productsTable = exports.suppliersTable = exports.ordersTable = exports.employeesTable = exports.customersTable = exports.shippersTable = exports.territoriesTable = exports.regionsTable = exports.categoriesTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.categoriesTable = (0, pg_core_1.pgTable)("categories", {
    categoryID: (0, pg_core_1.integer)("CategoryID").notNull().primaryKey(),
    categoryName: (0, pg_core_1.varchar)("CategoryName", { length: 45 }).notNull(),
    description: (0, pg_core_1.text)("Description"),
});
exports.regionsTable = (0, pg_core_1.pgTable)("regions", {
    regionID: (0, pg_core_1.integer)("RegionID").notNull().primaryKey(),
    regionDescription: (0, pg_core_1.varchar)("RegionDescription", { length: 20 }).notNull(),
});
exports.territoriesTable = (0, pg_core_1.pgTable)("territories", {
    territoryID: (0, pg_core_1.varchar)("TerritoryID", { length: 45 }).notNull().primaryKey(),
    territoryDescription: (0, pg_core_1.varchar)("TerritoryDescription", {
        length: 80,
    }).notNull(),
    regionID: (0, pg_core_1.integer)("RegionID")
        .notNull()
        .references(() => exports.regionsTable.regionID),
});
exports.shippersTable = (0, pg_core_1.pgTable)("shippers", {
    shipperID: (0, pg_core_1.integer)("ShipperID").notNull().primaryKey(),
    companyName: (0, pg_core_1.varchar)("CompanyName", { length: 30 }).notNull(),
    phone: (0, pg_core_1.varchar)("Phone", { length: 30 }),
});
exports.customersTable = (0, pg_core_1.pgTable)("customers", {
    customerID: (0, pg_core_1.varchar)("CustomerID", { length: 15 }).notNull().primaryKey(),
    companyName: (0, pg_core_1.varchar)("CompanyName", { length: 70 }).notNull(),
    contactName: (0, pg_core_1.varchar)("ContactName", { length: 60 }),
    contactTitle: (0, pg_core_1.varchar)("ContactTitle", { length: 60 }),
    address: (0, pg_core_1.varchar)("Address", { length: 100 }),
    city: (0, pg_core_1.varchar)("City", { length: 100 }),
    region: (0, pg_core_1.varchar)("Region", { length: 50 }),
    postalCode: (0, pg_core_1.varchar)("PostalCode", { length: 15 }),
    country: (0, pg_core_1.varchar)("Country", { length: 45 }),
    phone: (0, pg_core_1.varchar)("Phone", { length: 45 }),
    fax: (0, pg_core_1.varchar)("Fax", { length: 45 }),
});
exports.employeesTable = (0, pg_core_1.pgTable)("employees", {
    employeeID: (0, pg_core_1.integer)("EmployeeID").notNull().primaryKey(),
    lastName: (0, pg_core_1.varchar)("LastName", { length: 45 }).notNull(),
    firstName: (0, pg_core_1.varchar)("FirstName", { length: 45 }).notNull(),
    title: (0, pg_core_1.varchar)("Title", { length: 100 }),
    titleOfCourtesy: (0, pg_core_1.varchar)("TitleOfCourtesy", { length: 20 }),
    birthDate: (0, pg_core_1.date)("BirthDate"),
    hireDate: (0, pg_core_1.date)("HireDate"),
    address: (0, pg_core_1.varchar)("Address", { length: 150 }),
    city: (0, pg_core_1.varchar)("City", { length: 20 }),
    region: (0, pg_core_1.varchar)("Region", { length: 45 }),
    postalCode: (0, pg_core_1.varchar)("PostalCode", { length: 20 }),
    country: (0, pg_core_1.varchar)("Country", { length: 45 }),
    homePhone: (0, pg_core_1.varchar)("HomePhone", { length: 45 }),
    extension: (0, pg_core_1.varchar)("Extension", { length: 45 }),
    notes: (0, pg_core_1.text)("Notes"),
    reportsTo: (0, pg_core_1.integer)("ReportsTo"),
});
exports.ordersTable = (0, pg_core_1.pgTable)("orders", {
    orderID: (0, pg_core_1.integer)("OrderID").notNull().primaryKey(),
    customerID: (0, pg_core_1.varchar)("CustomerID", { length: 15 })
        .notNull()
        .references(() => exports.customersTable.customerID),
    employeeID: (0, pg_core_1.integer)("EmployeeID")
        .notNull()
        .references(() => exports.employeesTable.employeeID),
    orderDate: (0, pg_core_1.text)("OrderDate"),
    requiredDate: (0, pg_core_1.text)("RequiredDate"),
    shippedDate: (0, pg_core_1.text)("ShippedDate"),
    shipVia: (0, pg_core_1.integer)("ShipVia")
        .notNull()
        .references(() => exports.shippersTable.shipperID),
    freight: (0, pg_core_1.decimal)("Freight"),
    shipName: (0, pg_core_1.varchar)("ShipName", { length: 50 }),
    shipAddress: (0, pg_core_1.varchar)("ShipAddress", { length: 100 }),
    shipCity: (0, pg_core_1.varchar)("ShipCity", { length: 50 }),
    shipRegion: (0, pg_core_1.varchar)("ShipRegion", { length: 50 }),
    shipPostalCode: (0, pg_core_1.varchar)("ShipPostalCode", { length: 50 }),
    shipCountry: (0, pg_core_1.varchar)("ShipCountry", { length: 50 }),
});
exports.suppliersTable = (0, pg_core_1.pgTable)("suppliers", {
    supplierID: (0, pg_core_1.integer)("SupplierID").notNull().primaryKey(),
    companyName: (0, pg_core_1.varchar)("CompanyName", { length: 45 }).notNull(),
    contactName: (0, pg_core_1.varchar)("ContactName", { length: 45 }),
    contactTitle: (0, pg_core_1.varchar)("ContactTitle", { length: 45 }),
    address: (0, pg_core_1.varchar)("Address", { length: 45 }),
    city: (0, pg_core_1.varchar)("City", { length: 45 }),
    region: (0, pg_core_1.varchar)("Region", { length: 45 }),
    postalCode: (0, pg_core_1.varchar)("PostalCode", { length: 45 }),
    country: (0, pg_core_1.varchar)("Country", { length: 45 }),
    phone: (0, pg_core_1.varchar)("Phone", { length: 45 }),
    fax: (0, pg_core_1.varchar)("Fax", { length: 45 }),
    HomePage: (0, pg_core_1.text)("HomePage"),
});
exports.productsTable = (0, pg_core_1.pgTable)("products", {
    productID: (0, pg_core_1.integer)("ProductID").notNull().primaryKey(),
    productName: (0, pg_core_1.varchar)("ProductName", { length: 250 }).notNull(),
    supplierID: (0, pg_core_1.integer)("SupplierID").references(() => exports.suppliersTable.supplierID),
    categoryID: (0, pg_core_1.integer)("CategoryID").references(() => exports.categoriesTable.categoryID),
    quantityPerUnit: (0, pg_core_1.varchar)("QuantityPerUnit", { length: 60 }),
    unitPrice: (0, pg_core_1.decimal)("UnitPrice"),
    unitsInStock: (0, pg_core_1.smallint)("UnitsInStock"),
    unitsOnOrder: (0, pg_core_1.smallint)("UnitsOnOrder"),
    reorderLevel: (0, pg_core_1.smallint)("ReorderLevel"),
    discontinued: (0, pg_core_1.boolean)("Discontinued").notNull(),
});
exports.orderDetailsTable = (0, pg_core_1.pgTable)("order_details", {
    orderID: (0, pg_core_1.integer)("OrderID")
        .notNull()
        .references(() => exports.ordersTable.orderID),
    productID: (0, pg_core_1.integer)("ProductID")
        .notNull()
        .references(() => exports.productsTable.productID),
    unitPrice: (0, pg_core_1.decimal)("UnitPrice").notNull(),
    quantity: (0, pg_core_1.integer)("Quantity").notNull(),
    discount: (0, pg_core_1.decimal)("Discount").notNull(),
}, (table) => ({
    uniqIdx: (0, pg_core_1.index)("orderID_and_productID_index").on(table.orderID, table.productID),
}));
