import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	username: string;
	email: string;
	avatar: string;
	password: string;
	passwordResetToken: string;
	passwordResetTokenExpiresIn: number;
	authenticate: (arg: string) => Promise<boolean>;
}
export interface ResponseUser extends Document {
	_id: mongoose.Types.ObjectId;
	name: string;
	username: string;
	email: string;
	avatar: string;
}
