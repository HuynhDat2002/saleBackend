'use strict'


import {Request,Response,NextFunction} from 'express'
import { SuccessResponse } from '@/core/success.response'
import { discountService } from '@/services'
import { CustomRequest,CreateDiscountCodeProps } from '@/types'
import { Query } from 'mongoose'

export const createDiscountCode= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let body:CreateDiscountCodeProps
    if(!req.user){
         body=req.body
    }
    else{
         body={...req.body,shopId:req.user.userId}
    }
    new SuccessResponse({
        message:"Create new discount successfully",
        metadata:await discountService.createDiscountCode(body)
    })
}
export const updateDiscount= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let body:CreateDiscountCodeProps
    if(!req.user){
         body=req.body
    }
    else{
         body={...req.body,shopId:req.user.userId}
    }
    new SuccessResponse({
        message:"Create new discount successfully",
        metadata:await discountService.createDiscountCode(body)
    })
}
export const getAllProductByDiscount= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let body:CreateDiscountCodeProps
    if(!req.user){
         body=req.body
    }
    else{
         body={...req.body,shopId:req.user.userId}
    }
    new SuccessResponse({
        message:"Create new discount successfully",
        metadata:await discountService.createDiscountCode(body)
    })
}
export const getAllDiscountByShop= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let query:any
    if(!req.user){
         query=req.query
    }
    else{
         query={...req.query,shopId:req.user.userId}
    }
    new SuccessResponse({
        message:"Find discounts successfully",
        metadata:await discountService.getAllDiscountByShop(query)
    })
}


export const deleteDiscountCode= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let body:CreateDiscountCodeProps
    if(!req.user){
         body=req.body
    }
    else{
         body={...req.body,shopId:req.user.userId}
    }
    new SuccessResponse({
        message:"Create new discount successfully",
        metadata:await discountService.createDiscountCode(body)
    })
}
export const cancelDiscountCode= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let body:CreateDiscountCodeProps
    if(!req.user){
         body=req.body
    }
    else{
         body={...req.body,shopId:req.user.userId}
    }
    new SuccessResponse({
        message:"Create new discount successfully",
        metadata:await discountService.createDiscountCode(body)
    })
}

