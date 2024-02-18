'use strict'

import amqp from 'amqplib'

const message = 'hello,rabbitmq for trongdat'

const log = console.log;

console.log = function () {
    log.apply(console, [new Date()].concat(arguments))
}

const runProducer = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:abc123456@localhost')
        const channel = await connection.createChannel()

        const notiExchange = 'notificationExchange' //notificationExchange direct
        const notiQueue = 'notificationQueueProcess'
        const notiExchangeDLX = 'notificationExchangeDLX' //notificationExchange direct
        const notiRoutingKeyDLX = 'notificationRoutingKeyDLX'

        // 1.create exchange
        await channel.assertExchange(notiExchange, 'direct', { durable: true })

        //2.create queue
        const queueResult = await channel.assertQueue(notiQueue, {
            exclusive: false, //cho phep cac ket noi truy cap vao cung mot hang doi
            deadLetterExchange: notiExchangeDLX,
            deadLetterRoutingKey: notiRoutingKeyDLX
        })


        //3.binding queue
        // const queue = queueResult.queue as string
        await channel.bindQueue(queueResult.queue, notiExchange)

        //4.send message
        const msg = 'a new product'

        console.log(`producer msg::`, msg)
        await channel.sendToQueue(queueResult.queue, Buffer.from(msg), {
            expiration: 10000
        })

        setTimeout(() => {

            connection.close()
            process.exit(0)
        }, 5000)


    } catch (error) {
        console.error(error)
    }
}

runProducer().catch(error => console.error(error))