import express from 'express';
import { router } from './routes';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(router);

app.use(bodyParser.urlencoded({ extended: false }));

export { app }