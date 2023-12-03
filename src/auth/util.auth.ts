'use strict'

import { TokenPairProps } from "@/types"
import * as jwt from "jsonwebtoken";
import crypto from 'crypto'
export const createTokenPair = async (payload:any,publicKey:string,privateKey:string):Promise<TokenPairProps|string> =>{
    try{
        const accessToken:string = await jwt.sign(payload,publicKey,{
            //algorithm:'RS256',
            expiresIn:'1 days'
        }) //private không lưu vào database;

        const refreshToken:string = await jwt.sign(payload,privateKey,{
            //algorithm:'RS256',
            expiresIn:'7 days'
        })

        jwt.verify(accessToken,publicKey,(err,decode)=>{
            if(err){
                console.error(`error verify: `,err)
            }else{
                console.log(`decode verify: `,decode)
            } 
        })
        return {accessToken,refreshToken}
    }
    catch(error:any){
        return error;
    }
}
