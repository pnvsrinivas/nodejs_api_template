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

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI: string = process.env.mongoURI || '';
const APP_PATH = path.join(__dirname, '..', 'dist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/matches', matchesRoutes);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome!');
});

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