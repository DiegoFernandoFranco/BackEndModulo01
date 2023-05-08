import productSchema from "../models/productSchema.js";

class ProductMongooseDao {
    async getAll() {
        const productDocument = await productSchema.find();

        return productDocument.map((document) => ({
            id: document._id,
            title: document.title,
            description: document.description,
            code: document.code,
            price: document.price,
            status: document.status,
            stock: document.stock,
            category: document.category,
            thumbnails: document.thumbnails
        }))
    }
    async getAllLimit(limite) {
        const productDocument = await productSchema.find().limit(limite);

        return productDocument.map((document) => ({
            id: document._id,
            title: document.title,
            description: document.description,
            code: document.code,
            price: document.price,
            status: document.status,
            stock: document.stock,
            category: document.category,
            thumbnails: document.thumbnails
        }))
    }

    async getOne(pid) {
        const productDocument = await productSchema.findOne({_id: pid});

        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code: productDocument.code,
            price: productDocument.price,
            status: productDocument.status,
            stock: productDocument.stock,
            category: productDocument.category,
            thumbnails: productDocument.thumbnails
        }
    }

    async add(data) {
        const productDocument = await productSchema.create(data);

        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code: productDocument.code,
            price: productDocument.price,
            status: productDocument.status,
            stock: productDocument.stock,
            category: productDocument.category,
            thumbnails: productDocument.thumbnails
        }
    }

    async updateOne(pid, dataToReplace) {    
        // const productDocument = await productSchema.updateOne({_id: pid}, {$set: dataToReplace})
        const productDocument = await productSchema.findOneAndUpdate({ _id: pid }, dataToReplace, { new: true});

        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code: productDocument.code,
            price: productDocument.price,
            status: productDocument.status,
            stock: productDocument.stock,
            category: productDocument.category,
            thumbnails: productDocument.thumbnails
        }
    }

    async deleteOne(pid) {
        const productDocument = await productSchema.deleteOne({_id: pid})

    }
}

export default ProductMongooseDao;