import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../handlers';

export default (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	error.statusCode = error.statusCode || 500;
	error.message = error.message || 'Internal server error.';

	if (error.code === 11000) {
		error = new ErrorHandler(
			400,
			`Account with same ${Object.keys(error.keyPattern)[0]} already exists.`
		);
	} else {
		switch (error.name) {
			case 'CastError': {
				let message = `Resource not found. Invalid: ${error.path}`;
				error = new ErrorHandler(404, message);
				break;
			}

			case 'JsonWebTokenError': {
				let message = 'Invalid token.';
				error = new ErrorHandler(404, message);
				break;
			}

			case 'TokenExpiredError': {
				let message = 'Token expired.';
				error = new ErrorHandler(404, message);
				break;
			}

			default:
				break;
		}
	}
	res.status(error.statusCode).json({
		success: false,
		message: error.message,
	});
};
