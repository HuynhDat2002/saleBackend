
("use strict");
import { getInfoData } from "@/utils";
import { createTokenPair,verifyJwt } from "@/auth";
import { errorResponse } from "@/core";
import shopModel from "@/models/shop.model";

import { AccessServiceSignUpProps, KeyStoreModelProps,HandleRefreshTokenV2Props } from "@/types";
import { AccessServiceSignInProps,PayloadTokenPair } from "@/types";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { keyTokenService } from ".";
import { resolve } from "path";
import { TokenPairProps } from "@/types";

import { shopService } from '@/services';



const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITER: "EDITER",
    ADMIN: "ADMIN",
};


export const signUp = async ({
    name,
    password,
    email,
}: AccessServiceSignUpProps) => {
    // try {
    //step1: check email exists??

    const hodelShop = await shopModel.findOne({ email }).lean();
    if (hodelShop) {
        throw new errorResponse.BadRequestError("Error: Shop already registered");
        // return {
        //     code: "xxx",
        //     message: "This shop already registered!",
        // };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
    });

    //sign and verity token
    if (newShop) {
        // create privateKey(use to sign token), publicKey(use to verify token)
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //     modulusLength: 4096,
        //     publicKeyEncoding: { type: 'spki', format: 'pem' },
        //     privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        // });

        // cách làm đơn giản
        const publicKey: string = crypto.randomBytes(64).toString("hex");
        const privateKey: string = crypto.randomBytes(64).toString("hex");

        console.log({ privateKey, publicKey }); //save collection keystore

        //create token pair
        const tokens: TokenPairProps = await createTokenPair({
            payload: { userId: newShop._id.toString(), email },
            publicKey:publicKey,
            privateKey:privateKey
        });
        console.log(`Create Token Success: `, tokens);

        const keyStore: string = await keyTokenService.createKeyToken({
            userId:newShop._id.toString(),
            publicKey: publicKey, 
            privateKey:privateKey, 
            refreshToken:tokens.refreshToken
    });

        if (!keyStore) {
            return {
                code: "xxxx",
                message: "keyStore error!",
            };
        }


        // const publicKeyObject = crypto.createPublicKey(publicKeyString)

        return {

            user: getInfoData(["_id", "name", "email"], newShop),
            tokens,

        };
    }

    return {
        code: 200,
        metadata: null,
    };
    // } catch (error: any) {
    //     return {
    //         code: "zzz",
    //         message: error.message,
    //         status: "error",
    //     };
    // }
};

//--------------------login---------------------
// 1. Check email
// 2.match password
// 3.create accessToken and refreshToken and save
// 4.generate tokens
// 5. get data return login
export const login = async ({ email, password, refreshToken }: AccessServiceSignInProps) => {
    //1.
    const foundShop = await shopService.findByEmail({ email });
    if (!foundShop) throw new errorResponse.BadRequestError("Error: Shop not found")

    //2.
    const matchPassword = bcrypt.compare(password, foundShop.password);
    if (!matchPassword) throw new errorResponse.AuthFailureError("Password not match");

    //3.
    const publicKey: string = crypto.randomBytes(64).toString('hex');
    const privateKey: string = crypto.randomBytes(64).toString('hex');


    const tokens:TokenPairProps = await createTokenPair({
        payload: { userId: foundShop._id.toString(), email },
        publicKey: publicKey,
        privateKey: privateKey
    });

    //4.
    await keyTokenService.createKeyToken({
        userId:foundShop._id.toString(),
        publicKey: publicKey, 
        privateKey:privateKey, 
        refreshToken:tokens.refreshToken
    });

    return {
        shop: getInfoData(['_id', 'name', 'email'], foundShop),
        tokens
    }


}

export const logout = async (keyStore: KeyStoreModelProps) => {
    const delKey = await keyTokenService.removeKeyById(keyStore._id.toString())
    return delKey;

}


//1. check this token used?
export const handleRefreshToken = async (refreshToken:string)=>{
    // check if token has been used
    const foundToken =await keyTokenService.findByRefreshTokenUsed(refreshToken)
    //if it has been used
    if(foundToken){
        // decode to see who you are
        const verifyToken = await verifyJwt({token:refreshToken,keySecret:foundToken.privateKey})
        if(typeof verifyToken==="object"){
            //delete all of token in keyStore
            const deleteToken = await keyTokenService.deleteTokenById(verifyToken.userId)
            throw new errorResponse.ForbiddenRequestError("Something wrong happed! Please login again")
        } 

    }

    const holderToken = await keyTokenService.findByRefreshToken(refreshToken)
    if(!holderToken) throw new errorResponse.AuthFailureError("User not registered");

    // verifyToken
    const verifyTokenHolder:PayloadTokenPair|string = await verifyJwt({token:refreshToken,keySecret:holderToken.privateKey})
        if(typeof verifyTokenHolder==="object"){
            //check userid
            const email:string= verifyTokenHolder.email as string
            const userId:string= verifyTokenHolder.userId as string

            const foundUser = await shopService.findByEmail({email})
            if(!foundUser) throw new errorResponse.AuthFailureError("User not registered");

            //create a new pair of token
            const newToken = await createTokenPair({
                payload:{userId,email},
                publicKey:holderToken.publicKey,
                privateKey:holderToken.privateKey,
            });
            const updateToken = await keyTokenService.updateRefreshToken({
             oldRefreshToken:refreshToken,
             newRefreshToken:newToken.refreshToken,
            });
            return {
                user:{userId,email},
                newToken,
            }
        } 
        return {}
}

export const handleRefreshTokenV2 = async ({refreshToken,keyStore,user}:HandleRefreshTokenV2Props)=>{

    const userId:string = user.userId as string;
    const email:string =user.email as string;

    // check if token has been used
    if(keyStore.refreshTokensUsed?.includes(refreshToken)){
        
        //delete all of token in keyStore
        const deleteToken = await keyTokenService.deleteTokenById(userId)
        throw new errorResponse.ForbiddenRequestError("Something wrong happed! Please login again") 
    }
    
    if(keyStore.refreshToken!==refreshToken) throw new errorResponse.AuthFailureError("User not registered")
   
    const foundUser = await shopService.findByEmail({email})
    if(!foundUser) throw new errorResponse.AuthFailureError("User not registered");

    //create a new pair of token
    const newToken = await createTokenPair({
        payload:{userId,email},
        publicKey:keyStore.publicKey,
        privateKey:keyStore.privateKey,
    });
    const updateToken = await keyTokenService.updateRefreshToken({
     oldRefreshToken:refreshToken,
     newRefreshToken:newToken.refreshToken,
    });
    return {
        user,
        newToken,
    }
}