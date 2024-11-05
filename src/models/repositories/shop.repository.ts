'use strict'

import shopModel from "../shop.model"

const selectStruct = {
    name:1,email:1,status:1,roles:1
}

export const findShopById = async ({  
    shop_id="",
    select=selectStruct

})=>{
    return await shopModel.findById(shop_id).select(select)
}