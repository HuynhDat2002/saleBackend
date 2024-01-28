
'use strict'

import { CreateTokenPairProps, TokenPairProps,CustomRequest,PayloadTokenPair,
VerifyJwtProps } from "@/types"
import {Request,Response,NextFunction} from 'express';

import {asyncHandler} from '@/helpers'
import * as jwt from "jsonwebtoken";
import crypto from 'crypto'
import { AuthFailureError } from "@/core/error.response";
import { keyTokenService } from "@/services";
import { errorResponse } from "@/core";


const HEADER = {
    API_KEY : 'x-api-key',
    CLIENT_ID:'x-client-id',
    AUTHORIZATION:'authorization',
    REFRESHTOKEN:"refreshtoken"
}

export const createTokenPair = async ({payload,publicKey,privateKey}:CreateTokenPairProps)=>{
    
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

export const authentication  = asyncHandler( async (req:CustomRequest,res:Response,next:NextFunction)=>{
    /*
        1. check userid missing?
        2. get accessToken
        3. verify token
        4. check user in dbs
        5. check keystore with this userid
        6. if ok, next
    */


    //1.
    const userId:string = req.headers[HEADER.CLIENT_ID] as string
    if(!userId) throw new AuthFailureError("Invalid request! User not found")

    //2.
    const keyStore = await keyTokenService.findKeyByUserId(userId)
    if(!keyStore) throw new errorResponse.NotFound("Not found user in key store")

    //3.
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    const accessTokenAsString:string = accessToken as string
    if(!accessToken) throw new errorResponse.AuthFailureError("Invalid accessToken");
     try{
        const decodeUser:PayloadTokenPair|string =await jwt.verify(accessTokenAsString,keyStore.publicKey)
        if(typeof decodeUser ==="object"){
            console.log("decode ",decodeUser );
            if(userId !== decodeUser.userId) throw new AuthFailureError("Invalid decode request");
            req.keyStore = keyStore;
            req.user = decodeUser;
            return next();
        }
     }
     catch (error){
        throw error
     }


})

export const authenticationV2  = asyncHandler( async (req:CustomRequest,res:Response,next:NextFunction)=>{
    /*
        1. check userid missing?
        2. check key store
        3. verify token
        4. check user in dbs
        5. check keystore with this userid
        6. if ok, next
    */


    //1.
    const userId:string = req.headers[HEADER.CLIENT_ID] as string
    if(!userId) throw new AuthFailureError("Invalid request! User not found")

    //2.
    const keyStore = await keyTokenService.findKeyByUserId(userId)
    if(!keyStore) throw new errorResponse.NotFound("Not found user in key store")

    //3.
    const refreshToken = req.headers[HEADER.REFRESHTOKEN]
    const refreshTokenAsString:string = refreshToken as string
    if(!refreshToken) throw new errorResponse.AuthFailureError("Invalid refreshToken");
     try{
        const decodeUser:PayloadTokenPair|string =await jwt.verify(refreshTokenAsString,keyStore.privateKey)
        if(typeof decodeUser ==="object"){
            console.log("decode ",decodeUser );
            if(userId !== decodeUser.userId) throw new AuthFailureError("Invalid decode request");
            req.keyStore = keyStore;
            req.user = decodeUser;
            req.refreshToken=refreshTokenAsString;
            return next();
        }
     }
     catch (error){
        throw error
     }


})

export const verifyJwt = async ({token,keySecret}:VerifyJwtProps)=>{
    return await jwt.verify(token,keySecret)
}