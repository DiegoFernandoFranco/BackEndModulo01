import ProductManager from "../managers/productManager.js";


export const getAll = async (req,res) => {

    const manager = new ProductManager();
    const products = await manager.getAll()

    res.send({result: 'success', payload: products})
};

export const getAllPaginate = async (req,res) => {
    let {limit, page, sort, ...query} = req.query;

    limit = limit || 10;
    page = page || 1;

    if (Object.keys(query).includes('category')) {
        query = {category: query.category};
    }   else if (Object.keys(query).includes('status')){
        query = {status: query.status};
    };      
    const filtros = {limit: limit, page: page, query, sort}

    const manager = new ProductManager();
    const products = await manager.getAllPaginate(filtros)
    
    const {docs, ...paginationOnly} = products;

    res.send({result: 'success', payload: products.docs, paginationData: paginationOnly})  
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