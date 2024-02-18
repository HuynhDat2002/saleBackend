
'use strict'


import { uploadController } from '@/controllers';
import {asyncHandler} from '@/helpers';
import express from 'express'
const uploadRouter=express.Router();


//signUp
uploadRouter.post('/productthumb/',asyncHandler(uploadController.uploadImageFromURL))

export default uploadRouter;