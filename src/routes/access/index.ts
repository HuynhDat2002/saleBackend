'use strict'


import {asyncHandler} from '@/auth'
import {accessController} from '@/controllers'



import express from 'express'
const accessRouter=express.Router();


//signUp
accessRouter.post('/shop/signup',asyncHandler(accessController.signUp))

export default accessRouter