("use strict");
import {getInfoData } from '@/utils';
import {createTokenPair} from '@/auth'
import { createKeyToken } from "./keyToken.service";

import shopModel from "@/models/shop.model";
import { AccessServiceSignUpProps } from "@/types";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { keyTokenService } from ".";
import { resolve } from "path";

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
    try {
        //step1: check email exists??

        const hodelShop = await shopModel.findOne({ email }).lean();
        if (hodelShop)
            return {
                code: "xxx",
                message: "This shop already registered!",
            };
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
            const publicKey:string = crypto.randomBytes(64).toString('hex')
            const privateKey:string = crypto.randomBytes(64).toString('hex')

            console.log({ privateKey, publicKey }); //save collection keystore

            const keyStore:string = await keyTokenService.createKeyToken(
                newShop._id.toString(),
                publicKey,
                privateKey
            );

            if(!keyStore) {
                return {
                    code: "xxxx",
                    message: "keyStore error!",
                };
            }

            //create token pair
            const tokens = await createTokenPair(
                { userId: newShop._id.toString(), email },
                publicKey,
                privateKey
            );
            console.log(`Create Token Success: `, tokens);

            // const publicKeyObject = crypto.createPublicKey(publicKeyString)

            return {
                code: 201,
                metadata: {
                    shop: getInfoData(['_id','name','email'],newShop),
                    tokens,
                },
            };
        }

        return {
            code: 200,
            metadata: null,
        };
    } catch (error: any) {
        return {
            code: "zzz",
            message: error.message,
            status: "error",
        };
    }
};
