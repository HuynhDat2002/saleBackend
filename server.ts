import 'module-alias/register';
import app from "@/app";
import  'dotenv/config';
// dotenv.config(); // .env


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server starting on port ${process.env.PORT}`)
})

process.on('SIGINT',()=>{
    server.close(()=>console.log('Exit Server Express'))
})