import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();
const PORT = (process.env.PORT || 5000) as number;

process.on('uncaughtException', (error) => {
	console.log(error.message);
	console.log('Shutting down due to uncaught exception.');
	process.exit(1);
});

connectDB().then(() => {
	app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT} 🚀`));
});
