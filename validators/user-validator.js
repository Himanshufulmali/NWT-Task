const Joi = require("joi");

const registerUserSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name is required."
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid.",
        "string.empty": "Email is required."
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must have 8 characters.",
        "string.empty": "Password is required."
    }),
    worth: Joi.number().min(0).optional().messages({
        "number.base": "Worth must be a number.",
        "number.min": "Worth at least be 0.",
    })
});

const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid.",
        "string.empty": "Email is required."
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required."
    })
});

module.exports = { registerUserSchema, loginUserSchema };