
'use strict'
import { inventoryModel } from "../inventory.model";
import {InsertInventoryRepositoryProps,ReservationInventoryProps,AddStockToInventoryProps} from '@/types';
const insertInventory = async ({productId,shopId,stock,location="unknow"}:InsertInventoryRepositoryProps)=>{
    return await inventoryModel.create({
        inven_productId:productId,
        inven_stock:stock,
        inven_location:location,
        inven_shopId:shopId,
    })
}

const reservationInventory = async ({productId,quantity,cartId}:ReservationInventoryProps)=>{
    const query = {
        inven_productId:productId,
        inven_stock:{$gte:quantity},

    }
    const updateSet={
        $inc:{
            inven_stock:-quantity
        },
        $push:{
            inven_reservations:{
                quantity:quantity,
                cartId,
                createOn:new Date()
            }
        }
    }
    const options={
        upsert:true,
        new:true
    }

    return await inventoryModel.findOneAndUpdate(query,updateSet,options);
}

const addStockToInventory = async ({stock,productId,shopId,location="123a,abc,HCM"}:AddStockToInventoryProps)=>{
    const query = {inven_shopId: shopId,inven_productId: productId},
    updateSet={
        $inc:{
            inven_stock:stock
        },
        $set:{
            inven_location:location
        }
    },
    options={
        upsert:true,new:true
    }
    return await inventoryModel.findOneAndUpdate(query,updateSet,options);
}

export {insertInventory,reservationInventory,addStockToInventory}