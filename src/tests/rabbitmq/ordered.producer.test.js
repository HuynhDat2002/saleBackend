'use strict'

import amqp from 'amqplib'

export const producerOrderedMessage = async ()=>{
    try{

        const connection = await amqp.connect('amqp://guest:abc123456@localhost')
        const channel = await connection.createChannel()
    
        const queueName = 'ordered-queue'
    
        await channel.assertQueue(queueName,{durable:true})
    
        for(let x=0;x<10;x++){
            const message = `ordered-queued-message::${x}`
            console.log(`message: ${message}`)
            channel.sendToQueue(queueName,Buffer.from(message),{
                persistent:true
            })
        }
    
        setTimeout(()=>{
            connection.close()
        },1000)
    }
    catch (error){
        console.error(`Error ordered-producer:`,error)
    }
}

producerOrderedMessage()