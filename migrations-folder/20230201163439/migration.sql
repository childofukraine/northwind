CREATE TABLE IF NOT EXISTS "categories" (
	"CategoryID" integer PRIMARY KEY NOT NULL,
	"CategoryName" varchar(45) NOT NULL,
	"Description" text
);

CREATE TABLE IF NOT EXISTS "customers" (
	"CustomerID" varchar(15) PRIMARY KEY NOT NULL,
	"CompanyName" varchar(70) NOT NULL,
	"ContactName" varchar(60),
	"ContactTitle" varchar(60),
	"Address" varchar(100),
	"City" varchar(100),
	"Region" varchar(50),
	"PostalCode" varchar(15),
	"Country" varchar(45),
	"Phone" varchar(45),
	"Fax" varchar(45)
);

CREATE TABLE IF NOT EXISTS "employees" (
	"EmployeeID" integer PRIMARY KEY NOT NULL,
	"LastName" varchar(45) NOT NULL,
	"FirstName" varchar(45) NOT NULL,
	"Title" varchar(100),
	"TitleOfCourtesy" varchar(20),
	"BirthDate" date,
	"HireDate" date,
	"Address" varchar(150),
	"City" varchar(20),
	"Region" varchar(45),
	"PostalCode" varchar(20),
	"Country" varchar(45),
	"HomePhone" varchar(45),
	"Extension" varchar(45),
	"Notes" text,
	"ReportsTo" integer
);

CREATE TABLE IF NOT EXISTS "order_details" (
	"OrderID" integer NOT NULL,
	"ProductID" integer NOT NULL,
	"UnitPrice" numeric NOT NULL,
	"Quantity" integer NOT NULL,
	"Discount" numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS "orders" (
	"OrderID" integer PRIMARY KEY NOT NULL,
	"CustomerID" varchar(15) NOT NULL,
	"EmployeeID" integer NOT NULL,
	"OrderDate" text,
	"RequiredDate" text,
	"ShippedDate" text,
	"ShipVia" integer NOT NULL,
	"Freight" numeric,
	"ShipName" varchar(50),
	"ShipAddress" varchar(100),
	"ShipCity" varchar(50),
	"ShipRegion" varchar(50),
	"ShipPostalCode" varchar(50),
	"ShipCountry" varchar(50)
);

CREATE TABLE IF NOT EXISTS "products" (
	"ProductID" integer PRIMARY KEY NOT NULL,
	"ProductName" varchar(250) NOT NULL,
	"SupplierID" integer,
	"CategoryID" integer,
	"QuantityPerUnit" varchar(60),
	"UnitPrice" numeric,
	"UnitsInStock" smallint,
	"UnitsOnOrder" smallint,
	"ReorderLevel" smallint,
	"Discontinued" boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS "regions" (
	"RegionID" integer PRIMARY KEY NOT NULL,
	"RegionDescription" varchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS "shippers" (
	"ShipperID" integer PRIMARY KEY NOT NULL,
	"CompanyName" varchar(30) NOT NULL,
	"Phone" varchar(30)
);

CREATE TABLE IF NOT EXISTS "suppliers" (
	"SupplierID" integer PRIMARY KEY NOT NULL,
	"CompanyName" varchar(45) NOT NULL,
	"ContactName" varchar(45),
	"ContactTitle" varchar(45),
	"Address" varchar(45),
	"City" varchar(45),
	"Region" varchar(45),
	"PostalCode" varchar(45),
	"Country" varchar(45),
	"Phone" varchar(45),
	"Fax" varchar(45),
	"HomePage" text
);

CREATE TABLE IF NOT EXISTS "territories" (
	"TerritoryID" varchar(45) PRIMARY KEY NOT NULL,
	"TerritoryDescription" varchar(80) NOT NULL,
	"RegionID" integer NOT NULL
);

DO $$ BEGIN
 ALTER TABLE order_details ADD CONSTRAINT order_details_OrderID_orders_OrderID_fk FOREIGN KEY ("OrderID") REFERENCES orders("OrderID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE order_details ADD CONSTRAINT order_details_ProductID_products_ProductID_fk FOREIGN KEY ("ProductID") REFERENCES products("ProductID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE orders ADD CONSTRAINT orders_CustomerID_customers_CustomerID_fk FOREIGN KEY ("CustomerID") REFERENCES customers("CustomerID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE orders ADD CONSTRAINT orders_EmployeeID_employees_EmployeeID_fk FOREIGN KEY ("EmployeeID") REFERENCES employees("EmployeeID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE orders ADD CONSTRAINT orders_ShipVia_shippers_ShipperID_fk FOREIGN KEY ("ShipVia") REFERENCES shippers("ShipperID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE products ADD CONSTRAINT products_SupplierID_suppliers_SupplierID_fk FOREIGN KEY ("SupplierID") REFERENCES suppliers("SupplierID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE products ADD CONSTRAINT products_CategoryID_categories_CategoryID_fk FOREIGN KEY ("CategoryID") REFERENCES categories("CategoryID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE territories ADD CONSTRAINT territories_RegionID_regions_RegionID_fk FOREIGN KEY ("RegionID") REFERENCES regions("RegionID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS orderID_and_productID_index ON order_details ("OrderID","ProductID");