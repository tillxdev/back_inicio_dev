import express from 'express';
import routes from './routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.get('/health', (_, res) => {
    res.json({ status: 'ok' });
});

app.use('/api', routes);
app.use(errorMiddleware);

export default app;
