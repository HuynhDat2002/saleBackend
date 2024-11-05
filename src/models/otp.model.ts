'use strict'

import {model,Schema} from 'mongoose'

const DOCUMENT_NAME="OTP"
const COLLECTIONS_NAME="OTPs"

const otpSchema = new Schema({
   otp_token:{type:String,required:true},
   otp_email:{type:String,required:true,unique:true},
   otp_status:{type:Boolean,enum:['pending','active','blocked'],default:'pending'},
   expireAt:{
    type:Date,
    default:Date.now(),
    expires:60*5
   }


},{
    collection:COLLECTIONS_NAME,
    timestamps:true
});

const otpModel = model(DOCUMENT_NAME,otpSchema)

export {otpModel}