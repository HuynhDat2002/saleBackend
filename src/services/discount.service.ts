'use strict'

import {CreateDiscountCodeProps} from '@/types'
import { errorResponse } from '@/core'
import { discountModel } from '@/models/discount.model'
import * as discountRepository from '@/models/repositories/discount.repository'
/*
    1. generator discount code [shop/admin]
    2. get discount amount [user]
    3. get all dis count codes [user|shop]
    4. verify discount code [user]
    5. delete discount code [shop|admin]
    6. cancel discount code [user]
    7. apply discount [user]

*/

const createDiscountCode = (body:CreateDiscountCodeProps)=>{
    const {
        code,start_date,end_date,is_active,shopId,min_order_value, products_id,applies_to,
        name,description,
        type,value,max_value,max_use,max_per_user_use
    }= body

    if(new Date()>new Date(start_date)||new Date()||new Date()>new Date(end_date)){
        throw new errorResponse.BadRequestError("Start or end time discount is wrong")
    }

    const foundDiscount = discountRepository.findOne(name,shopId)
const a =foundDiscount.discount_name;
}

export {
    createDiscountCode,
}