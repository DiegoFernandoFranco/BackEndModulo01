import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import mongoose from 'mongoose';

void (async() => {

    await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    const server = app.listen(8083, () => {
        console.log('Server on Port 8083');
    });

    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);

})();
