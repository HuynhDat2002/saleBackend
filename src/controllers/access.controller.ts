import { expressProps, AccessServiceSignUpProps } from "@/types";
import { accessService } from "@/services";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "@/core";
import {CustomRequest} from '@/types'

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    new successResponse.CREATED({
        message: "Registed OK",
        metadata: await accessService.signUp(req.body)
    }).send(res);

    // }
    // catch (e){
    //     // if (next) {
    //     //     next(e); // Gọi next chỉ khi nó tồn tại
    //     // } else{
    //     //     console.error('Next function is undefined.', e);
    //     // }
    //     console.log(e);
    // }
};

export const login = async (req: Request,
    res: Response,
    next: NextFunction) => {
    new successResponse.SuccessResponse({
        message: "Login successfully",
        metadata: await accessService.login(req.body)
    }).send(res);
}

export const logout = async (req: CustomRequest,
    res: Response,
    next: NextFunction) => {
        if(req.keyStore){
            new successResponse.SuccessResponse({
                message: "Logout successfully",
                metadata: await accessService.logout(req.keyStore)
            }).send(res);
        }
}
