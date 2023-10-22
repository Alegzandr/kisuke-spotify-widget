import express, { json } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import routes from './routes';
import apiRoutes from './routes/apiRoutes';

dotenv.config();

const app = express();
const port = 3000;

app.use(json());
connect(process.env.DATABASE_URL!, {});
app.disable('x-powered-by');

app.use('/api', apiRoutes);
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
