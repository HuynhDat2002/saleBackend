'use strict'

/*
1. add comment [user/shop]
2. get a list of comments [user/shop]
3. delete a comment [user/shop/admin]
*/

import {CreateCommentProps,GetCommentByParentIdProps,DeleteCommentProps} from '@/types'
import {commentModel} from '@/models/comments.model'
import {errorResponse} from '@/core'
import { productModel } from '@/models/product.model';
export const createComment= async ({productId,userId,content,parentCommentId}:CreateCommentProps)=>{
    const comment = new commentModel({
        comment_productId: productId,
        comment_userId:userId,
        comment_content:content,
        comment_parentId:parentCommentId
    })
    if(!comment) throw new errorResponse.BadRequestError("Cannot create a new comment. Please check your informatin again!")
    let rightValue:number=1
    if(parentCommentId){
        //reply comment
        const parentComment:any= await commentModel.findById(parentCommentId)
        if(!parentComment) throw new errorResponse.NotFound('Comment parent not found')

        rightValue= parentComment.comment_right
        await commentModel.updateMany({
            comment_productId:productId,
            comment_right:{$gte:rightValue}
        },{
            $inc:{comment_right:2}
        })

        // await commentModel.updateMany({
        //     comment_productId:productId,
        //     comment_left:{$gte:rightValue}
        // },{
        //     $inc:{comment_right:2}
        // })
       
    }
    else{
        const maxRightValue:any = await commentModel.findOne({
            comment_productId:productId
        },'comment_right',{sort:{comment_right:-1}})
        if(maxRightValue){
            rightValue = maxRightValue.comment_right+1
        }
    }
    comment.comment_right=rightValue+1
    comment.comment_left=rightValue
    await comment.save();
    return comment;
}

export const getCommentByParentId= async ({productId,parentCommentId=null,limit=50,offset=0}:GetCommentByParentIdProps)=>{
    // if(parentCommentId){
        const parent:any = await commentModel.findById(parentCommentId)
        if(!parent) throw new errorResponse.NotFound("Comment parent not found")

        const comments = await commentModel.find({
            comment_productId:productId,
            comment_left:{$gt:parent.comment_left},
            comment_right:{$lt:parent.comment_right}
        })
        .select({
            comment_left:1,
            comment_right:1,
            comment_content:1,
            comment_parentId:1

        })
        .sort({
            comment_left:1
        })

        return comments
    // }

    // const comments = await commentModel.find({
    //     comment_productId:productId,
    //     comment_parentId:parentCommentId
    // })
    // .select({
    //     comment_left:1,
    //     comment_right:1,
    //     comment_content:1,
    //     comment_parentId:1

    // })
    // .sort({
    //     comment_left:1
    // })

    // return commentsDeleteCommentProps
}

export const deleteComment=async ({
    commentId,productId
}:DeleteCommentProps)=>{
    const foundProduct = await productModel.findById(productId)
    if(!foundProduct) throw new errorResponse.NotFound("Product not exists")

    //1.xac dinh gia tri left va right
    const comment:any = await commentModel.findById(commentId)
    if(!comment) throw new errorResponse.NotFound("Comment not exists")

    const leftValue=comment.comment_left;
    const rightValue=comment.comment_right

    const width = rightValue-leftValue+1
    const parentCommentId = comment.comment_parentId

    //2. xoa comment can xoa va cac comment con.
    const deleteCommentChild= await commentModel.deleteMany({
        comment_productId:productId,
        comment_left:{$gte:leftValue,$lte:rightValue},
    })

    //  //3. update left, right cua cac comment con lai
    // const parentComment:any = await commentModel.findById(parentCommentId)
    // if(!parentComment) throw new errorResponse.NotFound("Paren comment not exists")

    // // tim cac comment con lai co chung parentcomment voi comment vua xoa de cap nhat
    // const commentsUpdate=await commentModel.updateMany({
    //     comment_productId:productId,
    //     comment_parentId:parentCommentId,
    //     comment_left:{$gte:leftValue}
    // },{
    //     $inc:{
    //         comment_left:-width,
    //         comment_right:-width
    //     }
    // })

    // const commentsParentUpdate=await commentModel.updateMany({
    //     comment_productId:productId,
    //     comment_right:{$gte:parentComment.comment_right}
    // },{
    //     $inc:{
    //         comment_right:-width
    //     }
    // })

   await commentModel.updateMany({
        comment_productId:productId,
        comment_right:{$gt:rightValue}
    },{
        $inc:{
            comment_right:-width
        }
    })

    await commentModel.updateMany({
        comment_productId:productId,
        comment_left:{$gt:rightValue}
    },{
        $inc:{
            comment_left:-width
        }
    })

    return deleteCommentChild


}