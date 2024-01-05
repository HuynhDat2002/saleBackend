'use strict'

import { Response } from "express";
import { SuccessResponseProps } from "@/types";

const StatusCode = {
    OK:200,
    CREATED:201,

}

const ResponseStatusCode = {
OK:"Success",
CREATED:"Created!"
}


export class SuccessResponse {
    private message;
    private status;
    private metadata;
    
    constructor({message,metadata ={}, statusCode=StatusCode.OK,responseStatusCode=ResponseStatusCode.OK}:SuccessResponseProps){
        this.message=!message ? responseStatusCode : message;
        this.status = statusCode;
        
        this.metadata = metadata;

    }
    send(res:Response,headers:Object={}){
        return res.status(this.status).json(this)
    }
}

export class OK extends SuccessResponse{
    constructor({message,metadata={},statusCode=StatusCode.OK,responseStatusCode=ResponseStatusCode.OK}:SuccessResponseProps){
        super({message,metadata,statusCode,responseStatusCode});
    }
}

export class CREATED extends SuccessResponse{
    constructor({message,metadata={},statusCode=StatusCode.CREATED,responseStatusCode=ResponseStatusCode.CREATED}:SuccessResponseProps){
        super({message,metadata,statusCode,responseStatusCode});
    }
}



