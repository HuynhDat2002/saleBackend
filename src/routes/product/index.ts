'use strict'

import express from 'express'
import {asyncHandler} from '@/helpers/asyncHandler'
import {productController} from '@/controllers'
import { authentication } from '@/auth';


const productRouter = express.Router();

//use for user not register
productRouter.get('/search/:keySearch',asyncHandler(productController.searchProduct))
productRouter.get('/published/all',asyncHandler(productController.findAllPublishedForShop))
productRouter.get('/',asyncHandler(productController.findAllProduct))
productRouter.get('/:id',asyncHandler(productController.findProduct))



//use for shop
productRouter.use(authentication);

productRouter.post('/create-product',asyncHandler(productController.createProduct))
productRouter.post('/publish/:id',asyncHandler(productController.publishProductByShop))
productRouter.post('/unpublish/:id',asyncHandler(productController.unPublishProductByShop))
productRouter.patch('/update/:id',asyncHandler(productController.updateProduct))


productRouter.get('/drafts/all',asyncHandler(productController.findAllDraftsForShop))


export default productRouter;