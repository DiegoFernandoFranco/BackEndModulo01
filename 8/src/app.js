import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import mongoose from 'mongoose';
import session from 'express-session';
import fileStore from 'session-file-store';
import mongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';



void (async() => {

    await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_DB_URI,
            ttl: 15
        }),
        secret: 'CoderS3cR3tC0D3',
        resave: false,
        saveUninitialized: false
    }));


    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);
    app.use('/api/sessions', sessionRouter);

    const server = app.listen(8083, () => {
        console.log('Server on Port 8083');
    });
})();
