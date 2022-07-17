import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import apiRouter from './routes';
import { ServerResponse } from 'http';

const app = express();

app.use((req: Request, res: Response, next: NextFunction): void => {
  express.json()(req, res as ServerResponse, next);
  express.urlencoded({ extended: false });
});
app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
