'use strict'


import { model, Schema } from "mongoose";
import slugify from 'slugify'

import { NextFunction } from "express";
const DOCUMENT_NAME = "Product"
const COLLECTION_NAME = "Products"

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_slug: {
        type: String,
    },
    product_ratingsAverage: {
        type: Number,
        default: 0,
        min: [0, "Rating must be above 0"],
        max: [5, "Rating must be above 5"],
        set: (val: number) => Math.round(val * 10) / 10
    },
    product_variation: {
        type: Array,
        default: []
    },
    product_thumb: {
        type: String,
        required: true
    },
    product_description: {
        type: String,

    },
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_type: {
        type: String,
        required: true,
        enum: ['Electronic', 'Clothing', 'Furniture']
    },
    product_shop: {
        type: String,
        required: true
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true
    },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    product_sold: {
        type: Number,
        default: 0,
    }


}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);
//create index for product
productSchema.index({ product_name: 'text', product_description: 'text' })

//Document middleware:run before .save() and .create()...
productSchema.pre('save', function (next) { this.product_slug = slugify(this.product_name, { lower: true }); next() })

// type = clothing
const clothingSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    size: { type: String },
    material: String,

},
    {
        timestamps: true,
        collection: "Clothings"
    }
)


//type = electronic
const electronicSchema = new Schema({
    manufacturer: {
        type: String,
        required: true
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    model: String,
    color: String,

},

    {
        timestamps: true,
        collection: "Electronics"
    }
)

const furnitureSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    size: { type: String },
    material: String,

},

    {
        timestamps: true,
        collection: "Furnitures"
    }
)
const productModel = model(DOCUMENT_NAME, productSchema);
const clothingModel = model("Clothing", clothingSchema);
const electronicModel = model("Electronic", electronicSchema);
const furnitureModel = model("Furniture", furnitureSchema);

export {
    productModel,
    clothingModel,
    electronicModel,
    furnitureModel,
}