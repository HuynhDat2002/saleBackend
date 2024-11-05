'use strict'

import { errorResponse } from "@/core"
import {Request,Response,NextFunction} from 'express'
import rbac from "./role.middleware"
import { roleList } from "@/services/rbac.service"

 const grantAccess =  (action:string,resource:string)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
            rbac.setGrants(await roleList({
                userId:99
            }))
            const  rol_name = req.query.role as string
            const permission = (rbac.can(rol_name) as any)[action](resource)
            if(!permission.granted){
                throw new errorResponse.AuthFailureError("you dont have permission to do it")
            }
            next()
        }
        catch (error){
            next(error)
        }
    }
}

export {
    grantAccess
}

