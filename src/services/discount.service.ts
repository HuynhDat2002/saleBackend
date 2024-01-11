'use strict'

import {CreateDiscountCodeProps,GetAllProductByDiscountProps,GetAllDiscountByShopProps} from '@/types'
import { errorResponse } from '@/core'
import { discountModel } from '@/models/discount.model'
import { convertToObjectId } from '@/utils'
import * as productRepository from '@/models/repositories/product.repository'

import * as discountRepository from '@/models/repositories/discount.repository'

/*
    1. generator discount code [shop/admin]
    2. get discount amount [user]
    3. get all dis count codes [user|shop]
    4. verify discount code [user]
    5. delete discount code [shop|admin]
    6. cancel discount code [user]
    7. apply discount [user]

*/

const createDiscountCode = (body:CreateDiscountCodeProps)=>{
    const {
        code,start_date,end_date,is_active,shopId,min_order_value, products_id,applies_to,
        name,description,use_count,user_used,
        type,value,max_value,max_use,max_per_user_use
    }= body

    if(new Date()>new Date(start_date)||new Date()||new Date()>new Date(end_date)){
        throw new errorResponse.BadRequestError("Start or end time discount is wrong")
    }

    const foundDiscount:any = discountRepository.findByNameAndShopId(name,shopId)
    if(foundDiscount && foundDiscount.discount_is_active){
        throw new errorResponse.BadRequestError("Discount exists!")
    }

    const newDiscount = discountRepository.createDiscount(body);
    if(!newDiscount) throw new errorResponse.BadRequestError("Something wrong while creating new discount")

    return newDiscount

}


const updateDiscount =async ()=>{

}

const getAllProductByDiscount=async ({
    code,shopId,userId,limit,page
}:GetAllProductByDiscountProps)=>{
    const foundDiscount:any = discountRepository.findByCodeAndShopId(code,shopId)
    if(!foundDiscount || !foundDiscount.discount_is_active){
        throw new errorResponse.BadRequestError("Discount not exists!")
    }

    const {discount_applies_to,discount_products_id} = foundDiscount
    let products:any={}
    if(discount_applies_to==="all"){
        products = await productRepository.findAllProduct({
            limit:+limit,
            page:+page,
            sort:'ctime',
            filter:{
                product_shop:convertToObjectId(shopId),
                isPublished:true
            },
            select:['product_name']
    
        })
        return products
    }
    if(discount_applies_to==='specific'){
        products = await productRepository.findAllProduct({
            limit:+limit,
            page:+page,
            sort:'ctime',
            filter:{
                _id:{$in:discount_products_id},
                isPublished:true
            },
            select:['product_name']
    
        })
    }
    return products



}


const getAllDiscountByShop = async ({limit,page,shopId}:GetAllDiscountByShopProps)=>{
    const discounts = await discountRepository.findAllDiscountCodeUnSelect({
        limit:+limit,
        page:+page,
        filter:{
            discount_shopId:shopId,
            discount_is_active:true
        },
        unSelect:['__v'],
        model:discountModel,
    })
    return discounts
}


export {
    createDiscountCode,
    updateDiscount,
    getAllProductByDiscount,
    getAllDiscountByShop,
}