'use strict'

import express from 'express'
import { asyncHandler } from '@/helpers';
import {cartController} from '@/controllers'
import { authentication } from '@/auth';

const cartRouter=express.Router();

cartRouter.patch('/update',asyncHandler(cartController.updateUserCart))
cartRouter.use(authentication);

cartRouter.post('/',asyncHandler(cartController.addToCart))
cartRouter.delete('/',asyncHandler(cartController.deleteUserCart))
cartRouter.get('',asyncHandler(cartController.getListUserCart))





export default cartRouter