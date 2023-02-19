import { Request, Response } from "express";
import axios from "axios";
import { AirportResponse, IpregistryResponse } from "../types";
import { Suppliers } from "../repositories/suppliers";
import { Products } from "../repositories/products";
import "dotenv/config";
import { Orders } from "../repositories/orders";
import { Employees } from "../repositories/employees";
import { Customers } from "../repositories/customers";
import { Search } from "../repositories/search";

export class Controller {
  static async dash(_req: Request, res: Response) {
    let { data: rawIpData } = await axios.get<IpregistryResponse>(
      `${process.env.BASE_URL_IPREGISTRY}${process.env.API_KEY}`
    );
    const { latitude, longitude } = rawIpData.location;
    const { code } = rawIpData.location.country;

    let { data: rawAirportData } = await axios.get<AirportResponse>(
      `${process.env.BASE_URL_AIR}${latitude}&lng=${longitude}&distance=100&api_key=${process.env.API_KEY_AIR}`
    );
    const airportsArray = rawAirportData.response.airports;

    const nearestAirport = airportsArray.reduce((prev, curr) =>
      prev.distance < curr.distance ? prev : curr
    );
    res.status(200).send({
      Country: code,
      Colo: nearestAirport.iata_code,
    });
  }

  static async suppliers(_req: Request, res: Response) {
    const response = await Suppliers.getAllSuppliers();
    res.status(200).send({ response });
  }

  static async suppliersIndexed(req: Request, res: Response) {
    const { supplierId } = req.params;
    const response = await Suppliers.getIndexedSuppliers(
      supplierId as unknown as number
    );
    res.status(200).send({ response });
  }

  static async products(_req: Request, res: Response) {
    const response = await Products.getAllProducts();
    res.status(200).send({ response });
  }

  static async productsIndexed(req: Request, res: Response) {
    const { productId } = req.params;
    const response = await Products.getIndexedProducts(
      productId as unknown as number
    );
    res.status(200).send({ response });
  }

  static async orders(_req: Request, res: Response) {
    const response = await Orders.getAllOrders();
    res.status(200).send({ response });
  }

  static async ordersIndexed(req: Request, res: Response) {
    const { orderId } = req.params;
    const response = await Orders.getIndexedOrders(
      orderId as unknown as number
    );
    res.status(200).send({ response });
  }

  static async employees(_req: Request, res: Response) {
    const response = await Employees.getAllEmployees();
    res.status(200).send({ response });
  }

  static async employeesIndexed(req: Request, res: Response) {
    const { employeeId } = req.params;
    const response = await Employees.getIndexedEmployees(
      employeeId as unknown as number
    );
    res.status(200).send({ response });
  }

  static async customers(_req: Request, res: Response) {
    const response = await Customers.getAllCustomers();
    res.status(200).send({ response });
  }

  static async customersIndexed(req: Request, res: Response) {
    const { customerId } = req.params;
    const response = await Customers.getIndexedCustomers(customerId);
    res.status(200).send({ response });
  }

  static async searchProducts(req: Request, res: Response) {
    const { keyword } = req.params;
    const response = await Search.searchProducts(keyword);
    res.status(200).send({ response });
  }

  static async searchCustomers(req: Request, res: Response) {
    const { keyword } = req.params;
    const response = await Search.searchCustomers(keyword);
    res.status(200).send({ response });
  }
}
