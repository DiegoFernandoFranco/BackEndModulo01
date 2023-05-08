import {Router} from 'express';
// import { userModel } from '../models/user.model.js';
// import userModel from '../models/user.model.js';
import {getAll, getOne, newCart, addProduct, deleteOne, deleteAll} from '../controllers/cartController.js';

const cartRouter = Router();

// userRouter.get('/', UserController.listAll);
cartRouter.get('/', getAll);
cartRouter.get('/:cid', getOne);
cartRouter.post('/', newCart);
cartRouter.post('/:cid/product/:pid', addProduct);
// cartRouter.put('/:cid', updateOne);
cartRouter.delete('/:cid', deleteOne);
cartRouter.delete('/', deleteAll);

export default cartRouter;