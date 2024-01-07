


'use strict'

import { productModel, clothingModel, electronicModel,furnitureModel } from '@/models/product.model'
import { Request, Response, NextFunction } from 'express'
import {errorResponse} from '@/core'
import * as productRepository from '@/models/repositories/product.repository'
import { ProductProps,CreateProductProps,FindProductProps,PublishProductByShopProps,
    UnPublishProductByShopProps } from '@/types'


class Product {
    product_name
    product_thumb
    product_description
    product_price
    product_quantity
    product_type
    product_shop
    product_attributes

    constructor({
        name,
       thumb,
        description,
        price,
        quantity,
        type,
       shop,
        attributes
    }:ProductProps){
       
        this.product_name = name
        this.product_thumb = thumb
        this.product_description = description
        this.product_price = price
        this.product_quantity = quantity
        this.product_type = type
        this.product_shop=shop
        this.product_attributes = attributes
    }
    async createProduct(id:string){
        return await productModel.create({...this,_id:id});
    }
}


class Clothing extends Product{
    async createProduct(){
        const newClothing = await clothingModel.create({
            ...this.product_attributes,
            shop:this.product_shop
        });
        if(!newClothing) throw new errorResponse.BadRequestError("Create new clothing error")

        const newProduct = await super.createProduct(newClothing._id.toString())
        if(!newProduct) throw new errorResponse.BadRequestError("Create new product error")
        return newProduct;
    }
}

class Electronic extends Product{
    async createProduct(){
        const newElectronic = await electronicModel.create({...this.product_attributes,shop:this.product_shop});
        if(!newElectronic) throw new errorResponse.BadRequestError("Create new electronic error")

        const newProduct = await super.createProduct(newElectronic._id.toString())
        if(!newProduct) throw new errorResponse.BadRequestError("Create new product error")
        return newProduct;
    }
}



class Furniture extends Product{
    async createProduct(){
        const newFurniture = await furnitureModel.create({
            ...this.product_attributes,
            shop:this.product_shop
        });
        if(!newFurniture) throw new errorResponse.BadRequestError("Create new furniture error")

        const newProduct = await super.createProduct(newFurniture._id.toString())
        if(!newProduct) throw new errorResponse.BadRequestError("Create new product error")
        return newProduct;
    }
}



const productRegistry:any={}

const registerProductType=(type:string,classRef:any)=>{
    return productRegistry[type]=classRef;
}


registerProductType('Clothing',Clothing)
registerProductType('Electronic',Electronic)
registerProductType('Furniture',Furniture)


export const createProduct = async ({type,payload}:CreateProductProps) => {
    const productClass=productRegistry[type];
    if(!productClass) throw new errorResponse.BadRequestError(`Invalid Product Types ${type}`)

    const newProduct = await new productClass(payload).createProduct();
    return newProduct;
    // if(type==="Clothing"){
    //     const newClothing = await new Clothing(payload).createProduct()
    //     return newClothing;
    // }
    // if(type==="Electronic"){
    //     const newClothing = await new Electronic(payload).createProduct()
    //     return newClothing;
    // }

    // if(type==="Furniture"){
    //     const newFurniture = await new Furniture(payload).createProduct()
    //     return newFurniture;
    // }
    //return {}
}

export const findAllDraftsForShop=async ({product_shop,limit=10,skip=0}:FindProductProps)=>{
    const query = {product_shop,isDraft:true}
    const findAll = await productRepository.findAllDraftsForShop({query,limit,skip})
    return findAll;
}

export const publishProductByShop = async ({product_shop,product_id}:PublishProductByShopProps)=>{
    const shop =await productRepository.publishProductByShop({product_shop,product_id})
    return shop;

}

export const unPublishProductByShop = async ({product_shop,product_id}:UnPublishProductByShopProps)=>{
    const shop =await productRepository.unPublishProductByShop({product_shop,product_id})
    return shop;

}

export const findAllPublishForShop=async ({product_shop,limit=10,skip=0}:FindProductProps)=>{
    const query = {product_shop,isPublished:true}
    const findAll = await productRepository.findAllPublishForShop({query,limit,skip})
    return findAll;
}

export const searchProduct = async (keySearch:string) =>{
    return await productRepository.searchProduct(keySearch);
}
export const findAllProduct = async ({limit=50,sort='ctime',page=1,filter={isPublished:true}}) =>{
    const allProduct = await productRepository.findAllProduct({
        limit:limit,
        page:page,
        sort:sort,
        filter:filter,
        select:['product_name','product_thumb','product_price','product_ratingsAverage']

    })
    return allProduct;

}
export const findProduct = async (id:string) =>{
    return await productRepository.findProduct({id:id,unSelect:['__v']});
}
export const updateProduct = async (productId:string) =>{
    return await productRepository.updateProduct();
}


