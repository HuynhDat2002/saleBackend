'use strict'

// multer là phần mềm trung gian quản lý việc tải file(nhiều loại file) lên trong express (memory hoặc disk, đa số là dùng disk)

import multer from 'multer'

//memory: sử dụng bộ nhớ trong máy

export const uploadMemory = multer({
    storage:multer.memoryStorage()
})


// nên sử dụng disk để tránh ảnh hưởng bộ nhớ
export const uploadDisk = multer({
    storage:multer.diskStorage({
        destination:(res,file,cb)=>{
            cb(null,'./src/uploads/')
        },
        filename:(res,file,cb)=>{
            cb(null,`${Date.now()}-${file.originalname}`)

        }
    })
})