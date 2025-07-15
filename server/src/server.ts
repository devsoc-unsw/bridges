import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

import { getBridge, getDevSoc } from './controllers/index';
import { index } from './index';

dotenv.config({ path: '../env/server.env' });

const app: Express = express();
app.use(cors());
app.use(express.json());

const PORT = parseInt(process.env.PORT ?? '3001');

/**
 * Express Routes
 */
app.get('/', index);
app.get('/api/bridge', getBridge);
app.get('/api/devsoc', getDevSoc);

/**
 * Listening connection
 */
app.listen(PORT, () => {
  console.log(`Server listening on port ${String(PORT)}`);
  console.log('Press CTRL-C to stop\n');
});
