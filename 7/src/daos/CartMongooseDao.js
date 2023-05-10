import cartSchema from '../models/cartSchema.js';
import productSchema from '../models/productSchema.js';
import ProductMongooseDao from './ProductMongooseDao.js';

class CartMongooseDao {
    async getAll() {
        const cartDocument = await cartSchema.find();

        return cartDocument.map((document) => ({
            id: document._id,
            products: document.products
        }))
    }

    async getOne(cid) {
        const cartDocument = await cartSchema.findOne({_id: cid});

        return {
            id: cartDocument._id,
            products: cartDocument.products,
        }
    }

    async newCart(data) {
        const cartDocument = await cartSchema.create(data);

        return {
            id: cartDocument._id,
            products: []
        }
    }
   
    // async addProduct(cid, pid) {
    async addProduct(pid) {
        const productDocument = await ProductMongooseDao.getOne(pid);
        // console.log(productDocument)

        return {
            id: productDocument._id,
            title: productDocument.title
        }

        // const productDocument = await productSchema.find({_id: pid})
        // console.log(productDocument)
        //   const product = await productsModel.findOne({ _id: pid });


        // const cartDocument = await cartSchema.findOneAndUpdate(
        //     {_id: cid},
        //     {$push: {products: {_id: pid, quantity: 1} }},
        //     {new: true}
        // )

        // return {
        //     id: cartDocument._id,
        //     products: cartDocument.products
        // }

        // const cartDocument = db.products.find({_id: '64581f3a307463575c4673d6'})
        // console.log(cartDocument)
   }

    async deleteOne(cid) {
        const cartDocument = await cartSchema.deleteOne({_id: cid})

    }

    async deleteAll() {
        const cartDocument = await cartSchema.deleteMany({})
        // db.inventory.deleteMany({})

    }
}

export default CartMongooseDao;