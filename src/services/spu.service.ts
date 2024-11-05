'use strict'
import { errorResponse } from '@/core'
import * as shopRepo from '@/models/repositories/shop.repository'
import { spuModel } from '@/models/spu.model'
import { randomProductId } from '@/utils'
import { newSku } from './sku.service'
import { skuService } from '.'
import _ from 'lodash'
export const newSpu = async ({
    product_id='',
    product_name="",
    product_slug="",
    product_ratingsAverage=0,
    product_variations=[],
   
    product_thumb='',
    product_description='',
    product_price=0,
    product_quantity=0,

    product_shop='',
    product_attributes=[],
    product_category=[],
    sku_list=[]
})=>{
    // 1.check if shop exists
    const foundShop = await shopRepo.findShopById({shop_id:product_shop})
    if(!foundShop) throw new errorResponse.NotFound(`Not found shop`)

    const newSpu = await spuModel.create({
        product_id:randomProductId(),
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_category,
        product_shop,
        product_attributes,
        product_quantity,
        product_variations
    })
    if(!newSpu) throw new errorResponse.BadRequestError(`Cannot create new spu`)
    if(sku_list.length){
        //3. create skus
        const sku =await newSku({spu_id:newSpu.product_id,sku_list})
        if(!sku) throw new errorResponse.BadRequestError('Cannot create sku')
            
    }

    //4. sync data via elasticsearch (search.service)

    //5. response result object
    return newSpu
} 

export const oneSpu = async ({spu_id=""})=>{
    const product = await spuModel.findOne({
        product_id:spu_id.toString(),
        isPublished:false
    }).lean()
    if(!product) throw new errorResponse.NotFound(`Not found spu`)

    const skus = await skuService.listSku({product_id:product.product_id})
    return {
        spu_info:_.omit(product,['__v',"updatedAt","createdAt","isDeleted"]),
        sku_list: skus.map(sku=>_.omit(sku,['__v',"updatedAt","createdAt","isDeleted"]))
    }
}