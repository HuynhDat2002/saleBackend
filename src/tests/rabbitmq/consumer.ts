'use strict'

import amqp from 'amqplib'

const message = 'hello,rabbitmq for trongdat'

const runConsumer = async ()=>{
    try{
        const connection = await amqp.connect('amqp://guest:abc123456@localhost')
        const channel = await connection.createChannel()
        const queuename = 'test rabbit'

        await channel.assertQueue(queuename,{
            durable:true //giup bao luu giu lieu
        })

        channel.consume(queuename,(messages)=>{
            console.log(` Received ${messages?.content.toString()}`)
        },{
            noAck:true,
        })
        console.log('message sent: ',message)

    } catch (error){
        console.error(error)
    }
}

runConsumer().catch(error=>console.error(error))