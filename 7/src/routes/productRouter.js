import {Router} from 'express';
import {getAll, getOne, add, updateOne, deleteOne} from '../controllers/productController.js';

const productRouter = Router();

productRouter.get('/', getAll);
productRouter.get('/:pid', getOne);
productRouter.post('/', add);
productRouter.put('/:pid', updateOne);
productRouter.delete('/:pid', deleteOne);

export default productRouter;