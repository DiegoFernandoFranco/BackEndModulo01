import mongoose, {Schema} from 'mongoose';

const cartsCollection = 'carts';

const cartSchema = new Schema({
    // original sin populate, funciona perfecto
    // products: {type: Schema.Types.ObjectId, default: []}

    products: {
    type: [
      {
        _id: {type: Schema.Types.ObjectId, ref: 'products'},
        quantity: {type: Schema.Types.Number}
      }
    ],
    default: []
  }  
});

export default mongoose.model(cartsCollection, cartSchema);
