import Joi from '@hapi/joi';

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        registerSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            name: Joi.string().required(),
            dayOfBirth: Joi.date().required(),
        }),
        passwordSchema: Joi.object().keys({
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        }),
    }
}