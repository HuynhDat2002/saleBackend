import {CreateDiscountCodeProps} from '@/types'
import { discountModel } from '@/models/discount.model'
import { convertToObjectId } from '@/utils'

const findOne=async (name:string,shopId:string)=>{
    return await discountModel.findOne({
        discount_name:name,
        discount_shopId:convertToObjectId(shopId),
        
    }).lean()
}

export {findOne}