import { getAllDiscountByShop } from './../../controllers/discount.controller';
'use strict'

import express from 'express'
import { asyncHandler } from '@/helpers';
import {discountController} from '@/controllers'
import { authentication } from '@/auth';

const discountRouter=express.Router();

discountRouter.get('/amount',asyncHandler(discountController.getDiscountAmount))
discountRouter.get('/list-product-code',asyncHandler(discountController.getAllProductByDiscount))
discountRouter.get('/list-discount',asyncHandler(discountController.getAllDiscountByShop))



discountRouter.use(authentication);

discountRouter.post('/create',asyncHandler(discountController.createDiscountCode))


export default discountRouter