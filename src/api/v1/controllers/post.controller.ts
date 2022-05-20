import { Request, Response, NextFunction } from 'express';
import { AsyncHandler } from '../handlers';
import { CustomRequest } from '../interfaces/requests.interface';
import { Post } from '../models/post.model';

export const getAll = AsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let posts = await Post.find().populate('user', ['username']);
		res.status(200).json({
			success: true,
			posts,
		});
	}
);

export const getSingle = (req: Request, res: Response, next: NextFunction) => {
	res.send('Single post.');
};

export const create = AsyncHandler(
	async (req: CustomRequest, res: Response, next: NextFunction) => {
		let { description } = req.body;
		console.log(req.user);
		let file = '/uploads/images/' + req.file?.filename;
		let user = req.user;
		await Post.create({ description, user, file });
		res.status(200).json({
			success: true,
			message: `Post uploaded.`,
		});
	}
);

export const update = (req: Request, res: Response, next: NextFunction) => {
	res.send('Edit post.');
};
export const remove = (req: Request, res: Response, next: NextFunction) => {
	res.send('Delete post.');
};
