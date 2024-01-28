'use strict'


import {Request,Response,NextFunction} from 'express'
import { SuccessResponse } from '@/core/success.response'
import { discountService } from '@/services'
import { CustomRequest,CreateDiscountCodeProps,GetAllProductByDiscountProps,DeleteDiscountCodeProps } from '@/types'
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
    }).send(res)
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
    // let body:GetAllProductByDiscountProps
    // if(!req.user){
    //      body=req.body
    // }
    // else{
    //      body={...req.body,shopId:req.user.userId}
    // }
    let query:any=req.query
    new SuccessResponse({
        message:"Get all product by discount successfully",
        metadata:await discountService.getAllProductByDiscount(query)
    }).send(res)
}
export const getAllDiscountByShop= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let query:any=req.query
    new SuccessResponse({
        message:"Find discounts by shop successfully",
        metadata:await discountService.getAllDiscountByShop(query)
    }).send(res)
}

export const getDiscountAmount = async (req:CustomRequest,res:Response,next:NextFunction)=>{
    new SuccessResponse({
        message:"Get discount amount successfully",
        metadata:await discountService.getDiscountAmount(req.body)
    }).send(res)
}

export const deleteDiscountCode= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let body:DeleteDiscountCodeProps
    if(!req.user){
         body=req.body
    }
    else{
         body={...req.body,shopId:req.user.userId}
    }
    new SuccessResponse({
        message:"Delete discount successfully",
        metadata:await discountService.deleteDiscountCode(body)
    }).send(res)
}
export const cancelDiscountCode= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let body:DeleteDiscountCodeProps
    if(!req.user){
         body=req.body
    }
    else{
         body={...req.body,shopId:req.user.userId}
    }
    new SuccessResponse({
        message:"Cancel discount successfully",
        metadata:await discountService.cancelDiscountCode(body)
    }).send(res)
}

