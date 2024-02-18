'use strict'

// multer là phần mềm trung gian quản lý việc tải file(nhiều loại file) lên trong express (memory hoặc disk, đa số là dùng disk)

import { cloudinary } from "@/configs";
import {UploadImage} from '@/types'
import { UploadApiResponse } from "cloudinary";
export const uploadImageFromURL = async ()=>{
 

        const urlImage='https://deo.shopeemobile.com/shopee/shopee-mobilemall-live-sg/homepagefe/26c9324913c021677768c36975d635ef.png';
        const folderName='product/shopId', newFileName='testDemo';
        const result = await cloudinary.uploader.upload(urlImage,{
            //public_id:newFileName
            folder:folderName
        })
        console.log(result)
        return result;
}


export const uploadImageFromLocal = async ({path,folderName}:UploadImage)=>{
 


    const result:UploadApiResponse = await cloudinary.uploader.upload(path,{
        //public_id:newFileName
        folder:folderName
    })
    console.log(result)
    return {
        image_url:result.secure_url,
        folder:result.folder,
        shopId:8089

    };
}
