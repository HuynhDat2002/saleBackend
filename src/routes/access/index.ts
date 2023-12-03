
'use strict'


import express from 'express'
const accessRouter=express.Router();

import {accessController} from '@/controllers'

//signUp
accessRouter.post('/shop/signup',accessController.signUp)

export default accessRouter