import CartManager from "../managers/cartManager.js";

export const getAll = async (req,res) => {
    try {
        const manager = new CartManager();
        let carts = await manager.getAll();
        res.send({result: 'success', payload: carts})

    }   catch (error) {
        console.log('Cannot get users with mongoose: ' + error);
    };
};

export const getOne = async (req,res) => {
    try {
        const {cid} = req.params;

        const manager = new CartManager();
        const cart = await manager.getOne(cid);
        res.send({result: 'success', payload: cart})

    }   catch (error) {
        console.log('Cannot get users with mongoose: ' + error);
    };
};

export const newCart = async (req, res) => {
    // let {firstName, lastName} = req.body;

    // const manager = new CartManager();

    // if (!firstName||!lastName) {
    //     return res.send({status: 'error', error: 'Incomplete values'});
    // };

    // let result = await manager.add({
    //     firstName,
    //     lastName
    // });
    const manager = new CartManager();
    const result = await manager.newCart()
    

    res.send({status: 'success', payload: result});
};

export const addProduct = async (req, res) => {
    const {cid, pid} = req.params;

    const manager = new CartManager();
    const result = await manager.addProduct(cid, pid);

    res.send({status: 'success', payload: result});    
}

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
    res.send({status: 'success', messager: 'All Carts Erased'})
}