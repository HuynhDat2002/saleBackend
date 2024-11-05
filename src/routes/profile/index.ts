'use strict';

import express from 'express'
import {profileController} from '@/controllers'
const profileRouter= express.Router();
import { grantAccess } from '@/middlewares/rbac';

profileRouter.get('/viewAny', grantAccess("readAny","profile"), profileController.profiles)
profileRouter.get('/viewOwn', profileController.profile)


export default profileRouter