'use strict'

import { asyncHandler } from '@/auth';
import express from 'express'
const router=express.Router();

import accessRouter from './access';
import { apiKey,permissions } from '@/auth';

// check api key
router.use(apiKey)
//check permission
router.use(permissions('0000'))

router.use('/v1/api',accessRouter)

export default router;