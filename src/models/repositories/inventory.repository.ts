'use strict'
import { inventoryModel } from "../inventory.model";
import {InsertInventoryRepositoryProps} from '@/types';
const insertInventory = async ({productId,shopId,stock,location="unkhow"}:InsertInventoryRepositoryProps)=>{
    return await inventoryModel.create({
        inven_productId:productId,
        inven_stock:stock,
        inven_location:location,
        inven_shopId:shopId,
    })
}

export {insertInventory}