'use strict'

import {model,Schema} from 'mongoose'

const DOCUMENT_NAME="Order"
const COLLECTIONS_NAME="Orders"

const orderSchema = new Schema({
   
    order_userId:{
        type:String,
        required:true
    },
    /*
        order_checkout={
            totalPrice,
        feeShip,
        ship_discount,
        totalDiscount,
        totalCheckout
        }
    */
    order_checkout:{
        type:Object,
        default:{}
    },

    /*
        order_shipping={
            street,
            city,
            state,
            country,
            address,
        }
    */
    order_shipping:{
        type:Object,
        default:{}
    },

    order_payment:{
        type:Object,
        default:{}
    },

    //shop_order_ids_new
    order_products:{ 
        type:Array,
        require:true
    },

    order_trackingNumber:{
        type:String,
        default:"#0000112122023"
    },

    order_status:{
        type:String,
        enum:['pending','confirmed','shipped','cancelled','delivered'],
        default:"pending"
    }

},{
    collection:COLLECTIONS_NAME,
    timestamps:true
});

const orderModel = model(DOCUMENT_NAME,orderSchema)

export {orderModel}