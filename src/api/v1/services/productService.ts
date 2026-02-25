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

export const getAllProducts = async (): Promise<Product[]> => {
    const snapshot = await getDocuments(COLLECTION);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[];
};

export const getProductById = async (
    id: string
): Promise<Product | null> => {
    const doc = await getDocumentById(COLLECTION, id);

    if (!doc) return null;
    
    return {
        id: doc.id,
        ...doc.data(),
    } as Product;
};


export const updateProduct = async (
    id: string,
    updates: Partial<Product>
); Promise<Product | null> => {
    const existing = await getProductById(id);
    
    if (!existing) return null;

    const updatedData = {
        ...updates,
        updatedAt: new Date(),
    };

    await updateDocument<Product>(COLLECTION, id, updatedData);

    return {
        ...existing,
        ...updatedData,
    };
};
