import express, { Application } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import v1Routes from './api/v1';
import path from 'path';

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(express.json());

app.use(
	'src/uploads/images',
	express.static(path.join(__dirname + 'src/uploads/images'))
);

app.use('/api/v1', v1Routes);

export default app;
