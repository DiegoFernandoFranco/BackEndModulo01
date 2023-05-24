import cartSchema from '../models/cartSchema.js';
import productSchema from '../models/productSchema.js';
import ProductMongooseDao from './ProductMongooseDao.js';
import mongoose from 'mongoose';

class CartMongooseDao {
    async getAll() {
        const cartDocument = await cartSchema
            .find()
            .populate(['products._id']);

        return cartDocument.map((document) => ({
            'Cart id': document._id,
            products: document.products
        }))
    }
    
    async isValid(id) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {           
            return false;        
        }
        return true;

    }

    async getOne(cid) {        
        // comprobación de si es un id valido tipo ObjectId- evita error Cast to ObjectId failed for value
        // It has to be either 12 byte binary string, or a 24 hex byte string
        // https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.isValidObjectId()
        // if (!cid.match(/^[0-9a-fA-F]{24}$/)) {           
        //     // console.log('_id invalido') // borrar
        //     return false;        
        // }

        const cartDocument = await cartSchema
            .findOne({_id: cid.toString()})
            .populate(['products._id']);
        
        if (cartDocument == {} || cartDocument == null || !cartDocument) {
            return false;
        }
        return {
            'Cart id': cartDocument._id,
            products: cartDocument.products
        };

        
    };
    
    async newCart(data) {
        const cartDocument = await cartSchema.create(data);

        return {
            'Cart id': cartDocument._id,
            products: []
        }
    }
   
    async addProduct(cid, pid) {
        const xxx = await cartSchema.findOne({ _id: cid, "products._id": pid });
        
        let CartDocument;

        if (xxx) {
            CartDocument = await cartSchema.findOneAndUpdate(
            {_id: cid, "products._id": pid},
            {$inc:{"products.$.quantity":1}},
            {new: true});            

        }   else {
            CartDocument = await cartSchema.findOneAndUpdate(
            {_id: cid},
            {$push:{products: {_id: pid, quantity:1}}},
            {new: true})
        }
        
        return {
            'Cart id': CartDocument._id,
            products: CartDocument.products
        }
   }

    async deleteOne(cid) {
        const cartDocument = await cartSchema.deleteOne({_id: cid})

    }

    async deleteAll() {
        const cartDocument = await cartSchema.deleteMany({})
        // db.inventory.deleteMany({})

    }

    // nuevo
    async deleteProduct(cid, pid) {
        // console.log(cid, pid)
        const existProduct = await cartSchema.findOne({ _id: cid, "products._id": pid });
        // console.log(existProduct)
        
        // si el producto tiene cantidad 1 no puedo restar asi que lo elimino, no puede estar con 0,
        // por lo menos asi lo veo yo. Que Dios me juzgue.
        if (!existProduct) {
            return false;
        }
        if (xxx.products[0].quantity === 1) {
            await cartSchema.updateOne(
                {_id:cid},
                {$pull:{products: {_id:pid,quantity:1}}}
            )
        }
        
        let CartDocument;

        if (xxx) {
            CartDocument = await cartSchema.findOneAndUpdate(
            {_id: cid, "products._id": pid},
            {$inc:{"products.$.quantity": -1}},
            {new: true});            

        }   else {
            CartDocument = await cartSchema.findOneAndUpdate(
                {_id: cid},
                {$push:{products: {_id: pid, quantity:1}}},
                {new: true}
            );
        }
        
        return {
            'Cart id': CartDocument._id,
            products: CartDocument.products
        }

    }

    async putProductsBody(cid, products) {
        // console.log(products)
        let CartDocument = await cartSchema.findOneAndUpdate (
            {_id: cid},
            {$set: {products: products} },
            {new: true});

        return {
            'Cart id': CartDocument._id,
            products: CartDocument.products
        }
    };

    async putQuantityBody (cid, pid, quantity) {

        const CartDocument = await cartSchema.findOneAndUpdate(
            {_id: cid, "products._id": pid},
            {$set:{"products.$.quantity": quantity}},
            {new: true}
        );

        return {
            'Cart id': CartDocument._id,
            products: CartDocument.products
        }
    }

    async  deleteAllProducts (cid) {
        return await cartSchema.findByIdAndUpdate(
            { _id: cid },
            { $set: { products: [] } },
            { new: true }
        );
  }
}
export default CartMongooseDao;