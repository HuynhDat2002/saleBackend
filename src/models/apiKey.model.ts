 // lưu trữ token qua ngaỳ tháng

 'use strict'

 import {model,Schema,Types} from "mongoose";
 
 const DOCUMENT_NAME='ApiKey'
 const COLLECTION_NAME='ApiKeys'
 
 // Declare the Schema of the Mongo model
 const apiKeySchema = new Schema({
     key:{
         type:String,
         required:true,
         unique:true
     },
    status:{
         type:Boolean,
         default:true
     },
     permissions:{
        type:[String],
        required:true,
        enum:['0000','1111','2222']
     }
     
 },{
     timestamps:true,
     conllection:COLLECTION_NAME
 });
 
 //Export the model
 export default model(COLLECTION_NAME, apiKeySchema);