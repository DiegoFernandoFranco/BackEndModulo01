import {Router} from 'express';
import {getAll, getOne, newCart, addProduct, deleteOne, deleteProduct, putProductsBody, putQuantityBody, deleteAllProducts} from '../controllers/cartController.js';

const cartRouter = Router();

// userRouter.get('/', UserController.listAll);
cartRouter.get('/', getAll);
cartRouter.get('/:cid', getOne);
cartRouter.post('/', newCart);
cartRouter.post('/:cid/products/:pid', addProduct);
// cartRouter.post('/:cid', addProduct);
// cartRouter.put('/:cid', updateOne);
// cartRouter.delete('/:cid', deleteOne);

cartRouter.put('/:cid', putProductsBody);
cartRouter.put('/:cid/products/:pid', putQuantityBody);

cartRouter.delete('/:cid/products/:pid', deleteProduct);
cartRouter.delete('/:cid', deleteAllProducts);

export default cartRouter;