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
            thumbnails: document.thumbnail
        }))
    }
    
    async getAllPaginate(filtros) {
        let {limit, page, sort, query} = filtros;
        
        query || {};
        
        let paginateOptionsConcat;
        if (sort === undefined) {
            paginateOptionsConcat = await productSchema.paginate(query, {limit, page})
        }   else {           
            paginateOptionsConcat = await productSchema.paginate(query, {limit, page, sort: {price: +sort}})
        };

        let productDocument = paginateOptionsConcat;
        
        productDocument.docs = productDocument.docs.map((document) => ({
            id: document._id,
            title: document.title,
            description: document.description,
            code: document.code,
            price: document.price,
            status: document.status,
            stock: document.stock,
            category: document.category,
            thumbnails: document.thumbnail
        }));

        return productDocument;
    }

    async getOne(pid) {
        const productDocument = await productSchema.findOne({_id: pid});
        
        if (productDocument == {} || productDocument == null || !productDocument) {
            return false;
        }
        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code: productDocument.code,
            price: productDocument.price,
            status: productDocument.status,
            stock: productDocument.stock,
            category: productDocument.category,
            thumbnails: productDocument.thumbnail
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