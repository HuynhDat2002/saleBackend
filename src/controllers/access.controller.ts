import { handleRefreshToken } from './../services/access.service';
import { expressProps, AccessServiceSignUpProps,CustomRequest } from "@/types";
import { accessService } from "@/services";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "@/core";


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

export const handleToken = async (req: CustomRequest,
    res: Response,
    next: NextFunction) => {
   
            new successResponse.SuccessResponse({
                message: "Update refreshToken successfully",
                metadata: await accessService.handleRefreshToken(req.body.refreshToken)
            }).send(res);
        
}

export const handleTokenV2 = async (req: CustomRequest,
    res: Response,
    next: NextFunction) => {
   if(req.refreshToken && req.keyStore && req.user){

       new successResponse.SuccessResponse({
           message: "Update refreshToken successfully",
           metadata: await accessService.handleRefreshTokenV2({
            refreshToken:req.refreshToken,
            keyStore:req.keyStore,
            user:req.user  
        })
       }).send(res);
   }
        
}
