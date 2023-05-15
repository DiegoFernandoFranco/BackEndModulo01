import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";

export const getAll = async (req,res) => {
    try {
        const manager = new CartManager();
        let carts = await manager.getAll();
        res.send({result: 'success', payload: carts})

    }   catch (error) {
        console.log('Cannot get users with mongoose: ' + error);
    };
};

//     res.send({status: 'fail', error: `we cannot tell what error is, don't ask why, there is no why`})
export const getOne = async (req,res) => {     
    try {
        const {cid} = req.params;

        const manager = new CartManager();
        const cart = await manager.getOne(cid);
        
        res.send({status: 'success', payload: cart})

    }   catch (error) {
        res.send({status: 'error', message: 'No Cart, No Fun!!!'})
    };
};

export const newCart = async (req, res) => {
    try {
        const manager = new CartManager();
        const result = await manager.newCart();    
        console.log(result)
        res.send({status: 'success', message: 'New Cart Created', payload: result});

    }   catch (error) {
        res.send({status: 'error', error: 'error, estamos trabajando para solucionarlo'});
    }

};

export const addProduct = async (req, res) => {
    const {cid, pid} = req.params;
    try {

        const manager = new CartManager();        
        const existCart = await manager.getOne(cid);                    
        // res.send({status: 'success', message: 'Cart is Good!!!'})
    }   catch (error) {               
        res.send({status: 'error', message: 'No Cart, No Fun!!!', error: error})
        // res.send({status: 'error', error, message: Object.keys(error)})
    }

    try {
        const productManager = new ProductManager();
        const existProduct = await productManager.getOne(pid);
        // res.send({status: 'success', message: 'Product Ok'})        

    }   catch (error) {
        res.send({status: 'error', message: 'No Product', error: error})
    }

    try {
        const manager = new CartManager();
        const result = await manager.addProduct(cid, pid);
        res.send({status: 'success', message: 'Product add to Cart', payload: result})

    }   catch (error) {
        res.send({status: 'error', message: 'We have a Problem', error: error})
    }

    // const toTheCart = await manager.addProduct(cid, pid);

};



    // if (!existCart) {
    //     // throw new Error(`Cart ${cid} doesn't exist`);
    //     res.send({status: 'error', message: 'Cart not found'})
    // }   else {

    //     res.send({status: 'success', message: 'existe carrito'});
    // };        

        // const productManager = new ProductManager();
        // const existProduct = await productManager.getOne(pid);
        // console.log(existProduct);
        // res.send({status: 'success', message: 'existe producto'});

        // res.send({status: 'success', message: 'existe carrito'});

        // res.send({status: 'error', message: error});
    
    // if (!existCart) {
    //     res.send({status: 'error', error: 'No existe ese carrito'});
    // }

    // const productManager = new ProductManager();
    // const existProduct = await productManager.getOne(pid);
    
    // if (!existProduct) {
    //     res.send({status: 'error', error: 'No existe ese producto'});
    // }
    // console.log(existProduct);

    // res.send({status: 'success', message: 'existe carrito y producto'});


    // const existProduct = await manager

    // try {
    //     const {cid, pid} = req.params;
    //     const manager = new CartManager();
    //     const result = await manager.addProduct(cid, pid);
    //     res.send({status: 'success', payload: result})

    // }   catch (error) {
    //     res.send({status: 'error', error: 'rorre, estamos trabajando para solucionarlo'});
    // }
     


// export const updateOne = async (req, res) => {
//     let {pid} = req.params;

//     const manager = new CartManager();
//     let dataToReplace = req.body;
//     if (!dataToReplace.title||!dataToReplace.description||!dataToReplace.category||!dataToReplace.price||!dataToReplace.code||!dataToReplace.stock) {
//         return res.send({status: 'error', error: 'Incomplete values'});
//     }

//     let result = await manager.updateOne(pid, dataToReplace)
//     res.send({status: 'success', payload: result})
// };

export const deleteOne = async (req, res) => {
    let {cid} = req.params;

    const manager = new CartManager();
    // res.send({status: 'success', payload: uid.length})    
    if (cid.length !== 24) {
        res.send({status: 'error', error: 'Incorrect id or not Exist'})
    }
    let result = await manager.deleteOne(cid)
    res.send({status: 'success', message: 'Cart deleted'})
};

export const deleteAll = async (req, res) => {
    const manager = new CartManager();
    const result = await manager.deleteAll();
    res.send({status: 'success', message: 'All Carts Erased'})
}

//nuevo
export const deleteProduct = async (req, res) => {
    let {cid, pid} = req.params;

    const manager = new CartManager();
    const result = await manager.deleteProduct(cid, pid);
    res.send({status: 'success', message: 'Product remove from Cart', payload: result})
}

export const putProductsBody = async (req, res) => {

    try {
        const products = req.body;
        const {cid} = req.params;
        // console.log(cid, products)

        const manager = new CartManager();
        const result = await manager.putProductsBody(cid, products);

        res.send({status: 'success', message: `Product quantity updated on Cart ${cid}`, payload: result})

    } catch (error) {
        res.send({status: 'error', message: `I'm pretty sure is User Error, or maybe not`, error: error})
        // res.status(500).send({ error: error.message });
    }
}

export const putQuantityBody = async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const {quantity} = req.body;

        const manager = new CartManager();
        const result = await manager.putQuantityBody(cid, pid, quantity);
        res.send({status: 'success', message: `Product quantity updated on Cart`, payload: result})

    }   catch (error) {
        res.send({status: 'error', message: `Oh No, Oh No, Oh Yeah`, error: error})

    }    
};

export const deleteAllProducts = async (req, res) => {
    try {
        const {cid} = req.params;
        const manager = new CartManager();
        const result = await manager.deleteAllProducts(cid);

        res.send({status: 'success', message: `Cart was emptied`, payload: result});

    }   catch (error) {
            res.send({status: 'error', message: `No se pudieron borrar todos los carritos`, error: error})

    }
}