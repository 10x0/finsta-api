import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { AsyncHandler, ErrorHandler } from '../handlers';
import { sendToken } from '../handlers/jwt.handler';
import { ResponseUser } from '../interfaces/user.interface';
import { User } from '../models';
import { loginSchema, registerSchema } from '../validations/schemas';

export const register = AsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, username, email, password } = req.body;

		let e = await registerSchema.validate({
			name,
			username,
			email,
			password,
		});
		if (e.error) {
			return next(
				new ErrorHandler(
					422,
					_.upperFirst(e.error?.message.replace('"', '').replace('"', '')) + '.'
				)
			);
		}

		let user = await User.create({ name, username, email, password });
		let refactoredUser = <ResponseUser>{
			_id: user._id,
			name: user.name,
			username: user.username,
			email: user.email,
			avatar: user.avatar,
		};
		sendToken(refactoredUser, 200, res);
	}
);

export const login = AsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let { email, username, password } = req.body;

		let e = await loginSchema.validate({
			email,
			username,
			password,
		});
		if (e.error) {
			return next(
				new ErrorHandler(
					422,
					_.upperFirst(e.error?.message.replace('"', '').replace('"', '')) + '.'
				)
			);
		}

		let user;
		if (username) user = await User.findOne({ username });
		if (email) user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorHandler(404, 'User not found.'));
		}

		if (!user.authenticate(password)) {
			return next(new ErrorHandler(401, 'Invalid password.'));
		}

		let refactoredUser = <ResponseUser>{
			_id: user._id,
			name: user.name,
			username: user.username,
			email: user.email,
			avatar: user.avatar,
		};

		sendToken(refactoredUser, 200, res);
	}
);
