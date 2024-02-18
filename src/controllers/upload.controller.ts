'use strict'

import { successResponse } from "@/core";
import {Response , Request,NextFunction} from 'express'
import { uploadService } from "@/services";
export const uploadImageFromURL = async (req:Request,res:Response,next:NextFunction) =>{
    new successResponse.OK({
        message:"Upload Image successfully",
        metadata:await uploadService.uploadImageFromURL()
    }).send(res)
}
