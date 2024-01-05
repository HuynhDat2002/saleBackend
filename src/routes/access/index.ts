'use strict'


import {asyncHandler} from '@/helpers'
import {accessController} from '@/controllers'
import {authentication} from '@/auth/util.auth'



import express from 'express'
const accessRouter=express.Router();


//signUp
accessRouter.post('/shop/signup',asyncHandler(accessController.signUp))
//login
accessRouter.post('/shop/login',asyncHandler(accessController.login));

//authentication

//logout
accessRouter.post('/shop/logout',authentication,asyncHandler(accessController.logout));


export default accessRouter