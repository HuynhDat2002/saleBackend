'use strict'

import mongoose from "mongoose"
import os from "os"
import process from "process"
const _SECONDS=5000;

// count connect
const countConnect=()=>{
    const numConnections = mongoose.connections.length
    console.log(`Number of connections: ${numConnections}`)
}

//check over load
const checkOverLoad = ()=>{
    setInterval(()=>{
        const numConnections = mongoose.connections.length
        const numCores = os.cpus().length;
        const memoryUsage=process.memoryUsage().rss;

        const maxConnections=numCores *5;
        console.log(`Active connections: ${numConnections}`)
        console.log(`Memory usage: ${memoryUsage/1024/1024}MB`)
        console.log(`Max connections: ${maxConnections}`)
        if(numConnections>maxConnections) console.log(`Connection oveload detected!`)

    },_SECONDS) //monitor every 5 seconds
}

export {countConnect,checkOverLoad}