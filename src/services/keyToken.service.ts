'use strict'

import keyTokenModel from "@/models/keyToken.model";
import { KeyTokenProps } from "@/types";
import { ObjectId } from "mongoose";
import crypto from 'crypto'

export const createKeyToken=async (userId:string,publicKey:string,privateKey:string):Promise<string>=>{
    
    try{    
        const token = await keyTokenModel.create({
            user:userId,
            publicKey,
            privateKey
        })

        return token ? token.publicKey: ""
    }catch(error:any){
        return error;
    }
}