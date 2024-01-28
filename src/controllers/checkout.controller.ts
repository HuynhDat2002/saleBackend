

'use strict'


import {Request,Response,NextFunction} from 'express'
import { SuccessResponse } from '@/core/success.response'
import { checkoutService } from '@/services'
import { CustomRequest} from '@/types'

export const checkoutReview= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    new SuccessResponse({
        message:"Create new discount successfully",
        metadata:await checkoutService.checkoutReview(req.body)
    }).send(res)
}
