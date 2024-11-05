'use strict'

import { successResponse } from "@/core"
import { Request, Response, NextFunction } from "express";
import { rbacService } from "@/services";
export const newRole = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    new successResponse.CREATED({
        message: "create role",
        metadata: await rbacService.createRole(req.body)
    }).send(res)

}

export const newResource = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    new successResponse.CREATED({
        message: "create resource",
        metadata: await rbacService.createResource(req.body)
    }).send(res)

}

export const listRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    new successResponse.SuccessResponse({
        message: "get list role",
        metadata:await rbacService.roleList(req.query)
    }).send(res)

}

export const listResources = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    new successResponse.CREATED({
        message: "get list resource",
        metadata: await rbacService.resourceList(req.query)
    }).send(res)

}