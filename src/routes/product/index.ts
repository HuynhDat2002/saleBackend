'use strict'

import express from 'express'
import {asyncHandler} from '@/helpers/asyncHandler'
import {productController} from '@/controllers'
import { authentication } from '@/auth';


const productRouter = express.Router();

//use for user not register
productRouter.get('/search/:keySearch',asyncHandler(productController.searchProduct))


//use for shop
productRouter.use(authentication);

productRouter.post('/create-product',asyncHandler(productController.createProduct))
productRouter.post('/publish/:id',asyncHandler(productController.publishProductByShop))
productRouter.post('/unpublish/:id',asyncHandler(productController.unPublishProductByShop))



productRouter.get('/drafts/all',asyncHandler(productController.findAllDraftsForShop))
productRouter.get('/published/all',asyncHandler(productController.findAllPublishedForShop))


export default productRouter;