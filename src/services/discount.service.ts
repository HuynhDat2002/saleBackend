'use strict'

import {CreateDiscountCodeProps,GetAllProductByDiscountProps,GetAllDiscountByShopProps,GetDiscountAmountProps,DeleteDiscountCodeProps} from '@/types'
import { errorResponse } from '@/core'
import { discountModel } from '@/models/discount.model'
import { convertToObjectId } from '@/utils'
import * as productRepository from '@/models/repositories/product.repository'

import * as discountRepository from '@/models/repositories/discount.repository'
import { error } from 'console'

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

    const foundDiscount:any = discountRepository.findOne({discount_name:name,discount_shopId:shopId})
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
    const foundDiscount:any = discountRepository.findOne({discount_code:code,discount_shopId:shopId})
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

const getDiscountAmount =async ({code,userId,shopId,products}:GetDiscountAmountProps)=>{
    const foundDiscount:any = await discountRepository.findOne({discount_code:code,discount_shopId:convertToObjectId(shopId)})
   if(!foundDiscount) throw new errorResponse.NotFound("Discount not exists")
   const {discount_is_active,discount_max_use,discount_start_date,
discount_end_date,discount_min_order_value,
 discount_max_per_user_use,discount_user_used,discount_type,discount_value} = foundDiscount;
    if(!discount_is_active){
        throw new errorResponse.NotFound("Discount expired!")
    }
    if(!discount_max_use){
        throw new errorResponse.NotFound("Discount is out");
    }
    if(new Date() < new Date(discount_start_date)) throw new errorResponse.NotFound("Discount date has not yet arrived!")
    if(new Date() > new Date(discount_end_date)) throw new errorResponse.NotFound("Discount expired!")
    

    //check xem có sét gía trị tối thiểu hay không
    let totalOrder=0
    if(discount_min_order_value>0) {
        totalOrder=products.reduce((acc:number,product:any)=>{
            return acc+(product.quantity*product.price)
        },0)

        if(totalOrder<discount_min_order_value) throw new errorResponse.NotFound(`Discount requires a minium order value of ${discount_min_order_value}`)
        else{
            
        }
    }
    if( discount_max_per_user_use>0){
        const userUsedDiscount = discount_user_used.find((user:any)=>user.userId===userId)
        if(userUsedDiscount){
            throw new errorResponse.BadRequestError("You have used this discount")
        }
    }

    const amount = discount_type ==='fixed_amount' ? discount_value : totalOrder * (discount_value/100)

    return {
        totalOrder,
        discount:amount,
        totalPrice:totalOrder-amount
    }

}

const deleteDiscountCode = async ({code,shopId}:DeleteDiscountCodeProps)=>{
    const deleted = await discountRepository.deleteDiscountCode({code:code,shopId:shopId})
    return deleted
}

const cancelDiscountCode=async ({code,shopId,userId}:DeleteDiscountCodeProps)=>{
    const foundDiscount:any = discountRepository.findOne({discount_code:code,discount_shopId:shopId})
    if(!foundDiscount || !foundDiscount.discount_is_active){
        throw new errorResponse.BadRequestError("Discount not exists!")
    }
    const result = await discountRepository.cancelDiscountCode(foundDiscount._id)
    if(!result) throw new errorResponse.BadRequestError("Cannot cancel discount");
    return result;
}

export {
    createDiscountCode,
    updateDiscount,
    getAllProductByDiscount,
    getAllDiscountByShop,
    getDiscountAmount,
    deleteDiscountCode,
    cancelDiscountCode,
}