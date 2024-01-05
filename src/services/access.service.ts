("use strict");
import { getInfoData } from "@/utils";
import { createTokenPair } from "@/auth";
import { errorResponse } from "@/core";
import shopModel from "@/models/shop.model";

import { AccessServiceSignUpProps, KeyStoreModelProps } from "@/types";
import { AccessServiceSignInProps } from "@/types";

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

        const keyStore: string = await keyTokenService.createKeyToken(
            newShop._id.toString(),
            publicKey,
            privateKey,
            tokens.refreshToken,
        );

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
    const foundUser = await shopService.findByEmail({ email });
    if (!foundUser) throw new errorResponse.BadRequestError("Error: User not found")

    //2.
    const matchPassword = bcrypt.compare(password, foundUser.password);
    if (!matchPassword) throw new errorResponse.AuthFailureError("Password not match");

    //3.
    const publicKey: string = crypto.randomBytes(64).toString('hex');
    const privateKey: string = crypto.randomBytes(64).toString('hex');


    const tokens:TokenPairProps = await createTokenPair({
        payload: { userId: foundUser._id.toString(), email },
        publicKey: publicKey,
        privateKey: privateKey
    });

    //4.
    await keyTokenService.createKeyToken(foundUser._id.toString(), publicKey, privateKey, tokens.refreshToken);

    return {
        user: getInfoData(['_id', 'name', 'email'], foundUser),
        tokens
    }


}

export const logout = async (keyStore: KeyStoreModelProps) => {
    const delKey = await keyTokenService.removeKeyById(keyStore._id.toString())
    return delKey;

}
