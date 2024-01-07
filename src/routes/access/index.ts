
'use strict'


import {asyncHandler} from '@/helpers'
import {accessController} from '@/controllers'
import {authentication,authenticationV2} from '@/auth/util.auth'



import express from 'express'
const accessRouter=express.Router();


//signUp
accessRouter.post('/signup',asyncHandler(accessController.signUp))
//login
accessRouter.post('/login',asyncHandler(accessController.login));

//authentication

//logout
accessRouter.post('/logout',authentication,asyncHandler(accessController.logout));

//handleRefreshToken
accessRouter.post('/handleRefreshToken',authenticationV2,asyncHandler(accessController.handleTokenV2));

export default accessRouter