import dotenv from  'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
// import {engine} from 'express-handlebars';
// import {Server} from 'socket.io';

// import ProductManager from './ProductManager.js';
// const products = new ProductManager;


// import productsRouter from './routes/--productsRouter.js';
import cartRouter from './routes/--cartsRouter.js';
import productsRouter from './routes/productsRouter.js';

// import homeRouter from './routes/homeRouter.js';
// import realTimeProductsRouter from './routes/realTimeProductsRouter.js';

// const viewsPath = path.resolve('src/views');

void (async() => {
    try {
        const app = express();
        const SERVER_PORT = 8083;

        await mongoose.connect(process.env.MONGO_DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

        app.use('/api/products', productsRouter);
        app.use('/api/carts', cartRouter);

        const httpServer = app.listen(SERVER_PORT, () => {
            console.log(`Server running on Port ${SERVER_PORT}`)
        });

    }   catch (error) {
            console.log(error);
    }

})();
 

    // app.engine('handlebars', engine({
    //     layoutsDir: `${viewsPath}/layouts`,
    //     defaultLayout: `${viewsPath}/layouts/main.handlebars`,
    // }));
    // app.set('view engine', 'handlebars');
    // app.set('views', viewsPath);

    // app.use('/home', homeRouter);
    // app.use('/realTimeProducts', realTimeProductsRouter);


    // const socketServer = new Server(httpServer);
        
    // socketServer.on('connection', async socket => {
    //     // console.log(socket.request.headers['user-agent']);
    //     console.log(`Nuevo Cliente Conectado`, socket.id)
    //     socket.on('message', async(data) => {
    //         console.log(data)
    //         const allProducts = await products.getProducts();
    //         socket.emit('server to client', allProducts)

    //     });

    //     socket.on('removeProduct', async (data) => {
    //         const result = await products.deleteProduct(+data);
    //         console.log(`Se elimino el producto nro: ${data}`);
    //         // socket.emit('todos', await products.getProducts());
    //         const allProducts = await products.getProducts();
    //         socket.emit('server to client', allProducts)
    //     });

    //     socket.on('newProduct', async (data) => {
    //         const result = await products.addProduct(data);
    //         console.log(result)
    //         const allProducts = await products.getProducts();
    //         socket.emit('server to client', allProducts)
    //     });

    
    // });

