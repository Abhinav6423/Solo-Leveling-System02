import { body, validationResult } from "express-validator";
//body lets you define validation rules for fields in the request body
//validateResult lets you handle validation errors and send appropriate responses to the client

export const validateUser = [
    body("email")  // to validate a field
        .isEmail()
        .withMessage("Please enter a valid email address"), // to show custom message

    body("password") // to validate a field
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"), // to show custom message

    (req, res, next) => {
        const errors = validationResult(req); // to get errors

        if (!errors.isEmpty()) {
            // send single readable message
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }

        next();
    }
];
