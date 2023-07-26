import mongoose, {Schema} from 'mongoose';

const cartsCollection = 'carts';

const cartSchema = new Schema({
    
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
