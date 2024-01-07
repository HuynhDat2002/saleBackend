'use strict'

import express from 'express'
const router=express.Router();

import accessRouter from './access';
import productRouter from './product';
import { apiKey,permissions } from '@/auth';


// check api key
router.use(apiKey)
//check permission
router.use(permissions('0000'))

router.use('/v1/api/product',productRouter)

router.use('/v1/api/shop',accessRouter)


export default router;