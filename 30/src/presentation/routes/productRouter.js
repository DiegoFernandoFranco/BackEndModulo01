import {Router} from 'express';
import {getAll, getAllPaginate, getOne, add, updateOne, deleteOne} from '../controllers/productController.js';

const productRouter = Router();

// productRouter.get('/', getAll);
productRouter.get('/', getAllPaginate);
productRouter.get('/:pid', getOne);
productRouter.post('/', add);
productRouter.put('/:pid', updateOne);
productRouter.delete('/:pid', deleteOne);

export default productRouter;