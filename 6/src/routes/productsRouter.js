import {Router} from 'express';
import {get} from '../controllers/productsController.js'

const productsRouter = Router();

productsRouter.get('/', get);

// productsRouter.get('/:pid', getProductById);

// productsRouter.post('/',  postProduct);

// productsRouter.put('/:id', putProduct);

// productsRouter.delete('/:id',  deleteProduct);

export default productsRouter;