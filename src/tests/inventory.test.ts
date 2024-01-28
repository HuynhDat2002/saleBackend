import * as RedisPublish from '@/services/redisPublish.service'


    console.log('a')
 const sub=  RedisPublish.subscribe('purchase_events',(channel:any,message:any)=>{
        console.log(`Received message: `,message)
        updateInventory(message.productId,message.quantity)
    })  


export const updateInventory=(productId:string,quantity:number)=>{
    console.log(`update inventory ${productId} with quanity ${quantity}`)
}