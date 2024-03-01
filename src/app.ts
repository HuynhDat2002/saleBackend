import express, { Application } from "express";
import {Request,Response,NextFunction} from 'express'
import { errorResponse } from "@/core";

import morgan from "morgan";
import helmet from "helmet"
import compression from "compression";
import cors from 'cors'
import 'module-alias/register';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import  'dotenv/config';

import router from "@/routes";
const app:Application = express();


//---------init middlewares------------

app.use(morgan("dev")) //trạng thái code được tô màu
// app.use(morgan("combined")) //đầu ra full
// app.use(morgan("common")) //đầu ra nhật ký chung
// app.use(morgan("short")) // thời gian phản hồi, get
// app.use(morgan("tiny")) // đầu ra ít hơn dev

app.use(helmet()) // giúp bảo mật app bên server bằng cách đặt các header bảo mật HTTP khác nhau
app.use(compression()) // giảm băng thông
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
app.use(cookieParser(process.env.SESSION_SECRET));

//---------------init db------------------
import {instanceMongodb} from '@/db'

instanceMongodb
// import {checkOverLoad} from '@/helpers'
// checkOverLoad();


// test pub.sub redis
import '@/tests/inventory.test'
import {purchaseProduct} from '@/tests/product.test'
purchaseProduct('product:001',10)
//---------------init routes-----------------

app.use('/',router)

//handling error
app.use((req:Request,res:Response,next:NextFunction)=>{
    const error:any = new Error('Not Found')
    error.status = 404;
    next(error);
})
app.use((error:any,req:Request,res:Response,next:NextFunction) => {
     const status = error.status || 500;
     return res.status(status).json({
        status: "error",
        code: status,
        message:error.message||"Internal Server Error",
        stack:error.stack,
     })

 })

export default app ;