'use strict'

import { commentService } from "@/services"

import { successResponse } from "@/core"
import { Request,Response,NextFunction } from "express"
export const createComment = async (req: Request, res: Response, next: NextFunction)=>{
    new successResponse.SuccessResponse({
        message:"Created new comment",
        metadata:await commentService.createComment(req.body)
    }).send(res)
}

export const getCommentByParentId = async (req: Request, res: Response, next: NextFunction)=>{
    let query:any = req.query
    new successResponse.SuccessResponse({
        message:"Get Comments By ParentId Successfully",
        metadata:await commentService.getCommentByParentId(query)
    }).send(res)
}

export const deleteComment= async (req: Request, res: Response, next: NextFunction)=>{
    new successResponse.SuccessResponse({
        message:"Delete comment Successfully",
        metadata:await commentService.deleteComment(req.body)
    }).send(res)
}