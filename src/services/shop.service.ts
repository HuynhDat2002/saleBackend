

import shopModel from "@/models/shop.model";
import { ShopServiceFindByEmail } from "@/types";
export const findByEmail=async ({email,select={email:1,password:1,name:1,status:1,roles:1}}:ShopServiceFindByEmail)=>{
    return await shopModel.findOne({email:email}).select(select).lean();
}   