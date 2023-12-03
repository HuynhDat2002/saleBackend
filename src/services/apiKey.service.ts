'use strict'
import apiKeyModel from '@/models/apiKey.model'
import crypto from 'crypto'

export const findByKey = async (key:string)=>{
    // const newKey = await apiKeyModel.create({key:crypto.randomBytes(64).toString('hex'),permissions:['0000']})
    const objKey = await apiKeyModel.findOne({key:key}).lean()
    return objKey
}