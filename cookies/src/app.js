import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fileStore from 'session-file-store';
import mongoStore from 'connect-mongo';
import mongoose from 'mongoose';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import cookieRouter from './routes/cookieRouter.js';
import sessionRouter from './routes/sessionRouter.js';

void (async() => {

    await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // const SessionStorage = fileStore(session);
    const app = express();
    const SERVER_PORT = 8083;
    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    // cookies
    app.use(cookieParser())
    // app.use(cookieParser('CoderS3cR3cR3tC0D3'))
    // fin cookies
    // express-session
    app.use(session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_DB_URI,
            ttl: 15
        }),
        secret: 'CoderS3cR3tC0D3',
        resave: false,
        saveUninitialized: false
    }));
    // fin express-session

    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);    
    app.use('/api/cookies', cookieRouter);
    app.use('/api/sessions', sessionRouter);

    const server = app.listen(8083, () => {
        console.log(`Server listening on Port ${SERVER_PORT}`);
    });

})();
