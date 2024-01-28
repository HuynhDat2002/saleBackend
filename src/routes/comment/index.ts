'use strict'

import express from "express"
import { authentication } from "@/auth"
import { asyncHandler } from "@/helpers"
import { commentController } from "@/controllers"
const commentRouter = express.Router()

commentRouter.use(authentication)

commentRouter.post('/',asyncHandler(commentController.createComment))
commentRouter.get('',asyncHandler(commentController.getCommentByParentId))
commentRouter.delete('',asyncHandler(commentController.deleteComment))
export default commentRouter