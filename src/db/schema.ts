import {
  pgTable,
  text,
  index,
  integer,
  boolean,
  varchar,
  date,
  decimal,
  smallint,
  InferModel,
} from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  categoryID: integer("CategoryID").notNull().primaryKey(),
  categoryName: varchar("CategoryName", { length: 45 }).notNull(),
  description: text("Description"),
});

export const regionsTable = pgTable("regions", {
  regionID: integer("RegionID").notNull().primaryKey(),
  regionDescription: varchar("RegionDescription", { length: 20 }).notNull(),
});

export const territoriesTable = pgTable("territories", {
  territoryID: varchar("TerritoryID", { length: 45 }).notNull().primaryKey(),
  territoryDescription: varchar("TerritoryDescription", {
    length: 80,
  }).notNull(),
  regionID: integer("RegionID")
    .notNull()
    .references(() => regionsTable.regionID),
});

export const shippersTable = pgTable("shippers", {
  shipperID: integer("ShipperID").notNull().primaryKey(),
  companyName: varchar("CompanyName", { length: 30 }).notNull(),
  phone: varchar("Phone", { length: 30 }),
});

export const customersTable = pgTable("customers", {
  customerID: varchar("CustomerID", { length: 15 }).notNull().primaryKey(),
  companyName: varchar("CompanyName", { length: 70 }).notNull(),
  contactName: varchar("ContactName", { length: 60 }),
  contactTitle: varchar("ContactTitle", { length: 60 }),
  address: varchar("Address", { length: 100 }),
  city: varchar("City", { length: 100 }),
  region: varchar("Region", { length: 50 }),
  postalCode: varchar("PostalCode", { length: 15 }),
  country: varchar("Country", { length: 45 }),
  phone: varchar("Phone", { length: 45 }),
  fax: varchar("Fax", { length: 45 }),
});

export const employeesTable = pgTable("employees", {
  employeeID: integer("EmployeeID").notNull().primaryKey(),
  lastName: varchar("LastName", { length: 45 }).notNull(),
  firstName: varchar("FirstName", { length: 45 }).notNull(),
  title: varchar("Title", { length: 100 }),
  titleOfCourtesy: varchar("TitleOfCourtesy", { length: 20 }),
  birthDate: date("BirthDate"),
  hireDate: date("HireDate"),
  address: varchar("Address", { length: 150 }),
  city: varchar("City", { length: 20 }),
  region: varchar("Region", { length: 45 }),
  postalCode: varchar("PostalCode", { length: 20 }),
  country: varchar("Country", { length: 45 }),
  homePhone: varchar("HomePhone", { length: 45 }),
  extension: varchar("Extension", { length: 45 }),
  notes: text("Notes"),
  reportsTo: integer("ReportsTo"),
});

export const ordersTable = pgTable("orders", {
  orderID: integer("OrderID").notNull().primaryKey(),
  customerID: varchar("CustomerID", { length: 15 })
    .notNull()
    .references(() => customersTable.customerID),
  employeeID: integer("EmployeeID")
    .notNull()
    .references(() => employeesTable.employeeID),
  orderDate: text("OrderDate"),
  requiredDate: text("RequiredDate"),
  shippedDate: text("ShippedDate"),
  shipVia: integer("ShipVia")
    .notNull()
    .references(() => shippersTable.shipperID),
  freight: decimal("Freight"),
  shipName: varchar("ShipName", { length: 50 }),
  shipAddress: varchar("ShipAddress", { length: 100 }),
  shipCity: varchar("ShipCity", { length: 50 }),
  shipRegion: varchar("ShipRegion", { length: 50 }),
  shipPostalCode: varchar("ShipPostalCode", { length: 50 }),
  shipCountry: varchar("ShipCountry", { length: 50 }),
});

export const suppliersTable = pgTable("suppliers", {
  supplierID: integer("SupplierID").notNull().primaryKey(),
  companyName: varchar("CompanyName", { length: 45 }).notNull(),
  contactName: varchar("ContactName", { length: 45 }),
  contactTitle: varchar("ContactTitle", { length: 45 }),
  address: varchar("Address", { length: 45 }),
  city: varchar("City", { length: 45 }),
  region: varchar("Region", { length: 45 }),
  postalCode: varchar("PostalCode", { length: 45 }),
  country: varchar("Country", { length: 45 }),
  phone: varchar("Phone", { length: 45 }),
  fax: varchar("Fax", { length: 45 }),
  HomePage: text("HomePage"),
});

export const productsTable = pgTable("products", {
  productID: integer("ProductID").notNull().primaryKey(),
  productName: varchar("ProductName", { length: 250 }).notNull(),
  supplierID: integer("SupplierID").references(() => suppliersTable.supplierID),
  categoryID: integer("CategoryID").references(
    () => categoriesTable.categoryID
  ),
  quantityPerUnit: varchar("QuantityPerUnit", { length: 60 }),
  unitPrice: decimal("UnitPrice"),
  unitsInStock: smallint("UnitsInStock"),
  unitsOnOrder: smallint("UnitsOnOrder"),
  reorderLevel: smallint("ReorderLevel"),
  discontinued: boolean("Discontinued").notNull(),
});

export const orderDetailsTable = pgTable(
  "order_details",
  {
    orderID: integer("OrderID")
      .notNull()
      .references(() => ordersTable.orderID),
    productID: integer("ProductID")
      .notNull()
      .references(() => productsTable.productID),
    unitPrice: decimal("UnitPrice").notNull(),
    quantity: integer("Quantity").notNull(),
    discount: decimal("Discount").notNull(),
  },
  (table) => ({
    uniqIdx: index("orderID_and_productID_index").on(
      table.orderID,
      table.productID
    ),
  })
);

export type Suppliers = InferModel<typeof suppliersTable>;
export type Products = InferModel<typeof productsTable>;
export type Orders = InferModel<typeof ordersTable>;
export type Employees = InferModel<typeof employeesTable>;
export type Customers = InferModel<typeof customersTable>;
