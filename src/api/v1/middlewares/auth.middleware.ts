import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AsyncHandler, ErrorHandler } from '../handlers';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models';

interface userRequestType extends Request {
	user: IUser | null;
}

export const authenticated = AsyncHandler(
	async (req: userRequestType, res: Response, next: NextFunction) => {
		let SECRET = process.env.JWT_SECRET as string;
		let token;
		if (
			req.headers['authorization'] &&
			req.headers['authorization'].split(' ')[0] === 'Bearer'
		) {
			token = req.headers.authorization?.split(' ')[1];
		}
		if (!token) {
			return next(new ErrorHandler(401, 'Not authenticated.'));
		}

		const decoded = (await jwt.verify(token, SECRET)) as JwtPayload;
		req.user = await User.findById<IUser>(decoded._id);
		next();
	}
);

// export const authorized =
// 	(...roles: string[]) =>
// 	(req: userRequestType, res: Response, next: NextFunction) => {
// 		if (!roles.includes(req.user!.role)) {
// 			return next(new ErrorHandler(403, 'Not authorized.'));
// 		}
// 		next();
// 	};
