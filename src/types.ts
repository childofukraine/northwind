import { Customers, Employees, Orders, Products, Suppliers } from "./db/schema";

export interface Airport {
  name: string;
  iata_code: string;
  icao_code: string;
  lat: number;
  lng: number;
  country_code: string;
  popularity: number;
  distance: number;
}

export interface AirportResponse {
  response: {
    airports: Airport[];
  };
}

export interface IpregistryResponse {
  location: {
    latitude: number;
    longitude: number;
    country: {
      code: string;
    };
  };
}

export interface OrderInfo {
  [key: string]: string | number;
  total_products_discount: string;
  total_products_price: string;
  total_products_items: string;
  total_products: string;
  CustomerID: string;
  OrderID: number;
  ShippedDate: string;
  ShipName: string;
  ShipCity: string;
  CompanyName: string;
  ShipCountry: string;
  Freight: string;
  OrderDate: string;
  RequiredDate: string;
  ShipRegion: string;
  ShipPostalCode: string;
}

export interface ProductsInOrder {
  [key: string]: string | number;
  ProductID: number;
  ProductName: string;
  Quantity: string;
  UnitPrice: string;
  total_products_price: string;
  Discount: string;
}

export interface SuppliersResponse {
  data: Suppliers[];
  queryInfo: {
    queryString: string;
    queryTS: string;
    queryExecutionTime: string;
  };
}

export interface ProductsResponse {
  data: Products[];
  queryInfo: {
    queryString: string;
    queryTS: string;
    queryExecutionTime: string;
  };
}

export interface ProductsIndexedResponse {
  data: {
    products: Products;
    suppliers: Suppliers | null;
  }[];
  queryInfo: {
    queryString: string;
    queryTS: string;
    queryExecutionTime: string;
  };
}

export interface OrdersResponse {
  data: Orders[];
  queryInfo: {
    queryString: string;
    queryTS: string;
    queryExecutionTime: string;
  };
}

export interface OrdersIndexedResponse {
  data: {
    orderInfo: OrderInfo[];
    productsInfo: ProductsInOrder[];
  };
  queryInfo: {
    orderInfo: {
      queryString: string;
      queryTS: string;
      queryExecutionTime: string;
    };
    productsInOrder: {
      queryString: string;
      queryTS: string;
      queryExecutionTime: string;
    };
  };
}

export interface EmployeesResponse {
  data: Employees[];
  queryInfo: {
    queryString: string;
    queryTS: string;
    queryExecutionTime: string;
  };
}

interface reportsTo {
  employeeID: number | null;
  lastName: string | null;
  firstName: string | null;
  title: string | null;
  titleOfCourtesy: string | null;
  birthDate: string | null;
  hireDate: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
  homePhone: string | null;
  extension: string | null;
  notes: string | null;
  reportsTo: number | null;
}

export interface EmployeesIndexedResponse {
  data: {
    employees: Employees;
    reportsToTable: reportsTo | null;
  }[];
  queryInfo: {
    queryString: string;
    queryTS: string;
    queryExecutionTime: string;
  };
}

export interface CustomersResponse {
  data: Customers[];
  queryInfo: {
    queryString: string;
    queryTS: string;
    queryExecutionTime: string;
  };
}
