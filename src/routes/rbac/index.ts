'use strict';

import express from 'express'
import {rbacController} from '@/controllers'
import { asyncHandler } from '@/helpers';
const rbacRouter= express.Router();

rbacRouter.post('/role', asyncHandler(rbacController.newRole))
rbacRouter.get('/roles', asyncHandler(rbacController.listRoles))

rbacRouter.post('/resource', asyncHandler(rbacController.newResource))
rbacRouter.get('/resources', asyncHandler(rbacController.listResources))

export default rbacRouter   