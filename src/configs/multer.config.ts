'use strict'

// multer là phần mềm trung gian quản lý việc tải file(nhiều loại file) lên trong express (memory hoặc disk, đa số là dùng disk)

import multer from 'multer'

//memory

const uploadMemory = multer({
    storage:multer.memoryStorage()
})

const uploadDisk = multer({
    storage:multer.diskStorage({
        destination:(res,file,cb)=>{
            cb(null,'./src/uploads')
        },
        filename:(res,file,cb)=>{
            const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()+1E9)
            cb(null,file.filename +'-'+uniqueSuffix)

        }
    })
})