
'use strict'


import {Request,Response,NextFunction} from 'express'
import { SuccessResponse } from '@/core/success.response'
import * as cartService  from '@/services/cart.service'
import { CustomRequest,CreateDiscountCodeProps,GetAllProductByDiscountProps,DeleteDiscountCodeProps } from '@/types'

export const addToCart= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    new SuccessResponse({
        message:"Create new cart successfully",
        metadata:await cartService.addToCart(req.body)
    }).send(res)
}
export const updateUserCart= async (req:CustomRequest,res:Response,next:NextFunction)=>{

    new SuccessResponse({
        message:"Update cart successfully",
        metadata:await cartService.updateUserCartV2(req.body)
    }).send(res)
}
export const deleteUserCart= async (req:CustomRequest,res:Response,next:NextFunction)=>{

    new SuccessResponse({
        message:"Delete cart successfully",
        metadata:await cartService.deleteUserItemCart(req.body)
    }).send(res)
}

export const getListUserCart= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    const {userId}=req.query as {userId:string}
  
    new SuccessResponse({
        message:"Get list cart successfully",
        metadata:await cartService.getListUserCart(userId)
    }).send(res)
}


