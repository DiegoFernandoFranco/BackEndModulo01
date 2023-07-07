// import ProductMongooseDao from "../daos/ProductMongooseDao.js";
import CartMongooseDao from "../../data/daos/CartMongooseDao.js";
import ProductMongooseDao from "../../data/daos/ProductMongooseDao.js";


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
        return this.cartDao.addProduct(cid, pid);
    }

    async updateOne(cid, dataToReplace) {    
        return this.cartDao.updateOne(cid, dataToReplace)
    }

    async deleteOne(cid) {
        let result = await this.cartDao.deleteOne(cid)

    }
    
    // nuevo
    async isValid(id) {
        return this.cartDao.isValid(id);
    }

    async deleteProduct(cid, pid) {
        return this.cartDao.deleteProduct(cid, pid)
    }

    async putProductsBody(cid, products) {
        return this.cartDao.putProductsBody(cid, products)
    }

    async putQuantityBody (cid, pid, quantity) {
        return this.cartDao.putQuantityBody (cid, pid, quantity);
    }

    async deleteAllProducts (cid) {
        return this.cartDao.deleteAllProducts (cid);
    }
}

export default CartManager;