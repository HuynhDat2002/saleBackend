'use strict'

const StatusCode = {
    FORBIDDEN:403,
    CONFLICT:409,
    BADREQUEST:400,
    AUTHFAILURE:401,
    NOTFOUND:404
}

const ResponseStatusCode = {
    FORBIDDEN:'Forbidden error',
    CONFLICT:'Conflict error',
    BADREQUEST:'Bad request error',
    AUTHFAILURE:"Authentication error",
    NOTFOUND:"Not Found"
}

export class ErrorResponse extends Error{
    private status;
    constructor(message:string,status:number){
        super(message);
        this.status= status;
    }
}

export class ConflicRequestError extends ErrorResponse{
    constructor(message = ResponseStatusCode.CONFLICT ,status = StatusCode.CONFLICT){
        super(message,status)
    }
}


export class ForbiddenRequestError extends ErrorResponse{
    constructor(message = ResponseStatusCode.FORBIDDEN,status = StatusCode.FORBIDDEN){
        super(message,status)
    }
}


export class BadRequestError extends ErrorResponse{
    constructor(message = ResponseStatusCode.BADREQUEST,status = StatusCode.BADREQUEST){
        super(message,status)
    }
}

export class AuthFailureError extends ErrorResponse{
    constructor(message = ResponseStatusCode.AUTHFAILURE,status = StatusCode.AUTHFAILURE){
        super(message,status)
    }
}

export class NotFound extends ErrorResponse{
    constructor(message = ResponseStatusCode.NOTFOUND,status = StatusCode.NOTFOUND){
        super(message,status)
    }
}

