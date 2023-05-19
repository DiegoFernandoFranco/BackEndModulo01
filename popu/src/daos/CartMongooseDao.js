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
        
        const cartDocument = await cartSchema
            .findOne({_id: cid})
            .populate(['products._id']);

        return {
            id: cartDocument._id,
            products: cartDocument.products
        };
    };

    async newCart(data) {
        const cartDocument = await cartSchema.create(data);

        return {
            id: cartDocument._id,
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
        const xxx = await cartSchema.findOne({ _id: cid, "products._id": pid });
        
        // si el producto tiene cantidad 1 no puedo restar asi que lo elimino, no puede estar con 0,
        // por lo menos asi lo veo yo. Que Dios me juzgue.
         
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