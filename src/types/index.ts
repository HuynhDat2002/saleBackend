import { SuccessResponse } from './../core/success.response';

import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import crypto from 'crypto'
import { Types } from 'mongoose';

export interface ApiKeyModelProps{
    status: boolean;
    key: string;
    permissions: string[];
}
export interface KeyStoreModelProps{
  _id:string|Types.ObjectId;
  user:string|Types.ObjectId;
publicKey:string;
privateKey:string;
refreshTokensUsed:string[]|null;
refreshToken:string
}
export interface CustomRequest extends Request{
  objKey?:ApiKeyModelProps|null|undefined;
  keyStore?:KeyStoreModelProps|null|undefined;
}
export interface expressProps {
  req: Request;
  res: Response;
  next?: NextFunction;
}

export interface ConfigEnvironment {
  app: { port: number };
  db: {
    host: string;
    port: number;
    name: string;
  };
}

export interface ConfigDb {
  dev: ConfigEnvironment;
  pro: ConfigEnvironment;
  [key: string]: ConfigEnvironment;
}

//---------------services--------------

export interface AccessServiceSignUpProps {
  name: string;
  password: string;
  email: string;
}

export interface AccessServiceSignInProps {
  email: string;
  password: string;
  refreshToken?: string|null;
}

export interface KeyTokenProps{
  userId:string,
  publicKey:crypto.KeyObject
}

export interface ShopServiceFindByEmail{
  email:string,
  select?:any,
}

//-----------------Utils-----------------
export interface PayloadTokenPair extends jwt.JwtPayload {
  userId?:string;
  email?:string;
iat?:number;
exp?:number;
}
export interface CreateTokenPairProps{
  payload:PayloadTokenPair|string,
  publicKey:crypto.KeyObject|string;
  privateKey:crypto.KeyObject|string;
}

export interface TokenPairProps{
  accessToken:string,
  refreshToken:string
}


//----------------core--------------------
export interface SuccessResponseProps{
  message?:string,
  metadata:Object,
  statusCode?:number,
  responseStatusCode?:string
}