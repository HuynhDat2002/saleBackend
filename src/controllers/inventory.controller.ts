


'use strict'


import {Request,Response,NextFunction} from 'express'
import { SuccessResponse } from '@/core/success.response'
import { inventoryService } from '@/services'
import { CustomRequest} from '@/types'

export const addStockToInventory= async (req:CustomRequest,res:Response,next:NextFunction)=>{
    new SuccessResponse({
        message:"Create new discount successfully",
        metadata:await inventoryService.addStockToInventory(req.body)
    }).send(res)
}
