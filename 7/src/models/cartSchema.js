import mongoose, {Schema} from 'mongoose';

const cartsCollection = 'carts';

const cartSchema = new Schema({
    // original sin populate, funciona perfecto
    // products: {type: Schema.Types.ObjectId, default: []}

    // products: [{type: Schema.Types.ObjectId, ref: 'products'}, 
    //     {quantity: {type: Schema.Types.Number}}, default: []]

    // no puedo agregar en el array products la key quantity
    
    // products: [
    //       {_id:{type: Schema.Types.ObjectID, ref:'products', quantity: {type: Schema.Types.Number} }, default:[] }
    // ]
    
     products: {
    type: [
      {
        _id: {type: Schema.Types.ObjectId, ref: 'products'},
        quantity: {type: Schema.Types.Number}
      }
    ],
    default: []
  }


    // products: [
    //       {_id:{type: Schema.Types.ObjectID, ref:'products', quantity: {type: Schema.Types.Number} }, default:[] }
    // ]
  
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
