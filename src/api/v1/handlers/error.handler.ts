export class ErrorHandler extends Error {
	status: string;
	statusCode: number;
	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		Error.captureStackTrace(this, this.constructor);
	}
}
