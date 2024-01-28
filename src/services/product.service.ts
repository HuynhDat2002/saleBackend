

'use strict'

import { productModel, clothingModel, electronicModel,furnitureModel } from '@/models/product.model'
import { Request, Response, NextFunction } from 'express'
import {errorResponse} from '@/core'
import * as productRepository from '@/models/repositories/product.repository'
import * as inventoryRepository from '@/models/repositories/inventory.repository'

import { ProductProps,CreateUpdateProductProps,FindProductProps,PublishProductByShopProps,
    UnPublishProductByShopProps,UpdateProductRepositoryProps } from '@/types'
import {removeUndefinedObject,updateNestedObjectParser} from '@/utils'

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
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes
    }:ProductProps){
       
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop=product_shop
        this.product_attributes = product_attributes
    }
    async createProduct(id:string){
        return await productModel.create({...this,_id:id});
    }
    async updateProduct(productId:string,payload:any){
        return await productRepository.updateProduct({productId,payload:payload,model:productModel});
    
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
    async updateProduct(productId:string){
        const objectParams = updateNestedObjectParser(this);
        
        if(objectParams.product_attributes){
            await productRepository.updateProduct({
                productId,
                payload:objectParams.product_attributes,
                model:clothingModel})
        }
        const updateProduct =  await super.updateProduct(productId,objectParams);
        return updateProduct;
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
    async updateProduct(productId:string){
        const objectParams = updateNestedObjectParser(this);
        
        if(objectParams.product_attributes){
            await productRepository.updateProduct({
                productId,
                payload:objectParams.product_attributes,
                model:electronicModel})
        }
        const updateProduct =  await super.updateProduct(productId,objectParams);
        return updateProduct;
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
    async updateProduct(productId:string){
        const objectParams = updateNestedObjectParser(this);
        
        if(objectParams.product_attributes){
            await productRepository.updateProduct({
                productId,
                payload:objectParams.product_attributes,
                model:furnitureModel})
        }
        const updateProduct =  await super.updateProduct(productId,objectParams);
        return updateProduct;
    }   
}



const productRegistry:any={}

const registerProductType=(type:string,classRef:any)=>{
    return productRegistry[type]=classRef;
}


registerProductType('Clothing',Clothing)
registerProductType('Electronic',Electronic)
registerProductType('Furniture',Furniture)


export const createProduct = async ({type,payload}:CreateUpdateProductProps) => {
    const productClass=productRegistry[type];
    if(!productClass) throw new errorResponse.BadRequestError(`Invalid Product Types ${type}`)

    const newProduct = await new productClass(payload).createProduct();
    if(newProduct){
        
        // add new product into product_stock
        await inventoryRepository.insertInventory({
            productId:newProduct._id,
            shopId:newProduct.product_shop,
            stock:newProduct.product_quantity
        })
    }
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
    const findAll:any = await productRepository.findAllDraftsForShop({query,limit,skip})
    return findAll;
}

export const publishProductByShop = async ({product_shop,product_id}:PublishProductByShopProps)=>{
    const shop:any =await productRepository.publishProductByShop({product_shop,product_id})
    return shop;

}

export const unPublishProductByShop = async ({product_shop,product_id}:UnPublishProductByShopProps)=>{
    const shop:any =await productRepository.unPublishProductByShop({product_shop,product_id})
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
        select:['product_name','product_thumb','product_price','product_ratingsAverage','product_shop']

    })
    return allProduct;

}
export const findProduct = async (id:string) =>{
    return await productRepository.findProduct({id:id,unSelect:['__v']});
}
export const updateProduct = async ({type,payload,productId}:CreateUpdateProductProps) =>{
    const productClass=productRegistry[type];
    if(!productClass) throw new errorResponse.BadRequestError(`Invalid Product Types ${type}`)

    const update= await new productClass(payload).updateProduct(productId);
    return update;
}


