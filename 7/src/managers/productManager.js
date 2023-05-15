import ProductMongooseDao from "../daos/ProductMongooseDao.js";

class ProductManager {
    constructor () {
        this.dao = new ProductMongooseDao();
    }

    async getAll() {
        return this.dao.getAll();
    }

    async getAllPaginate(filtros) {
        return this.dao.getAllPaginate(filtros);
    }

    async getOne(pid) {
        return this.dao.getOne(pid);
    }

    async add(body) {
        const {title, description, price, code, stock, category} = body;
        if (!title||!description||!price||!code||!stock||!category) {            
            return 'error'
        }

        return this.dao.add(body);
    }

    async updateOne(pid, dataToReplace) {    
        return this.dao.updateOne(pid, dataToReplace)
    }

    async deleteOne(pid) {
        let result = await this.dao.deleteOne(pid)

    }

    async getOneCode(code) {
        try {
            return this.dao.getOneCode(code);
        } catch (error) {
            throw error;
        }
    };
}

export default ProductManager;