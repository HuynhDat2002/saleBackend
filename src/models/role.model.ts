'use strict'

import { model, Schema } from "mongoose";


const DOCUMENT_NAME='Role'
const COLLECTION_NAME = 'Roles'

// const grantList=[
//     {role:'admin',resource:'profile',action:'update:any',attributes:'*'},
//     {role:'admin',resource:'balance',action:'update:any',attributes:'*,unmount'},


//     {role:'shop',resource:'profile',action:'update:own',attributes:'*'},
//     {role:'shop',resource:'balance',action:'update:own',attributes:'*,unmount'},


//     {role:'user',resource:'profile',action:'update:own',attributes:'*'},
//     {role:'user',resource:'balance',action:'read:own',attributes:'*'}


// ]

const roleSchema = new Schema({
    rol_name:{type:String,default:'user',enum:['user', 'shop','admin']},
    rol_slug:{type:String,required:true,default:''}, //000077
    rol_status:{type:String,default:'pending',enum:['pending', 'active','blocked']},
    rol_description:{type:String,default:''},
    rol_grants:[
        {
            resource:{type:Schema.Types.ObjectId,ref:'Resource',required:true},
            actions:[{type:String,required:true}],
            attributes:{type:String,default:'*'}
        }

    ]
})

const roleModel = model(DOCUMENT_NAME,roleSchema)
export {roleModel}