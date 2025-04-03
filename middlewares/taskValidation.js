const { body } = require("express-validator");

const validateTask = [
    body("title", "Title is required").not().isEmpty(),
    body("description", "Description should be at least 5 characters").optional().isLength({ min: 5 }),
];

module.exports = validateTask;
