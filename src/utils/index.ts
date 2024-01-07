
'use strict'


import _ from 'lodash'




const getInfoData = (fields:string[],object={}) =>{
    return _.pick(object,fields)
}

const getSelectData = (select:[])=>{
    return Object.fromEntries(select.map(e=>[e,1]))
}
const getUnSelectData = (unSelect:[])=>{
    return Object.fromEntries(unSelect.map(e=>[e,0]))
}

export {
    getInfoData,
    getSelectData,
    getUnSelectData,
}