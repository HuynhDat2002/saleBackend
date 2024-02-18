'use strict'

import express from 'express'
const router=express.Router();

import accessRouter from './access';
import productRouter from './product';
import discountRouter from './discount';
import cartRouter from './cart';
import { apiKey,permissions } from '@/auth';
import checkoutRouter from './checkout';
import inventoryRouter from './inventory';
import { pushToLogDiscord } from '@/middlewares';
import commentRouter from './comment'
import notificationRouter from './notification';
import uploadRouter from './upload';
// add log to discord
router.use(pushToLogDiscord)
// check api key
router.use(apiKey)
//check permission
router.use(permissions('0000'))

router.use('/v1/api/product',productRouter)

router.use('/v1/api/shop',accessRouter)

router.use('/v1/api/discount',discountRouter)

router.use('/v1/api/cart',cartRouter)
router.use('/v1/api/checkout',checkoutRouter)
router.use('/v1/api/inventory',inventoryRouter)
router.use('/v1/api/comment',commentRouter)
router.use('/v1/api/notification',notificationRouter)
router.use('/v1/api/upload',uploadRouter)




export default router;