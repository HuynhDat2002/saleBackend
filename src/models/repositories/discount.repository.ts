import {CreateDiscountCodeProps,FindAllProps,DeleteDiscountCodeProps} from '@/types'
import { discountModel } from '@/models/discount.model'
import { getSelectData,getUnSelectData,convertToObjectId} from '@/utils'
import { errorResponse } from '@/core'


const findOne=async (filter:any)=>{
    return await discountModel.findOne(filter).lean()
}

// const findByCodeAndShopId=async (code:string,shopId:string)=>{
//     return await discountModel.findOne({
//         discount_code:code,
//         discount_shopId:convertToObjectId(shopId),
        
//     })
// }

const createDiscount=async (body:CreateDiscountCodeProps)=>{
    return await discountModel.create({
        discount_name: body.name,
       discount_descriptions:body.description,
        discount_type: body.type,
        discount_value: body.type,
        discount_code: body.code,
        discount_start_date: body.start_date,
        discount_end_date: body.end_date,
        discount_max_use:body.max_use,
        discount_use_count:body.use_count,
        discount_user_used:body.user_used,
        discount_max_per_user_use:body.max_per_user_use,
        discount_min_order_value:body.min_order_value,
        discount_shopId:body.shopId,
        discount_is_active:body.is_active,
        discount_applies_to:body.applies_to,
        discount_products_id:body.applies_to === "all" ? [] : body.products_id
        
    })
}

const findAllDiscountCodeUnSelect = async ({limit=50,page=1,sort='ctime',filter,unSelect,model}:FindAllProps)=>{
    const skip = (page-1)*limit;
    const allProduct = await model
    .find(filter)
    .sort(sort ==='ctime' ? {_id:-1} :{_id:1})
    .skip(skip)
    .limit(limit)
    .select(getUnSelectData(unSelect))
    .lean()
    return allProduct;
}



const deleteDiscountCode = async ({code,shopId}:DeleteDiscountCodeProps)=>{
    return await discountModel.findOneAndDelete({
        discount_code:code,
        discount_shopId:convertToObjectId(shopId)
    })
   
}

const cancelDiscountCode = async (id:string)=>{
    return await discountModel.findByIdAndUpdate(id,{
        $pull:{
            discount_user_used:id
        },
        $inc:{
            discount_max_use:1,
            discount_use_count:-1
        }
    })
    
}

export {
findOne,
    createDiscount,
    findAllDiscountCodeUnSelect,
    deleteDiscountCode,
    cancelDiscountCode,
}