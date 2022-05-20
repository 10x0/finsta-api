import Joi from 'joi';

export const registerSchema = Joi.object().keys({
	name: Joi.string().required().messages({ required: 'Name is required' }),
	username: Joi.string().pattern(RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required().strict(),
});

export const loginSchema = Joi.object().keys({
	email: Joi.string().email(),
	username: Joi.string().pattern(RegExp('^[a-zA-Z0-9]{5,30}$')),
	password: Joi.string().min(8).required().strict(),
});
