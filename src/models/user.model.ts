'use strict'

import { model, Schema } from "mongoose";


const DOCUMENT_NAME='User'
const COLLECTION_NAME = 'Users'

const userSchema = new Schema({
    usr_id:{type:Number,required:true},
    usr_slug:{type:String,required:true},
    usr_name:{type:String,default:''},
    usr_password:{type:String,default:''},
    usr_salf:{type:String,default:''},
    usr_email:{type:String,required:true},
    usr_phone:{type:String,default:''},
    usr_sex:{type:String,default:''},
    usr_avatar:{type:String,default:''},
    usr_birthday:{type:Date,default:null},
    usr_role:{type:Schema.Types.ObjectId,ref:'Role'},
    usr_status:{type:String,default:'pending',enum:['pending','active','blocked']}
})

const userModel = model(DOCUMENT_NAME,userSchema)
export {userModel}