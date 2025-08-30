"use strict";

import { model, Schema } from "mongoose";
import slugify from "slugify";

import { NextFunction } from "express";
const DOCUMENT_NAME = "SPU";
const COLLECTION_NAME = "SPUs";

const productSchema = new Schema(
  {
    product_id: { type: String, default: "" },
    product_name: {
      type: String,
      required: true,
    },
    product_slug: {
      type: String,
    },
    product_ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above 0"],
      max: [5, "Rating must be above 5"],
      set: (val: number) => Math.round(val * 10) / 10,
    },
    product_variations: {
      type: Array,
      default: [],
    },
    /*
            tier_variation:[
                {
                    image:[],
                    name:'color',
                    options:['red','green','blue']
                },
                {
                    name:'size',
                    options:['S','M'],
                    images:[]
                }
            ]
        */
    product_thumb: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    // product_type: {
    //     type: String,

    //     enum: ['Electronic', 'Clothing', 'Furniture']
    // },
    product_shop: {
      type: String,
      required: true,
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    /*
            {
                attribute_id:12345 //stype ao [the thao, han quoc, da hoi]
                attribute_value:[
                    {
                        value_id:123
                    }
                ]
            }
        */
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    product_sold: {
      type: Number,
      default: 0,
    },
    product_category: { type: Array, default: [] },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
//create index for product
productSchema.index({ product_name: "text", product_description: "text" });

//Document middleware:run before .save() and .create()...
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

const spuModel = model(DOCUMENT_NAME, productSchema);

export { spuModel };

