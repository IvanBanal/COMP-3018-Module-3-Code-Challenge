import {Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validateRequest = 
    (schema: Schema) =>
    (req: Request, res: Response, next: NextFunction) => {
        const {error, value} = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: "Validation Error.",
                errors: error.details.map((detail) => detail.message),
            });
        }
        req.body = value;
        next();
    };

