import { Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { IUser, ResponseUser } from '../interfaces/user.interface';

const generateToken = (_id: mongoose.Types.ObjectId) => {
	let SECRET = process.env.JWT_SECRET as string;
	let EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

	return jwt.sign({ _id }, SECRET, {
		expiresIn: EXPIRES_IN,
	});
};

export const sendToken = (
	user: ResponseUser,
	statusCode: any,
	res: Response
) => {
	let token = generateToken(user._id);

	res.status(statusCode).json({
		success: true,
		token,
		user,
	});
};
