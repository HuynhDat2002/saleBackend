import 'module-alias/register';
import app from "@/app";

const PORT =3000

const server = app.listen(PORT,()=>{
    console.log(`Server starting on port ${PORT}`)
})

process.on('SIGINT',()=>{
    server.close(()=>console.log('Exit Server Express'))
})