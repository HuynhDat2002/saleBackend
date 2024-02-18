'use strict'

import amqp from 'amqplib'

export const consumerOrderedMessage = async ()=>{
    try{

        const connection = await amqp.connect('amqp://guest:abc123456@localhost')
        const channel = await connection.createChannel()
    
        const queueName = 'ordered-queue'
    
        
         // set prefetched messages
 
         channel.prefetch(1)

        await channel.assertQueue(queueName,{durable:true})
        channel.consume(queueName,msg=>{
            const message = msg.content.toString();
            setTimeout(()=>{
                console.log(`processed:`,message)
                channel.ack(msg)
            },Math.random()*1000) // khong dung theo thu tu
        })
    
        // setTimeout(()=>{
        //     connection.close()
        // },1000)
    }
    catch (error){
        console.error(`Error ordered-producer:`,error)
    }
}

consumerOrderedMessage()

// CHANGE MASTER TO
// MASTER_HOST='172.18.0.2',
// MASTER_PORT=3306,
// MASTER_USER='root',
// MASTER_PASSWORD='trongdat#1335',
// master_log_file='mysql-bin.000001',
// master_log_pos=157,
// master_connect_retry=60,
// GET_MASTER_PUBLIC_KEY=1;
