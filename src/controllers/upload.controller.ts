'use strict'

import { successResponse } from "@/core";
import {errorResponse } from '@/core'
import {Response , Request,NextFunction} from 'express'
import { uploadService } from "@/services";
export const uploadImageFromURL = async (req:Request,res:Response,next:NextFunction) =>{
    new successResponse.OK({
        message:"Upload Image successfully",
        metadata:await uploadService.uploadImageFromURL()
    }).send(res)
}

export const uploadImageFromLocal = async (req:Request,res:Response,next:NextFunction) =>{
    const {file } = req;
    if(!file){
        throw new errorResponse.BadRequestError('File missing')
    }
    new successResponse.OK({
        message:"Upload Image From Local successfully",
        metadata:await uploadService.uploadImageFromLocal({
            path:file.path
        })
    }).send(res)
}
