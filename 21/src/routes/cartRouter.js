import {Router} from 'express';
import {getAll, getOne, newCart, addProduct, deleteOne, deleteProduct, putProductsBody, putQuantityBody, deleteAllProducts} from '../controllers/cartController.js';

const cartRouter = Router();

cartRouter.get('/', getAll);
cartRouter.get('/:cid', getOne);

cartRouter.post('/', newCart);
cartRouter.post('/:cid/products/:pid', addProduct);

cartRouter.put('/:cid', putProductsBody);
cartRouter.put('/:cid/products/:pid', putQuantityBody);

cartRouter.delete('/:cid/products/:pid', deleteProduct);
cartRouter.delete('/:cid', deleteAllProducts);

export default cartRouter;