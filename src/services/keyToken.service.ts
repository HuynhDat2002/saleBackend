'use strict'

import keyTokenModel from "@/models/keyToken.model";
import { KeyTokenProps } from "@/types";
import { ObjectId } from "mongoose";
import crypto from 'crypto'
import {asyncHandler} from '@/helpers'

export const createKeyToken=async (userId:string,publicKey:string,privateKey:string,refreshToken:string)=>{
    
      
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


export const findKeyByUserId  =  async (userId:any)=>{
    
    const key = await keyTokenModel.findOne({user:userId}).lean();
    return key
}

export const removeKeyById = async (id:string)=>{
    return await keyTokenModel.deleteOne({_id:id});
}   