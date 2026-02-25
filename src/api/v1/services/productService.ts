import { create } from "domain";
import { Product } from "../models/productModel";
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from "../repositories/firestoreRepository";

const COLLECTION = "products";

export const createProduct = async (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<Product> => {
    const timestamp = new Date();
    
    const productData = {
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp,
    };

    const id = await createDocument<Product>(COLLECTION, productData);

    return {
        id,
        ...productData,
    };
};

