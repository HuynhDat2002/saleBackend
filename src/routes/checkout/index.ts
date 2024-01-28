import { asyncHandler } from './../../helpers/asyncHandler';

'use strict'


import express from 'express'
const checkoutRouter=express.Router();

import {checkoutController} from '@/controllers'

//signUp
checkoutRouter.post('/review',asyncHandler(checkoutController.checkoutReview))

export default checkoutRouter