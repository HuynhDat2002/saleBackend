'use strict'
import { errorResponse } from '@/core'
import * as shopRepo from '@/models/repositories/shop.repository'
import { skuModel } from '@/models/sku.model'
import { spuModel } from '@/models/spu.model'
import { randomProductId } from '@/utils'
import _ from "lodash"
export const newSku = async ({
   spu_id="",
   sku_list=[]
})=>{
    const convert_sku_list = sku_list.map((sku:any)=>{
        return {...sku,product_id:spu_id,sku_id:`${spu_id}.${randomProductId()}`}
    })
    // 1.check if shop exists
   const skus = skuModel.create(convert_sku_list)
   return skus
} 

export const oneSku = async ({sku_id="",product_id=""})=>{
    //read cache
    const sku = await skuModel.findOne({
        sku_id:sku_id.toString(),product_id:product_id.toString()
    }).lean()

    //set cache
    if(!sku) throw new errorResponse.NotFound(`Can not find sku`)
    const result= _.omit(sku, ['__v',"updatedAt","createdAt","isDeleted"])
return result
}

export const listSku = async ({product_id=""})=>{
    //read cache
    const sku = await skuModel.find({
        product_id:product_id.toString()
    }).lean()

    //set cache
   
return sku
}

