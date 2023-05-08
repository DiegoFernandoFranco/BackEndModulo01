// import ProductMongooseDao from "../daos/ProductMongooseDao.js";
import CartMongooseDao from "../daos/cartMongooseDao.js";


class CartManager {
    constructor () {
        this.dao = new CartMongooseDao();
    }

    async getAll() {
        return this.dao.getAll();
    }

    async getOne(cid) {
        return this.dao.getOne(cid);
    }

    async newCart() {
        return this.dao.newCart({id: 11});
    }
    async addProduct(cid, pid) {
        return this.dao.addProduct(cid, pid);        
    }
    // async updateOne(cid, dataToReplace) {    
    //     return this.dao.updateOne(cid, dataToReplace)
    // }

    async deleteOne(cid) {
        let result = await this.dao.deleteOne(cid)

    }

    async deleteAll() {
        return this.dao.deleteAll()
    }
}

export default CartManager;