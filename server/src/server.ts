import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request,Response } from 'express';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

const PORT = parseInt(process.env.PORT ?? '3001');

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/home', (req: Request, res: Response) => {
  res.json({ message: 'BRIDGES YASSS!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${String(PORT)}`);
});
