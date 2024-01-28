
'use strict'

import express from 'express'
import { asyncHandler } from '@/helpers';
import {inventoryController} from '@/controllers'
import { authentication } from '@/auth';

const inventoryRouter=express.Router();


inventoryRouter.use(authentication);

inventoryRouter.post('/',asyncHandler(inventoryController.addStockToInventory))

export default inventoryRouter