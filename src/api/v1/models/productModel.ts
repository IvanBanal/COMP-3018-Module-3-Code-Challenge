export interface Product {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    category: "electronics" | "clothing" | "food" | "tools" | "other";
    createdAt: Date;
    updatedAt: Date;
}