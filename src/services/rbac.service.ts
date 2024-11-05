'use strict'

import { roleModel } from "@/models/role.model"
import { resourceModel } from "@/models/resource.model"
import { errorResponse } from "@/core"

/**
 * new resource
 * @param {string} name
 * @param {string} slug
 * @param {string} description
 */

export const createResource = async ({
    name = 'profile',
    slug = 'p01',
    description = ''
}) => {
 

        //1. check if name or slug exists

        //2. if not, create new resource
        const resource = await resourceModel.create(
            {
                src_name: name,
                src_slug: slug,
                src_description: description
            }
        )
        return resource
   
}

export const resourceList = async ({
    userId = 0,
    limit = 30,
    offset = 0,
    search = ''
}) => {
    //1. check admin ?

    // 2. get list of resource
    const resources = await resourceModel.aggregate([{
        $project: {
            _id: 0,
            name: '$src_name',
            slug: '$src_slug',
            description: '$src_description',
            resourceId: '$_id',
            createdAd: 1

        }
    }])
    if(resources)
    console.log('resources',resources)
    return resources
}


export const createRole = async ({
    name='shop',
    slug='s01',
    description='',
    grants=[]
}) => {
    try{
        //1. check role exits
        //2. create new role
        const role = await roleModel.create({
            rol_name:name,
            rol_slug: slug,
            rol_description:description,
            rol_grants:grants
        })
        return role
    }
    catch (error){
        throw error
    }
}

export const    roleList = async ({
    userId=0,
    limit=30,
    offset=0,
    search=''
}) => {
    //1. user Id

    //2. list role
    const roleList = await roleModel.aggregate([
        {
            $unwind:'$rol_grants'
        },
        {
            $lookup:{
                from:'resources',
                localField:'rol_grants.resource',
                foreignField:'_id',
                as:"resource"
            }
        },
        {
            $unwind:'$resource'
        },
        {
            $project:{
                role:"$rol_name",
                resource:"$resource.src_name",
                action:"$rol_grants.actions",
                attributes:"$rol_grants.attributes"
            }
        },
        {
            $unwind:'$action'

        },{
            $project:{

                role:1,
                resource:1,
                action:1,
                attributes:1,
                _id:0
            }
        }
    ])
    return roleList
}