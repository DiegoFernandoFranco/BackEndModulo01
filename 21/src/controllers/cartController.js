import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";
import idValidation from "../validations/idValidation.js";

export const getAll = async (req,res) => {
    try {
        const manager = new CartManager();
        let carts = await manager.getAll();
        res.send({result: 'success', payload: carts})

    }   catch (error) {
        res.send({status: 'error', message: 'No se pueden mostrar los carritos por motivos desconocidos'})
    };
};

export const getOne = async (req,res, next) => { // error handler listo
    try {
        const {cid} = req.params;
        const idValidateResult = await idValidation.parseAsync(cid);
        
        const manager = new CartManager();
        const cart = await manager.getOne(cid);
        
        res.send({status: 'success', payload: cart})
        
    }   catch (error) {
            next (error)
    }
};

export const newCart = async (req, res) => {
    try {
        const manager = new CartManager();
        const result = await manager.newCart();    
        // console.log(result)
        res.send({status: 'success', message: 'New Cart Created', payload: result});

    }   catch (error) {
        res.send({status: 'error', error: 'No se pudo crear el nuevo carrito'});
    }

};

export const addProduct = async (req, res) => {

    const {cid, pid} = req.params;    
    // await idValidation.parseAsync (req.params.cid)
    
    try {
        if (cid.length !== 24) {
            return res.send({status: 'error', message: `Cart Id necesita 24 Caracteres, tiene ${cid.length}`})            
        }
        
        const manager = new CartManager();
        const existCart = await manager.getOne(cid);

        if (existCart == false) {
            return res.send({status: 'error', message: 'Cart ID No existe'})            
        }
        
        const productManager = new ProductManager();
        
        if (pid.length !== 24) {
            return res.send({status: 'error', message: `Product ID necesita 24 Caracteres, tiene ${pid.length}`})            
        }
        
        const valid = await manager.isValid(pid);
        if (!valid) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        
        const existProduct = await productManager.getOne(pid);
        if (!existProduct) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }

        const result = await manager.addProduct(cid, pid);

        res.send({status: 'success', message: 'Product added to Cart', payload: result})

    }   catch (error) {            
            res.send({status: 'error', error: error.message})
    }
};
  
export const updateOne = async (req, res) => {
    let {pid} = req.params;

    const manager = new CartManager();
    let dataToReplace = req.body;
    if (!dataToReplace.title||!dataToReplace.description||!dataToReplace.category||!dataToReplace.price||!dataToReplace.code||!dataToReplace.stock) {
        return res.send({status: 'error', error: 'Incomplete values'});
    }

    let result = await manager.updateOne(pid, dataToReplace)
    res.send({status: 'success', payload: result})
};

export const deleteOne = async (req, res) => { // error handler
    let {cid} = req.params;

    await idValidation.parseAsync(cid);
    
    const manager = new CartManager();
    
    const result = await manager.deleteOne(cid)
    res.send({status: 'success', message: 'Cart deleted'})
};

export const deleteAll = async (req, res) => {
    const manager = new CartManager();
    const result = await manager.deleteAll();
    res.send({status: 'success', message: 'All Carts Erased'})
}

//nuevo
export const deleteProduct = async (req, res) => {
    try {

        let {cid, pid} = req.params;

        if (cid.length !== 24) {
            return res.send({status: 'error', message: `Cart Id necesita 24 Caracteres, tiene ${cid.length}`})            
        }
            
        const manager = new CartManager();
        const productManager = new ProductManager();
        const cidValid = await manager.isValid(cid);
        if (!cidValid) {
            return res.send({status: 'error', Error, message: 'Cart Id No existe'})
        }

        const existCart = await manager.getOne(cid);

        if (pid.length !== 24) {
            return res.send({status: 'error', message: 'Product ID con numero incorrecto de caracteres'})            
        }
            
        const pidValid = await manager.isValid(pid);
        if (!pidValid) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        
        const existProduct = await productManager.getOne(pid);
        if (!existProduct) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }

        // const manager = new CartManager();
        const result = await manager.deleteProduct(cid, pid);
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
        const manager = new CartManager();

        const products = req.body;
        const {cid} = req.params;


        // valida cart id
        if (cid.length !== 24) {
            return res.send({status: 'error', message: `Cart Id necesita 24 Caracteres, tiene ${cid.length}`})            
        }
        
        const cidValid = await manager.isValid(cid);
        if (!cidValid) {
            return res.send({status: 'error', Error, message: 'Cart Id no existe'})
        }

        const existCart = await manager.getOne(cid);

        if (existCart == false) {
            return res.send({status: 'error', message: 'Cart ID No existe'})            
        }


        // valida producto id
        const productManager = new ProductManager();
        const pid = products[0]['_id'];
        
        if (pid.length !== 24) {
            return res.send({status: 'error', message: `Product ID necesita 24 Caracteres, tiene ${pid.length}`})            
        }
        
        const pidValid = await manager.isValid(pid);
        if (!pidValid) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        
        const existProduct = await productManager.getOne(pid);
        if (!existProduct) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }

        const result = await manager.putProductsBody(cid, products);
        res.send({status: 'success', message: `Product quantity updated on Cart ${cid}`, payload: result})
       
    } catch (error) {
        res.send({status: 'error', message: `I'm pretty sure is User Error, or maybe not`, error: error})
    }
}

export const putQuantityBody = async (req, res, next) => {
    try {
        const manager = new CartManager();

        const {cid, pid} = req.params;
        const {quantity} = req.body;

        await idValidation.parseAsync(cid);

        const existCart = await manager.getOne(cid);

        // validacion producto id
        const productManager = new ProductManager();
        
        if (pid.length !== 24) {
            return res.send({status: 'error', message: `Product ID necesita 24 Caracteres, tiene ${pid.length}`})            
        }
        
        const pidValid = await manager.isValid(pid);
        if (!pidValid) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        
        const existProduct = await productManager.getOne(pid);
        if (!existProduct) {
            return res.send({status: 'error', Error, message: 'Product Id No existe'})
        }
        // fin validacion producto id
        const result = await manager.putQuantityBody(cid, pid, quantity);
        res.send({status: 'success', message: `Product quantity updated on Cart`, payload: result})

    }   catch (error) {
            next(error);
            // res.send({status: 'error', message: `I'm pretty sure is User Error, or maybe not`, error: error})
    }
    
};

export const deleteAllProducts = async (req, res, next) => { // error handler listo
    try {
        const manager = new CartManager();

        const {cid} = req.params;        
        await idValidation.parseAsync(cid);
        const existCart = await manager.getOne(cid);

        const result = await manager.deleteAllProducts(cid);

        res.send({status: 'success', message: `Cart was emptied`, payload: result});

    }   catch (error) {
            next  (error);
    }
}