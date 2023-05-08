import mongoose, {Schema} from 'mongoose';

const cartsCollection = 'carts';

const cartSchema = new Schema({
    products: {type: Schema.Types.Array, default: []}
    // products: {type: Schema.Types.String, require: true}    
});

// const productSchema = new Schema({
//     title: {type: Schema.Types.String, require: true},
//     description: {type: Schema.Types.String, require: true},
//     category: {type: Schema.Types.String, require: true},
//     price: {type: Schema.Types.Number, require: true},
//     thumbnail: {type: Schema.Types.String, default: 'image unavailable'},
//     code: {type: Schema.Types.String, require: true},
//     stock: {type: Schema.Types.Number, require: true},
//     status: {type: Schema.Types.Boolean, default: true}
// });

export default mongoose.model(cartsCollection, cartSchema);
