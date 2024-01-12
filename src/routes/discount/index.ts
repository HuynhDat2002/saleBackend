'use strict'

import express from 'express'
import { asyncHandler } from '@/helpers';
import {discountController} from '@/controllers'

const discountRouter=express.Router();

discountRouter.post('/create',asyncHandler(discountController.createDiscountCode))

export default discountRouter