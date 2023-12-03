
'use strict'

import {Request,Response,NextFunction} from 'express'
import { apiKeyService } from '@/services'
import { CustomRequest } from '@/types'

const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION:'authorization'
}

export const apiKey=async (req:CustomRequest,res:Response,next:NextFunction)=>{
    try{
        const key = req.headers[HEADER.API_KEY]?.toString()
        console.log("")
        if(!key){
            return res.status(403).json({
                message:'Forbidden Error'
            })
        }
        const objKey = await apiKeyService.findByKey(key)
        if(!objKey){
            return res.status(403).json({
                message:'Forbidden Error'
            })
        }
        req.objKey = objKey;
        console.log('checked')
        return next()
    }
    catch (error:any){
        console.error(error)
    }
}

export const permissions = (permission:string)=>{
    return (req:CustomRequest,res:Response,next:NextFunction)=>{
        if(!req.objKey?.permissions){
            return res.status(403).json({
                message:'permission denied'
            })
        }

        console.log('permissions: ',req.objKey?.permissions)
        const validPermission = req.objKey?.permissions.includes(permission)
        if(!validPermission){
            return res.status(403).json({
                message:'permission denied'
            })
        }

        return next();
    }
}