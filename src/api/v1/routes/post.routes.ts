import { Router } from 'express';
import {
	create,
	getAll,
	getSingle,
	remove,
	update,
} from '../controllers/post.controller';
import { authenticated } from '../middlewares';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router
	.route('/')
	.get(authenticated, getAll)
	.post(authenticated, upload.single('media'), create);
router.route('/:id').get(getSingle).put(update).delete(remove);

export default router;
