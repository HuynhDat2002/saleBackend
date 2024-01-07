

'use strict'

import { productModel,electronicModel,clothingModel,furnitureModel } from "@/models/product.model"

import {QueryProductProps,PublishProductByShopProps} from '@/types'


export const queryProduct= async ({query,limit,skip}:QueryProductProps)=>{
    return await productModel.find(query)
    .populate('product_shop','name email -_id')
    .sort({updateAt:-1})
    .skip(skip)
    .limit(limit)
    .lean()


}
export const findAllPublishForShop= async ({query,limit,skip}:QueryProductProps)=>{
    return await queryProduct({query,limit,skip})

}

export const findAllDraftsForShop= async ({query,limit,skip}:QueryProductProps)=>{
return await queryProduct({query,limit,skip})

}

export const publishProductByShop = async ({product_shop,product_id}:PublishProductByShopProps) => {
    const foundShop=await productModel.findOneAndUpdate({
        product_shop: product_shop,
        _id:product_id
    },{
        isDraft:false,
        isPublished:true
    },{
        new:true
    })
    if(!foundShop) return null;
    return foundShop;
}   


export const unPublishProductByShop = async ({product_shop,product_id}:PublishProductByShopProps) => {
    const foundShop=await productModel.findOneAndUpdate({
        product_shop: product_shop,
        _id:product_id
    },{
        isDraft:true,
        isPublished:false
    },{
        new:true
    })
    if(!foundShop) return null;
    return foundShop;
}   

export const searchProduct = async (keySearch:string)=>{
    const regexSearch = new RegExp(keySearch,'i');
    const result = await productModel.find({
        $text:{$search:regexSearch.source},
        isPublished:true
    },{
        score:{$meta:'textScore'}

    })
    .sort( {$score:{$meta:'textScore'}})
    .lean();
    return result;
}