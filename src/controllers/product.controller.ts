
import { Request, NextFunction ,Response} from 'express';
import { successResponse } from '@/core';
import {productService} from '@/services'
import { CustomRequest ,ProductProps} from '@/types';

export const createProduct = async (req: CustomRequest, res: Response,next: NextFunction) => {
    const type:string=req.body.product_type;
    let payload:ProductProps
    if(!req.user){
         payload=req.body
    }
    else{
         payload={...req.body,product_shop:req.user.userId}
    }
    console.log('payloadproduct: ',payload)
    new successResponse.CREATED({
        message:"Created a new product",
        metadata: await productService.createProduct({type,payload})
    }).send(res);
}
/**
 * 
 * @desc get all Drafts for shop 
 * @param {Number} limit 
 * @param {Number} skip
 * @return {JSON}
 */


export const findAllDraftsForShop = async (req: CustomRequest, res: Response,next: NextFunction)=>{
    let product_shop:string=""
    if(req.user){
         product_shop =req.user.userId as string
    }
   
    new successResponse.SuccessResponse({
        message:"Find all draft products successfully",
        metadata: await productService.findAllDraftsForShop({product_shop:product_shop})
    }).send(res);
}       


export const findAllPublishedForShop = async (req: CustomRequest, res: Response,next: NextFunction)=>{
    let product_shop:string=""
    if(req.user){
         product_shop =req.user.userId as string
    }
   
    new successResponse.SuccessResponse({
        message:"Find all published products successfully",
        metadata: await productService.findAllPublishForShop({product_shop:product_shop})
    }).send(res);
}       


export const publishProductByShop = async (req: CustomRequest, res: Response,next: NextFunction)=>{
    let product_shop:string=""
    if(req.user){
         product_shop =req.user.userId as string
    }
    const {id}  =req.params;
    new successResponse.SuccessResponse({
        message:"Publish a product successfully",
        metadata: await productService.publishProductByShop({product_shop:product_shop,product_id:id})
    }).send(res);
}       

export const unPublishProductByShop = async (req: CustomRequest, res: Response,next: NextFunction)=>{
    let product_shop:string=""
    if(req.user){
         product_shop =req.user.userId as string
    }
    const {id}  =req.params;
    new successResponse.SuccessResponse({
        message:"Unpublish a product successfully",
        metadata: await productService.unPublishProductByShop({product_shop:product_shop,product_id:id})
    }).send(res);
} 

export const searchProduct = async (req: CustomRequest, res: Response,next: NextFunction)=>{

    const {keySearch}  =req.params;
    new successResponse.SuccessResponse({
        message:"Search product successfully",
        metadata: await productService.searchProduct(keySearch)
    }).send(res);
}       


export const findAllProduct=async (req: CustomRequest, res: Response,next: NextFunction)=>{
    new successResponse.SuccessResponse({
        message:"Search all product successfully",
        metadata: await productService.findAllProduct(req.query)
    }).send(res);
}

export const findProduct= async (req: CustomRequest, res: Response,next: NextFunction)=>{
    const {id}  =req.params;

    new successResponse.SuccessResponse({
        message:"Search a product successfully",
        metadata: await productService.findProduct(id)
    }).send(res);
}


export const updateProduct= async (req: CustomRequest, res: Response,next: NextFunction)=>{
    const {id}  =req.params;
    let product_shop:string=""
    if(req.user){
         product_shop =req.user.userId as string
    }
    new successResponse.SuccessResponse({
        message:"Search a product successfully",
        metadata: await productService.updateProduct({
            type:req.body.product_type,
            payload:{...req.body,product_shop:product_shop},
            productId:id
        })
    }).send(res);
}
