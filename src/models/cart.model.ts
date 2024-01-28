'use strict'

import {model,Schema} from 'mongoose'

const DOCUMENT_NAME="Cart"
const COLLECTIONS_NAME="Carts"

const cartSchema = new Schema({
    cart_state:{
        type:String,
        required:true,
        enum:['active','completed','failed','pending'],
        default:'active'
    },
    cart_products:{
        type:Array,
        required:true,
        default:[]
    },
    cart_count_product:{
        type:Number,
        default:0
    },
    cart_userId:{
        type:String,
        required:true
    }
},{
    collection:COLLECTIONS_NAME,
    timestamps:true
});

const cartModel = model(DOCUMENT_NAME,cartSchema)

export {cartModel}