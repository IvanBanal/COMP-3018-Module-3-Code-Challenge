import { Request, Response } from "express";
import * as productService from "../services/productService";

export const getProducts = async (_req: request, res: Response) => {
    const products = await productService.getAllProducts();
    res.json(products);
};

