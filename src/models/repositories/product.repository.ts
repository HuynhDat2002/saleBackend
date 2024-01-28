

'use strict'

import { productModel,electronicModel,clothingModel,furnitureModel } from "@/models/product.model"

import {QueryProductProps,PublishProductByShopProps,FindAllProps,FindAProductProps,UpdateProductRepositoryProps} from '@/types'
import { convertToObjectId, getSelectData,getUnSelectData} from '@/utils'
import {errorResponse} from '@/core'
const queryProduct= async ({query,limit,skip}:QueryProductProps)=>{
    return await productModel.find(query)
    .populate('product_shop','name email -_id')
    .sort({updateAt:-1})
    .skip(skip)
    .limit(limit)
    .lean()


}
const findAllPublishForShop= async ({query,limit,skip}:QueryProductProps)=>{
    return await queryProduct({query,limit,skip})

}

const findAllDraftsForShop= async ({query,limit,skip}:QueryProductProps)=>{
return await queryProduct({query,limit,skip})

}

const publishProductByShop = async ({product_shop,product_id}:PublishProductByShopProps) => {
    const foundShop=await productModel.findOneAndUpdate({
        product_shop: product_shop,
        _id:product_id
    },{
        isDraft:false,
        isPublished:true
    },{
        new:true
    })
    if(!foundShop) throw new errorResponse.NotFound("Not found product in shop");
    return foundShop;
}   


const unPublishProductByShop = async ({product_shop,product_id}:PublishProductByShopProps) => {
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

const searchProduct = async (keySearch:string)=>{
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

const findAllProduct = async ({limit,sort,page,filter,select}:FindAllProps)=>{
    const skip = (page-1)*limit;
    const allProduct = await productModel
    .find(filter)
    .sort(sort ==='ctime' ? {_id:-1} :{_id:1})
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()
    return allProduct;
}

const findProduct = async ({id,unSelect}:any)=>{
    const allProduct = await productModel.findOne({_id:convertToObjectId(id)}).select(getUnSelectData(unSelect))
    return allProduct;
}
const updateProduct = async ({productId,payload,model}:UpdateProductRepositoryProps)=>{
    const updatedProduct = await model.findOneAndUpdate({_id:productId},payload,{new:true});
    return updatedProduct;
}
 
const checkProductByServer = async (products:any)=>{
    return await Promise.all(products.map( async (product:any) =>{
        const foundProduct:any =await productModel.findOne({_id:convertToObjectId(product.productId)}).select(getSelectData(['product_price'])).lean()
        console.log('product',foundProduct)
        if(foundProduct){
            return {
                price:foundProduct.product_price,
                quantity:product.quantity,
                productId:product.productId
            }
        }
    }))
}

export {
    findAllDraftsForShop,
    findAllPublishForShop,
    unPublishProductByShop,
    publishProductByShop,
    searchProduct,
    findAllProduct,
    findProduct,
    updateProduct,
    checkProductByServer
}