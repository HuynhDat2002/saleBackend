'use strict'

import {model,Schema,Types} from "mongoose";

const DOCUMENT_NAME='Key'
const COLLECTION_NAME='Keys'

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Shop'
    },
    publicKey:{
        type:String,
        required:true
    },
    privateKey:{
        type:String,
        required:true
    },
    refreshToken:{ // pick những hacker truy cập trái phép 
        type:Array,
        default:[]
    }
    
},{
    timestamps:true,
    conllection:COLLECTION_NAME
});

//Export the model
export default model(COLLECTION_NAME, keyTokenSchema);