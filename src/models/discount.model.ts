import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Discount"
const COLLECTION_NAME = "Discounts"

const discountSchema = new Schema({

    discount_name: {
        type:String,
        required:true,
    },
    discount_descriptions: {
        type: String,

    },
    discount_type: {
        type: String,
        default:'fixed_amount' //percentage
    },
    discount_value: {
        type:Number,
        required:true
    },
    discount_code: {
        type:String,
        required:true
    },
    discount_start_date: {
        type:Date,
        required:true
    },
    discount_end_date: {
        type:Date,
        required:true
    },
    discount_max_use:{ //so discount toi da duoc su dung
        type:Number,
        required:true,
    },
    discount_use_count:{ //so discount da su dung
        type:Number,
        required:true,
    },
    discount_user_used:{ //discount da duoc nhung user su dung
        type:Array,
        default:[]
    },
    discount_max_per_user_use:{ 
        type:Number,
        required:true
    },
    discount_min_order_value:{
        type:Number,
        required:true
    },
    discount_shopId:{
        type:Schema.Types.ObjectId,
        ref:"Shop"
    },
    discount_is_active:{
        type:Boolean,
        required:true,
    },
    discount_applies_to:{
        type:String,
        required:true,
        enum:['all','specific']
    },
    discount_products_id:{ //so san pham duoc su dung
        type:Array,
        default:[]
    },
    discount_created_by:{
        type:String,
        required:true,
        enum:['admin','shop']
    },
    discount_is_feeship:{
        type:Boolean,
        default:false
    },
    discount_adminId:{
        type:String,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})


const discountModel = model(DOCUMENT_NAME, discountSchema)
export { discountModel };