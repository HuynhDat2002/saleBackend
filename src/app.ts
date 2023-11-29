import express from "express";
import morgan from "morgan";
import helmet from "helmet"
import compression from "compression";
// import 'module-alias/register';
const app = express();


//---------init middlewares------------
app.use(morgan("dev")) //trạng thái code được tô màu
// app.use(morgan("combined")) //đầu ra full
// app.use(morgan("common")) //đầu ra nhật ký chung
// app.use(morgan("short")) // thời gian phản hồi, get
// app.use(morgan("tiny")) // đầu ra ít hơn dev

app.use(helmet()) // giúp bảo mật app bên server bằng cách đặt các header bảo mật HTTP khác nhau
app.use(compression()) // giảm băng thông

//---------------init db------------------
import {instanceMongodb} from '@/db'
instanceMongodb
import {checkOverLoad} from '@/helpers'
checkOverLoad();

//---------------init routes-----------------
app.get('/',(req,res,next)=>{
    const strCompression="Hello Compress"
    return res.status(200).json({
        message:"Welcome",
        metadata:strCompression.repeat(10000)
    })
})


//handling error

export default app ;