import { Send } from "express-serve-static-core";
import { Employees, Products, Suppliers } from "./db/schema";
import { Response } from "express";

export interface FullEmployeeData {
  employees: Employees;
  reportsToTable: null | Employees;
}

export interface OrderInfo {
  orderID: number;
  totalProductPrice: string;
  totalProductsItems: string;
  totalProductsQuantity: string;
  shippedDate: string | null;
  shipName: string | null;
  shipCity: string | null;
  shipCountry: string | null;
}

export interface OrderByIDInfo {
  orderID: number;
  totalProductDiscount: string;
  totalProductPrice: string;
  totalProductsItems: string;
  totalProductsQuantity: string;
  customerID: string;
  shippedDate: string | null;
  shipName: string | null;
  shipCity: string | null;
  shipCountry: string | null;
  companyName: string | null;
  freight: string | null;
  orderDate: string | null;
  requiredDate: string | null;
  shipRegion: string | null;
  shipPostalCode: string | null;
}

export interface ProductInOrder {
  productID: number;
  productName: string | null;
  quantity: number;
  unitPrice: string;
  totalProductPrice: string;
  discount: string;
}

export interface ProductWithSupplier {
  products: Products;
  suppliers: Suppliers | null;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
