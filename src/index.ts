import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error';
import { connectDB } from './config/db';
import { handleExceptions, logger } from './utils/logger';
import { traceId } from './middlewares/traceId';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;
const app = express();

// Connect Database
connectDB();
handleExceptions();

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(traceId);
app.use(errorMiddleware);

const server = createServer(app);

server.listen(PORT, () => {
  logger.info(`Server listening at ${PORT}`);
});
