
'use strict'

import express from 'express'
import { asyncHandler } from '@/helpers';
import {notificationController} from '@/controllers'
import { authentication } from '@/auth';

const notificationRouter=express.Router();

//---------------------user login------------------------
notificationRouter.use(authentication);
notificationRouter.get('',asyncHandler(notificationController.listNotiByUser))

export default notificationRouter