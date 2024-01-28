'use strict'

import {cartModel} from '@/models/cart.model'
import {DeleteUserCartProps} from '@/types'
import { productModel } from '../product.model'
import { errorResponse } from '@/core'
export const findOne = async (filter:any)=>{
    return await cartModel.findOne(filter).lean()
}

export const createUserCart= async (body:any)=>{
    const foundProduct:any = await productModel.findOne({_id:body.product.productId})
    if(!foundProduct) throw new errorResponse.NotFound('Not found product')
    const query = {cart_userId: body.userId, cart_state: 'active'}
    body.product={...body.product,name:foundProduct.product_name,price:foundProduct.product_price}
    const updateOrInsert = {
        $addToSet:{
            cart_products:body.product
        }
    }
    const options = {upsert:true,new:true}
    return await cartModel.findOneAndUpdate(query,updateOrInsert,options)
}

export const updateQuantityUserCart= async (body:any)=>{
    
    const query = {cart_userId: body.userId, 'cart_products.productId': body.product.productId,cart_state:'active'}
    
    const updateSet = {
        $inc:{
            'cart_products.$.quantity':body.product.quantity
        },
    }
    const options = {upsert:true,new:true}
    return await cartModel.findOneAndUpdate(query,updateSet,options)
}

export const deleteUserItemCart = async ({userId,productId}:DeleteUserCartProps)=>{
    const query={cart_userId:userId,cart_state:'active'}
    const updateSet={
        $pull:{
            cart_products:{
                productId
            }
        }
    }
    const options={upsert:true,new:true}

    return await cartModel.findOneAndUpdate(query,updateSet,options)
}

export const findByUserId = async (userId:string) => {
    return await cartModel.findOne({
        cart_userId:userId
    }).lean()
}

export const findProductCart= async (productId:string)=>{
    return await cartModel.findOne({
        'cart_products.productId':productId
    }).lean()
}

export const findCartById = async (id:string)=>{
    return await cartModel.findOne({_id:id,cart_state:'active'}).lean();
}