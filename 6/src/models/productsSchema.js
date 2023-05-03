import mongoose from "mongoose";

const productsCollection = 'products';

const productsModel = new Schema ({
    title: {type: Schema.Types.String, require: true},
    description: {type: Schema.Types.String, require: true},
    price: {type: Schema.Types.Number, require: true},
    thumbnail: {type: Schema.Types.String, require: true},
    code: {type: Schema.Types.String, require: true},
    stock: {type: Schema.Types.Number, require: true},
    status: {type: Schema.Types.Boolean, default: true},
    category: {type: Schema.Types.String, require: true},    
});

export default mongoose.model(productsCollection, productsModel);