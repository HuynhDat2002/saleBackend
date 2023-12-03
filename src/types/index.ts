
import { Request, Response, NextFunction } from "express";

import crypto from 'crypto'

export interface ApiKeyModelProps{
  
    status: boolean;
    key: string;
    permissions: string[];
}
export interface CustomRequest extends Request{
  objKey?:ApiKeyModelProps|null|undefined;
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

export interface KeyTokenProps{
  userId:string,
  publicKey:crypto.KeyObject
}


//-----------------Utils-----------------

export interface CreateTokenPairProps{
  payload:any,
  publicKey:crypto.KeyObject,
  privateKey:crypto.KeyObject
}

export interface TokenPairProps{
  accessToken:string,
  refreshToken:string
}