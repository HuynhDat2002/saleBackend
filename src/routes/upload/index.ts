
'use strict'


import { uploadController } from '@/controllers';
import {asyncHandler} from '@/helpers';
import {uploadDisk} from '@/configs/multer.config'
import express from 'express'
const uploadRouter=express.Router();


//signUp
uploadRouter.post('/product/',asyncHandler(uploadController.uploadImageFromURL))

uploadRouter.post('/product/thumb',uploadDisk.single('file'),asyncHandler(uploadController.uploadImageFromLocal))

export default uploadRouter;