'use strict'


import { model, Schema } from "mongoose";

import { NextFunction } from "express";
const DOCUMENT_NAME = "SKU"
const COLLECTION_NAME = "SKUs"

const skuSchema = new Schema({
    sku_id:{type:String,required:true,unique:true},
    sku_tier_idx:{type:Array,default:[0]},
    sku_default:{type:Boolean,default:false},
    sku_slug:{type:String,default:''},
    sku_sort:{type:Number,default:0},
    sku_price:{type:String,required:true},
    sku_stock:{type:Number,default:0},
    product_id:{type:String,required:true},
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isPublished: { type: Boolean, default: false, index: true, select: false },
   


}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);


const skuModel = model(DOCUMENT_NAME, skuSchema);


export {
    skuModel
}

