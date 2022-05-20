import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req: Request, file: any, callback: any) {
		callback(null, './src/uploads/images');
	},
	filename: function (req: Request, file: any, callback: any) {
		callback(null, Date.now() + file.originalname);
	},
});

export const upload = multer({
	storage: storage,
	limits: {
		fieldSize: 1024 * 1024 * 3,
	},
});
