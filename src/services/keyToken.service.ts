'use strict'

import keyTokenModel from "@/models/keyToken.model";
import { KeyTokenProps,CreateKeyTokenProps,UpdateRefreshTokenProps } from "@/types";
import { ObjectId } from "mongoose";
import crypto from 'crypto'
import {asyncHandler} from '@/helpers'

export const createKeyToken=async ({userId,publicKey,privateKey,refreshToken}:CreateKeyTokenProps)=>{
    
      
        //level 0
        // const token = await keyTokenModel.create({
        //     user:userId,
        //     publicKey,
        //     privateKey
        // })
        // return token ? token.publicKey: ""

        //level 1
        const filter = {user:userId}
        const update = {publicKey:publicKey,privateKey:privateKey,refreshToken:refreshToken,refreshTokensUsed:[]}
        const options={upsert:true,new:true}
        const token = await keyTokenModel.findOneAndUpdate(filter,update,options).lean();
        
        return token ? token.publicKey: "";

   
}


export const findKeyByUserId  =  async (userId:string)=>{
    
    const key = await keyTokenModel.findOne({user:userId});
    return key;
}

export const removeKeyById = async (id:string)=>{
    return await keyTokenModel.deleteOne({_id:id});
}   

export const findByRefreshTokenUsed = async (refreshToken:string)=>{
    return await keyTokenModel.findOne({refreshTokensUsed:refreshToken}).lean();
}

export const deleteTokenById = async (userId:string|undefined)=>{
    return await keyTokenModel.deleteOne({user:userId});
}


export const findByRefreshToken= async (refreshToken:string)=>{
    return await keyTokenModel.findOne({refreshToken:refreshToken});
}

export const updateRefreshToken= async ({oldRefreshToken,newRefreshToken}:UpdateRefreshTokenProps)=>{
    return await keyTokenModel.findOneAndUpdate({
        refreshToken:oldRefreshToken
    },{
        $set:{
            refreshToken:newRefreshToken
        },
        $addToSet:{
            refreshTokensUsed:oldRefreshToken
        }
    },{
        new:true,
        upsert:true,
    })
}
