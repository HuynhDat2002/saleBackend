'use strict'

import {model,Schema} from 'mongoose'

const DOCUMENT_NAME='Notification'
const COLLECTION_NAME='Notifications'

/*
ORDER-001: order successfully
ORDER-002: order failed
PROMOTION-001:new PROMOTION
SHOP-001: new product
*/

const notifySchema = new Schema({
   noti_type:{
    type:String,
    enum:['ORDER-001','ORDER-002','PROMOTION-001','SHOP-001']
   },
   noti_senderId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Shop'
   },
   noti_receivedId:{
    type:String,
    required:true,
   },
   noti_content:{
    type:String, required:true,
   },
   noti_options:{
    type:Object, default:{},
   }
},{
    timestamps:true,
    collection:COLLECTION_NAME
})

const notifyModel = model(DOCUMENT_NAME,notifySchema);
export {notifyModel}