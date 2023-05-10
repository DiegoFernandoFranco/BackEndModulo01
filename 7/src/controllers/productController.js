import ProductManager from "../managers/productManager.js";

export const getAll = async (req,res) => {   
    try {
        if(req.query.limit) {
            const manager = new ProductManager();
            const limite = req.query.limit;
            const products = await manager.getAllLimit(limite);
            res.send({result: 'success', payload: products})
        }   else {

            const manager = new ProductManager();
            let products = await manager.getAll();
            res.send({result: 'success', payload: products})
        }

    }   catch (error) {
        console.log('Cannot get users with mongoose: ' + error);
    };
};

export const getOne = async (req,res) => {
    try {
        const {pid} = req.params;

        const manager = new ProductManager();
        const product = await manager.getOne(pid);
        console.log(product)
        res.send({result: 'success', payload: product})

    }   catch (error) {        
        // console.log('Cannot get users with mongoose: ' + error);
        res.send({status: 'error', error: 'Product ID Not Found'})
    };
};

export const add = async (req, res) => {
    const body = req.body 
    
    const manager = new ProductManager();
    const result = await manager.add(body)
    if (result === 'error') {
        res.send({status: 'error', error: 'Incomplete values'})
        return
    }
    res.send({status: 'success', message: 'Product created', payload: result});
};

export const updateOne = async (req, res) => {
    let {pid} = req.params;

    const manager = new ProductManager();
    let dataToReplace = req.body;

    const result = await manager.updateOne(pid, dataToReplace);

    res.send({status: 'success', payload: result})
};

export const deleteOne = async (req, res) => {
    let {pid} = req.params;

    const manager = new ProductManager();
    if (pid.length !== 24) {
        res.send({status: 'error', error: 'Incorrect id'})
    }
    let result = await manager.deleteOne(pid)
    res.send({status: 'success', message: 'Product deleted'})
};