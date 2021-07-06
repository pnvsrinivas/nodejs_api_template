import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from 'config';
import { error404 } from './helpers/not-found';
import matchesRoutes from './routes/match';
import usersRoutes from './routes/user';
import authRoutes from './routes/auth';
import homeRouters from './routes/home';

dotenv.config();

const app = express();
const API_URL_PREFIX = '/api/v1';
const port = process.env.PORT || 3000;
const mongoURI: string = process.env.mongoURI || '';
const APP_PATH = path.join(__dirname, '..', 'dist');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routers
app.use('/', homeRouters);
app.use(`${API_URL_PREFIX}/auth`, authRoutes);
app.use(`${API_URL_PREFIX}/users`, usersRoutes);
app.use(`${API_URL_PREFIX}/auth`, matchesRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(APP_PATH));
  
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve(APP_PATH, 'index.html'));
    });
}

app.use(error404); // Caution: Don't define any routers/url post this line !!

const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false,
};
mongoose.connect(mongoURI, options)
    .then(() => {
        app.listen(port, () => console.log(`App is listening on ${port}`));
    })
    .catch(err => console.log(err));