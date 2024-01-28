'use strict'

import * as inventoryRepository from '@/models/repositories/inventory.repository'
import {AddStockToInventoryProps} from '@/types'
import * as productRepository from '@/models/repositories/product.repository'
import { errorResponse } from '@/core'

export const addStockToInventory = async ({stock,productId,shopId,location="123a,abc,HCM"}:AddStockToInventoryProps)=>{
    const product = await productRepository.findProduct({id: productId,unSelect:['__v']})
    if(!product) throw new errorResponse.BadRequestError("Product not found in stock")
    return await inventoryRepository.addStockToInventory({stock,productId,shopId,location});
}