import CartManager from '../../domain/managers/cartManager.js';
import ProductManager from '../../domain/managers/productManager.js';
import {cidValidation, pidValidation} from '../../domain/validations/idValidation.js';
// import CartManager from "../managers/cartManager.js";
// import ProductManager from "../managers/productManager.js";
// import {cidValidation, pidValidation} from "../validations/idValidation.js";

export const getAll = async (req, res, next) => {
    try {
        const cartManager = new CartManager();
        let carts = await cartManager.getAll();
        res.send({result: 'success', payload: carts})

    }   catch (error) {
            next(error);
    };
};

export const getOne = async (req,res, next) => { // error handler listo
    try {
        const {cid} = req.params;
        const idValidateResult = await cidValidation.parseAsync(cid);
        
        const cartManager = new CartManager();
        const cart = await cartManager.getOne(cid);
        
        res.send({status: 'success', payload: cart})
        
    }   catch (error) {
            next (error)
    }
};

export const newCart = async (req, res) => {
    try {
        const cartManager = new CartManager();
        const result = await cartManager.newCart();    
        res.send({status: 'success', message: 'New Cart Created', payload: result});

    }   catch (error) {
        res.send({status: 'error', error: 'No se pudo crear el nuevo carrito'});
    }

};

export const addProduct = async (req, res, next) => {    
    const { cid, pid } = req.params;
  try {
    // const pruebaZod = await pidValidation.safeParseAsync(pid);

    // console.log(pruebaZod)

    // await cidValidation.parseAsync(cid);
    await pidValidation.parseAsync(pid);
    
    // const cartManager = new CartManager();
    // const existCart = await cartManager.getOne(cid);

    // const productManager = new ProductManager();        
    // const existProduct = await productManager.getOne(pid);

    // const result = await cartManager.addProduct(cid, pid);
    
    // res.status(200).json({status: 'success', message: 'Product added to cart successfully', payload: result});
    res.status(200).json({status: 'success', message: 'Product added to cart successfully', payload: pid});

  } catch (error) {
    // if (error.name === 'ZodError') {
    //   const validationError = error.issues[0];
    //   if (validationError && validationError.validation === 'regex' && validationError.message === 'Invalid') {
    //     if (cidValidation.safeParse(cid).success === false) {
    //       return res.status(400).json({ status: 'error', message: 'cid Not Found' });
    //     } else if (pidValidation.safeParse(pid).success === false) {
    //       return res.status(400).json({ status: 'error', message: 'pid Not Found' });
    //     }
    //   }
    // }

    next(error);
  }
};

export const updateOne = async (req, res) => {
    await cidValidation.parseAsync(cid);

    let {pid} = req.params;

    const cartManager = new CartManager();
    let dataToReplace = req.body;
    if (!dataToReplace.title||!dataToReplace.description||!dataToReplace.category||!dataToReplace.price||!dataToReplace.code||!dataToReplace.stock) {
        return res.send({status: 'error', error: 'Incomplete values'});
    }

    let result = await cartManager.updateOne(pid, dataToReplace)
    res.send({status: 'success', payload: result})
};

export const deleteOne = async (req, res) => { // error handler
    let {cid} = req.params;

    await cidValidation.parseAsync(cid);
    
    const cartManager = new CartManager();
    
    const result = await cartManager.deleteOne(cid)
    res.send({status: 'success', message: 'Cart deleted'})
};


//nuevo
export const deleteProduct = async (req, res) => {
    try {

        let {cid, pid} = req.params;

        await cidValidation.parseAsync(cid);
            
        const cartManager = new CartManager();
        const productManager = new ProductManager();        

        const existCart = await cartManager.getOne(cid);

        if (pid.length !== 24) {
            return res.send({status: 'error', message: 'Product ID con numero incorrecto de caracteres'})            
        }
            
        const pidValid = await cartManager.isValid(pid);
        if (!pidValid) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        
        const existProduct = await productManager.getOne(pid);
        if (!existProduct) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }

        // const cartManager = new CartManager();
        const result = await cartManager.deleteProduct(cid, pid);
        if (!result) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        res.send({status: 'success', message: 'Product remove from Cart', payload: result})

    }   catch (error) {
            res.send({status: 'error', error: error.message})

    }
}

export const putProductsBody = async (req, res) => {

    try {
        await cidValidation.parseAsync(cid);

        const products = req.body;
        const {cid} = req.params;

        const cartManager = new CartManager();
        const existCart = await cartManager.getOne(cid);

         // valida producto id
        const productManager = new ProductManager();
        const pid = products[0]['_id'];
        
        if (pid.length !== 24) {
            return res.send({status: 'error', message: `Product ID necesita 24 Caracteres, tiene ${pid.length}`})            
        }
        
        const pidValid = await cartManager.isValid(pid);
        if (!pidValid) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        
        const existProduct = await productManager.getOne(pid);
        if (!existProduct) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }

        const result = await cartManager.putProductsBody(cid, products);
        res.send({status: 'success', message: `Product quantity updated on Cart ${cid}`, payload: result})
       
    } catch (error) {
        res.send({status: 'error', message: `I'm pretty sure is User Error, or maybe not`, error: error})
    }
}

export const putQuantityBody = async (req, res, next) => {
    try {
        const cartManager = new CartManager();

        const {cid, pid} = req.params;
        const {quantity} = req.body;

        await cidValidation.parseAsync(cid);

        const existCart = await cartManager.getOne(cid);

        // validacion producto id
        const productManager = new ProductManager();
        
        if (pid.length !== 24) {
            return res.send({status: 'error', message: `Product ID necesita 24 Caracteres, tiene ${pid.length}`})            
        }
        
        const pidValid = await cartManager.isValid(pid);
        if (!pidValid) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        
        const existProduct = await productManager.getOne(pid);
        if (!existProduct) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        // fin validacion producto id
        const result = await cartManager.putQuantityBody(cid, pid, quantity);
        res.send({status: 'success', message: `Product quantity updated on Cart`, payload: result})

    }   catch (error) {
            next(error);
            // res.send({status: 'error', message: `I'm pretty sure is User Error, or maybe not`, error: error})
    }
    
};

export const deleteAllProducts = async (req, res, next) => { // error handler listo
    try {
        const cartManager = new CartManager();

        const {cid} = req.params;        
        await cidValidation.parseAsync(cid);
        const existCart = await cartManager.getOne(cid);

        const result = await cartManager.deleteAllProducts(cid);

        res.send({status: 'success', message: `Cart was emptied`, payload: result});

    }   catch (error) {
            next  (error);
    }
}
