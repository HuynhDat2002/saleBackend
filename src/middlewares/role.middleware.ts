'use strict'

import { AccessControl } from "accesscontrol"

let grantList = [
    {role:"admin",resource:"profile",action:"update:any",attribute:"*, !views"}
]

const rbac =  new AccessControl()

export default rbac