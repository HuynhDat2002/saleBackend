'use strict'

import { notificationService } from "@/services"
import {Request,Response,NextFunction} from 'express'
import {CustomRequest} from '@/types'
import { SuccessResponse } from '@/core/success.response'

export const listNotiByUser = async (req:CustomRequest,res:Response,next:NextFunction)=>{
    new SuccessResponse({
        message:"Get list noti by user successfully",
        metadata:await notificationService.listNotiByUser(req.body)
    }).send(res)
}