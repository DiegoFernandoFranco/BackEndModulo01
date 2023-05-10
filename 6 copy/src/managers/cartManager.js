// import ProductMongooseDao from "../daos/ProductMongooseDao.js";
import CartMongooseDao from "../daos/CartMongooseDao.js";
import ProductManager from './productManager.js';
import ProductMongooseDao from "../daos/ProductMongooseDao.js";


class CartManager {
    constructor () {
        this.cartDao = new CartMongooseDao();
        this.productDao = new ProductMongooseDao();
    }

    async getAll() {
        return this.cartDao.getAll();
    }

    async getOne(cid) {
        return this.cartDao.getOne(cid);
    }

    async newCart() {
        return this.cartDao.newCart({id: 11});
    }
    async addProduct(cid, pid) {
        // return this.productDao.getOne(pid);
        // return this.productDao.getOne(pid);
        const busqProducto = await this.productDao.getOne(pid);
        // if (!checkProduct) {
        //     console.log('producto inexistente')
        // }
        // const products = new ProductManager;        
        // const checkProducto = this.productDao.getOne(pid);
        // return this.productDao.getOne(pid);
        
        // console.log(checkProducto)
        
        // const xxx = this.cartDao.addProduct(pid);
        // console.log(xxx);
        // return xxx




        // return this.cartDao.addProduct(cid, pid);        
    }
    // async updateOne(cid, dataToReplace) {    
    //     return this.cartDao.updateOne(cid, dataToReplace)
    // }

    async deleteOne(cid) {
        let result = await this.cartDao.deleteOne(cid)

    }

    async deleteAll() {
        return this.cartDao.deleteAll()
    }
}

export default CartManager;