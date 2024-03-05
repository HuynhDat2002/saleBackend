'use strict'

import { model, Schema } from "mongoose";


const DOCUMENT_NAME='Resource'
const COLLECTION_NAME = 'Resources'

const resourceSchema = new Schema({
   src_name:{type:String,required:true}, //profile
   src_slug:{type:String,required:true}, //0001
   src_description:{type:String,default:''}

})

const resourceModel = model(DOCUMENT_NAME,resourceSchema)
export {resourceModel}