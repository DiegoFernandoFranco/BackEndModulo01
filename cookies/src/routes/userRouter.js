import {Router} from 'express';
import {list, getOne, save, update, deleteOne} from '../controllers/userController.js';

const userRouter = Router();

userRouter('/', list);
userRouter('/:uid', getOne);
userRouter('/', save);
userRouter('/:uid', update);
userRouter('/uid', deleteOne);

export default userRouter;