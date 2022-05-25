import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
	{
		comment: {
			type: String,
			required: true,
		},
		commenter: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

export const postSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		file: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: [true, 'Please provide post name.'],
		},
		likesCount: { type: Number, default: 0 },
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		commentsCount: { type: Number, default: 0 },
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: commentSchema,
			},
		],
	},
	{ timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);
