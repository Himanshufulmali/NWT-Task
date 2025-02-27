const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).send({error : errors});
        }

        next();
    };
};

module.exports = { validateSchema };