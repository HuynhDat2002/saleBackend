'use strict'

import {Logger} from '@/loggers/discord.log.v2'

import {Request,Response,NextFunction} from 'express'

export const pushToLogDiscord = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        Logger.sendToFormatCode({
            title:`Method: ${req.method}`,
            code:req.method === 'GET'?req.query:req.body,
            message:`${req.get('host')}${req.originalUrl}`
        })

        
        return next()
    }
    catch (error) {
        next(error)
    }
}

