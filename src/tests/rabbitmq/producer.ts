'use strict'

import amqp from 'amqplib'

const message = 'hello,rabbitmq for trongdat'

const runProducer = async ()=>{
    try{
        const connection = await amqp.connect('amqp://guest:abc123456@localhost')
        const channel = await connection.createChannel()
        const queuename = 'test rabbit'

        await channel.assertQueue(queuename,{
            durable:true //giup bao luu giu lieu
        })

        channel.sendToQueue(queuename,Buffer.from(message))
        console.log('message sent: ',message)

    } catch (error){
        console.error(error)
    }
}

runProducer().catch(error=>console.error(error))