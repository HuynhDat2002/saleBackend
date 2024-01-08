import { findAllDraftsForShop } from './../models/repositories/product.repository';
import { SuccessResponse } from './../core/success.response';

import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import crypto from 'crypto'
import { Types } from 'mongoose';

//--------------------------models-------------------------------
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

//------repositories----------
export interface QueryProductProps{
  query:Object,limit:number,skip:number
}

export interface FindAllProductProps{
  limit:number,
  page:number,
  sort:string,
  filter:Object,
  select:any
}

export interface FindAProductProps{
  id:string,
  unSelect:any
}

export interface UpdateProductRepositoryProps{
  productId:string,
  payload:any,
  model:any,
}
//--------------------------------configs--------------------------------
export interface CustomRequest extends Request{
  objKey?:ApiKeyModelProps|null|undefined;
  keyStore?:KeyStoreModelProps|null|undefined;
  user?:PayloadTokenPair;
  refreshToken?:string;
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

//----------------------------services--------------------------------

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

export interface CreateKeyTokenProps{
  userId:string,
  publicKey:string,
  privateKey:string,
  refreshToken:string,
}

export interface UpdateRefreshTokenProps{
  oldRefreshToken:string,
  newRefreshToken:string,
}

export interface ProductProps{
  product_name:string,
  product_thumb:string,
  product_description:string,
  product_price:number,
  product_quantity:number,
  product_type:string,
  product_shop:string,
  product_attributes:Object
}

export interface CreateUpdateProductProps{
  type:string,
  payload:ProductProps,
  productId?:string,
}

export interface HandleRefreshTokenV2Props{
  refreshToken:string,
  keyStore:KeyStoreModelProps,
  user:PayloadTokenPair
}

export interface FindProductProps{
  product_shop:string,limit?:number,skip?:number
}

export interface PublishProductByShopProps{
  product_shop:string,
  product_id:string
}

export interface UnPublishProductByShopProps{
  product_shop:string,
  product_id:string
}

//--------------------------------Utils-------------------------------
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

export interface  VerifyJwtProps{
  token:string,
  keySecret:string,
}

//---------------------------core---------------------------------
export interface SuccessResponseProps{
  message?:string,
  metadata?:Object|null,
  statusCode?:number,
  responseStatusCode?:string
}