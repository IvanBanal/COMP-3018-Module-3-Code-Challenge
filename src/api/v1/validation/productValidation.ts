import Joi from "joi";

const categoryValues = ["electronics", "clothing", "food", "tools", "other"];

export const createProductSchema = Joi.object({
    // Requirement is string with 2-80 characters.
    name: Joi.string().min(2).max(80).required(),

    /**
     * Requirement is string with pattern of 3 uppercase + 4 digits (e.g. ABC1234).
     * ^ Is the start of the string.
     * $ Is the end of the string.
     * [A-Z] Is any uppercase letter.
     * {3} Is exactly 3 uppercase letters.
     * \d Is any digit (0-9).
     * {4} Is exactly 4 digits.
     */
    sku: Joi.string().pattern(/^[A-Z]{3}\d{4}$/).required(),

    // Requirement is a non-negative integer.
    quantity: Joi.number().integer().min(0).required(),

    //Requirement is positive number with max 2 decimal places.
    price: Joi.number().positive().precision(2).required(),

    /**
     * Requirement is one of: electronics, clothing, food, tools, other.
     * ...categoryValues just means all values in the array. (A shortcut instead of writing all values)
     */
    category: Joi.string().valid(...categoryValues).required(),
});

export const updateProductSchema = Joi.object({
    // Optional, 2-80 characters if provided.
    name: Joi.string().min(2).max(80).optional(),

    // Optional, non-negative integer if provided.
    quantity: Joi.number().integer().min(0).optional(),

    // Optional, positive number if provided.
    price: Joi.number().positive().precision(2).optional(),
    
    // Optional, must be valid category if provided.
    category: Joi.string().valid(...categoryValues).optional(),

}).min(1); // This is added because it ensures empty body fails validation. This is a simple addition for handling an Edge Case.