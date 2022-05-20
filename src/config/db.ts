import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
	await mongoose
		.connect(process.env.MONGO_URI as string)
		.then(() => console.log('Database connected successfully.'))
		.catch((error) => {
			if (error.message.startsWith('Invalid connection string')) {
				error.message = 'Error: Invalid connection string.';
			}
			console.log(`Error while connecting to the database.\n${error.message}`);
			console.log('Shutting down the server.');
			process.exit(1);
		});
};
