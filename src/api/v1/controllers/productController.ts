import { Request, Response } from "express";
import * as productService from "../services/productService";

export const getProducts = async (_req: request, res: Response) => {
    const products = await productService.getAllProducts();
    res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
        res.status(404).json({ message: "Product not found"})
    }
}