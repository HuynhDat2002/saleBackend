

/*
payload:
    cartId,
    userId,
    app_discount:{
        ship_discount,
        discount
    }
    shop_order_ids:[
        {
            shopId,
            shop_discount:
                {
                    shopId,
                    discountId,
                    code,
                }
            ,
            feeShip,
            item_products:[
                {
                price,
                quantity,
                productId
                }
            ]
        }
    ]
*/
'use strict'

import {CheckoutReviewProps,OrderByUserProps} from '@/types'
import * as cartRepository from '@/models/repositories/cart.repositoty'
import * as productRepository from '@/models/repositories/product.repository'
import { discountService } from '.'
import { errorResponse} from '@/core';
import * as redisService from './redis.service'
import {orderModel} from '@/models/order.model'


export const checkoutReview = async ({cartId,userId,shop_order_ids,app_discount}:CheckoutReviewProps)=>{
    const foundCart = await cartRepository.findCartById(cartId);
    if(!foundCart) throw new errorResponse.NotFound('Cart does not exists')

    const checkout_order={
        totalPrice:0,
        feeShip:0,
        ship_discount:0,
        totalDiscount:0,
        totalCheckout:0
    }   

    const shop_order_ids_new:any=[]
    console.log('shop',shop_order_ids)
    //Tinh tong tien bill 
    for(let i=0;i<shop_order_ids.length;i++){
      
            const {shopId,shop_discount,item_products,feeShip}  = shop_order_ids[i];
            console.log('item',item_products)
            const checkProductServer = await productRepository.checkProductByServer(item_products)
            if(checkProductServer.length===0) throw new errorResponse.BadRequestError("Not found product in store")
            
            //tong tien mot san pham
            const checkoutPrice =await checkProductServer.reduce(async (acc:number,product:any)=>{
               return acc + product.quantity*product.price
            },0) + feeShip;
            console.log('checkprice',checkoutPrice)
            console.log('checker',checkProductServer)
         
            console.log('shopId',shopId)
            const itemCheckout = {
                shopId:shopId,
                shop_discount:shop_discount,
                priceRaw:checkoutPrice,
                priceApplyDiscount:checkoutPrice,
                item_products:checkProductServer
            }
            console.log('itemcheckout',itemCheckout)
            console.log('discount',shop_discount)
    
            //check if shop_discount exists
            if(shop_discount && Object.keys(shop_discount).length !== 0){
                //gia su chi co 1 discount
                const discountAmount = await discountService.getDiscountAmount({
                    code:shop_discount.code,
                    userId:userId,
                    shopId:shopId,
                    products:checkProductServer
                })
            
                //tong checkout giam gia
                checkout_order.totalDiscount+=discountAmount.discount
                itemCheckout.priceApplyDiscount=checkoutPrice-discountAmount.discount
                
            }
                //tong tien tam thoi
                checkout_order.totalPrice += itemCheckout.priceApplyDiscount
                checkout_order.feeShip +=feeShip
                shop_order_ids_new.push(itemCheckout)
                console.log('a',shop_order_ids_new)
        

    }
    // if(app_discount.ship_discount){
    //     const shipDiscountAmount = await discountService.getDiscountAmount({
    //         code:app_discount.ship_discount.code,
    //         userId:userId,
    //         adminId:app_discount.ship_discount,
    //         products:
    //     })
    // }
    console.log('b',shop_order_ids_new)
    checkout_order.totalCheckout+=checkout_order.totalPrice+checkout_order.feeShip-checkout_order.ship_discount

    return {
        shop_order_ids_new:shop_order_ids_new,
        checkout_order:checkout_order
    }
}


export const orderByUser = async ({shop_order_ids,cartId,userId,user_address,user_payment}:OrderByUserProps)=>{
    const { shop_order_ids_new,checkout_order} = await checkoutReview({cartId,userId,shop_order_ids})

    //check xem da vuot ton kho hay chua
    const products = shop_order_ids_new.flatMap((order:any)=>order.item_product)
    console.log('products::',products)
    const acquireProduct =[];
    for (let i=0;i<products.length;i++){
        const {productId,quantity} = products[i];
        const keyLock = await redisService.acquireLock({productId,quantity,cartId})
        acquireProduct.push(keyLock ? true : false);
        if(keyLock){
            redisService.releaseLock(keyLock)
        }
    }

    //check neu co mot san pham het hang
    if(acquireProduct.includes(false)){
        throw new errorResponse.BadRequestError("Some products have been updated, please check again")

    }

    const newOrder = await orderModel.create({
        order_userId:userId,
        order_checkout:checkout_order,
        order_shipping:user_address,
        order_payment:user_payment,
        order_products:shop_order_ids_new
    })

    //neu thanh cong thi remove product from cart
    if(newOrder){

    }
    return newOrder

}

/*
    1. query orders [user]
*/

export const getOrdersByUser =async ()=>{

}

/*
    2. query orders using id [user]
*/

export const getOneOrderByUser =async ()=>{

}

/*
    3. cancel order [user]
*/

export const cancelOrder =async ()=>{

}

/*
    4. update order status [shop|order]
*/

export const updateOrderStatus =async ()=>{
    
}