import { notFound } from "@hapi/boom";
import { Request, NextFunction } from "express";
import "dotenv/config";
import {
  FullEmployeeData,
  OrderByIDInfo,
  OrderInfo,
  ProductInOrder,
  ProductWithSupplier,
  TypedResponse,
} from "../types";
import { CustomersRepo } from "../repositories/customers";
import Info from "../entities/info";
import { Customers, Employees, Products, Suppliers } from "../db/schema";
import { EmployeesRepo } from "../repositories/employees";
import { OrdersRepo } from "../repositories/orders";
import { ProductsRepo } from "../repositories/products";
import { SuppliersRepo } from "../repositories/suppliers";
import { SearchRepo } from "../repositories/search";

export class Controller {
  static async suppliers(
    req: Request,
    res: TypedResponse<{
      suppliers: { data: Suppliers[]; info: Info };
      count: { data: number; info: Info };
    }>,
    next: NextFunction
  ) {
    const { page } = req.query;
    try {
      const count = await SuppliersRepo.suppliersCount();
      if (!count) throw notFound();

      const suppliers = await SuppliersRepo.getAllSuppliers(+page!);
      if (!suppliers) throw notFound();

      res.json({ suppliers, count });
    } catch (err) {
      next(err);
    }
  }

  static async suppliersIndexed(
    req: Request,
    res: TypedResponse<{ supplier: { data: Suppliers; info: Info } }>,
    next: NextFunction
  ) {
    const { supplierId } = req.params;
    try {
      const supplier = await SuppliersRepo.getIndexedSuppliers(+supplierId);
      if (!supplier) throw notFound();

      res.json({ supplier });
    } catch (err) {
      next(err);
    }
  }

  static async products(
    req: Request,
    res: TypedResponse<{
      products: {
        data: Products[];
        info: Info;
      };
      count: {
        data: number;
        info: Info;
      };
    }>,
    next: NextFunction
  ) {
    const { page } = req.query;
    try {
      const count = await ProductsRepo.productsCount();
      if (!count) throw notFound();

      const products = await ProductsRepo.getAllProducts(+page!);
      if (!products) throw notFound();

      res.json({ products, count });
    } catch (err) {
      next(err);
    }
  }

  static async productsIndexed(
    req: Request,
    res: TypedResponse<{ product: { data: ProductWithSupplier; info: Info } }>,
    next: NextFunction
  ) {
    const { productId } = req.params;
    try {
      const product = await ProductsRepo.getIndexedProducts(+productId);
      if (!product) throw notFound();

      res.json({ product });
    } catch (err) {
      next(err);
    }
  }

  static async orders(
    req: Request,
    res: TypedResponse<{
      count: {
        data: number;
        info: Info;
      };
      orders: {
        data: OrderInfo[];
        info: Info;
      };
    }>,
    next: NextFunction
  ) {
    const { page } = req.query;
    try {
      const count = await OrdersRepo.ordersCount();
      if (!count) throw notFound();

      const orders = await OrdersRepo.getAllOrders(+page!);
      if (!orders) throw notFound();

      res.json({ count, orders });
    } catch (err) {
      next(err);
    }
  }

  static async ordersIndexed(
    req: Request,
    res: TypedResponse<{
      order: {
        data: OrderByIDInfo;
        info: Info;
      };
      productsInOrder: {
        data: ProductInOrder[];
        info: Info;
      };
    }>,
    next: NextFunction
  ) {
    const { orderId } = req.params;
    try {
      const order = await OrdersRepo.getIndexedOrders(+orderId);
      if (!order) throw notFound();

      const productsInOrder = await ProductsRepo.getProductsInOrderByOrderID(
        +orderId
      );

      res.json({ order, productsInOrder });
    } catch (err) {
      next(err);
    }
  }

  static async employees(
    req: Request,
    res: TypedResponse<{
      count: {
        data: number;
        info: Info;
      };
      employees: {
        data: Employees[];
        info: Info;
      };
    }>,
    next: NextFunction
  ) {
    const { page } = req.query;
    try {
      const count = await EmployeesRepo.employeesCount();
      if (!count) throw notFound();

      const employees = await EmployeesRepo.getAllEmployees(
        page as unknown as number
      );
      if (!employees) throw notFound();

      res.json({ count, employees });
    } catch (err) {
      next(err);
    }
  }

  static async employeesIndexed(
    req: Request,
    res: TypedResponse<{
      employee: {
        data: FullEmployeeData;
        info: Info;
      };
    }>,
    next: NextFunction
  ) {
    const { employeeId } = req.params;
    try {
      const employee = await EmployeesRepo.getIndexedEmployees(+employeeId);
      if (!employee) throw notFound();

      res.json({ employee });
    } catch (err) {
      next(err);
    }
  }

  static async customers(
    req: Request,
    res: TypedResponse<{
      count: {
        data: number;
        info: Info;
      };
      customers: {
        data: Customers[];
        info: Info;
      };
    }>,
    next: NextFunction
  ) {
    const { page } = req.query;

    try {
      const count = await CustomersRepo.customersCount();
      if (!count) throw notFound();

      const customers = await CustomersRepo.getAllCustomers(+page!);
      if (!customers) throw notFound();

      res.json({ count, customers });
    } catch (err) {
      next(err);
    }
  }

  static async customersIndexed(
    req: Request,
    res: TypedResponse<{
      customer: {
        data: Customers;
        info: Info;
      };
    }>,
    next: NextFunction
  ) {
    const { customerId } = req.params;
    try {
      const customer = await CustomersRepo.getIndexedCustomers(customerId);
      if (!customer) throw notFound();

      res.json({ customer });
    } catch (err) {
      next(err);
    }
  }

  static async searchProducts(
    req: Request,
    res: TypedResponse<{ data: Products[]; info: Info }>,
    next: NextFunction
  ) {
    const { keyword } = req.params;
    try {
      const products = await SearchRepo.searchProducts(keyword);
      if (!products) throw notFound();

      return res.json(products);
    } catch (err) {
      next(err);
    }
  }

  static async searchCustomers(
    req: Request,
    res: TypedResponse<{ data: Customers[]; info: Info }>,
    next: NextFunction
  ) {
    const { keyword } = req.params;
    try {
      const customers = await SearchRepo.searchCustomers(keyword);
      if (!customers) throw notFound();

      return res.json(customers);
    } catch (err) {
      next(err);
    }
  }
}
