import 'module-alias/register';
import app from "@/app";
import  'dotenv/config';
// dotenv.config(); // .env


const server = app.listen(process.env.DEV_APP_PORT,()=>{
    console.log(`Server starting on port ${process.env.DEV_APP_PORT}`)
})

// process.on('SIGINT',()=>{
//     server.close(()=>console.log('Exit Server Express'))
// })