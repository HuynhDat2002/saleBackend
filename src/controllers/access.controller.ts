import { expressProps,AccessServiceSignUpProps } from "@/types";
import {accessService} from "@/services"
import { Request,Response,NextFunction } from "express";

export const signUp=async (req:Request,res:Response,next:NextFunction)=>{
   
        console.log("alo")
        console.log(req.body)
        const {name="",password="",email=""}:AccessServiceSignUpProps=req.body ||{};
        console.log("")
        await accessService.signUp(req.body);
    // }
    // catch (e){
    //     // if (next) {
    //     //     next(e); // Gọi next chỉ khi nó tồn tại
    //     // } else{
    //     //     console.error('Next function is undefined.', e);
    //     // }
    //     console.log(e);
    // }
}

