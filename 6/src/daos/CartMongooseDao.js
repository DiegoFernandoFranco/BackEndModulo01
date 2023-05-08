import cartSchema from '../models/cartSchema.js';

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
   
    async addProduct(cid, pid) {
        const cartDocument = await cartSchema.findOneAndUpdate(
            { _id: cid },
            { $push: { products: { _id: pid, quantity: 1 } }},
            { new: true}
        )

        return {
            id: cartDocument._id,
            products: cartDocument.products
        }
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