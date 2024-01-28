'use strict'



/*
    add product to cart [user]
    reduce product quantity by one [user]
    increase product quantity [user]
    get cart [user]
    delete cart [user]
    delete cart item [user]
*/

import {AddToCartProps,UpdateUserCartV2Props,DeleteUserCartProps} from '@/types'
import * as cartRepository from '@/models/repositories/cart.repositoty'
import * as productRepository from '@/models/repositories/product.repository'
import { errorResponse } from '@/core'
import { cartModel } from '@/models/cart.model'
const createUserCart = async ({userId,product}:AddToCartProps)=>{
    return await cartRepository.createUserCart({userId,product})
}

const updateUserCart = async ({userId,product={}}:AddToCartProps)=>{
    const foundProduct:any = await cartRepository.findProductCart(product.productId)
    // if(!foundProduct) throw new errorResponse.NotFound('Not found product in cart')
    const result= await cartRepository.updateQuantityUserCart({userId,product})
    return result
}

export const deleteUserItemCart = async ({userId,productId}:DeleteUserCartProps)=>{
    const foundProduct:any = await cartRepository.findProductCart(productId)
    if(!foundProduct) throw new errorResponse.NotFound('Not found product in cart')
    return await cartRepository.deleteUserItemCart({userId,productId})
}

export const addToCart = async ({userId,product}:AddToCartProps)=>{
    const userCart:any = await cartRepository.findOne({cart_userId:userId})
    if(!userCart){
        // create a new cart
        return await createUserCart({userId,product})
    }
    
    if(userCart.cart_products.length<=0){
        return await cartRepository.createUserCart({userId,product});
    }

    const foundProduct:any = await cartRepository.findProductCart(product.productId)
    if(!foundProduct){
        return await cartRepository.createUserCart({userId,product});
    }
    //if it's already this product in cart
    const result= await updateUserCart({userId:userId,product:product})
    return result;
}

export const updateUserCartV2 = async ({userId,shop_order_ids=[]}:UpdateUserCartV2Props)=>{
    const {productId,quantity,old_quantity} = shop_order_ids[0]?.item_products[0]

    //check product
    const foundProduct:any = await productRepository.findProduct({id:productId,unSelect:['__v']})
    if(!foundProduct) throw new errorResponse.NotFound("Not found product")
    if(foundProduct.product_shop?.toString() !== shop_order_ids[0]?.shopId){
  
        throw new errorResponse.NotFound("Product do not belong to the shop")
    }

    if(quantity===0){
        //delete
        return await deleteUserItemCart({userId,productId})
    }

    return await updateUserCart({
        userId:userId,
        product:{
            productId,
            quantity:quantity-old_quantity
        }
    })
}

export const getListUserCart = async (userId:string)=>{
    return await cartRepository.findByUserId(userId)
}

