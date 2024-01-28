import * as RedisPublish from '@/services/redisPublish.service'


export const purchaseProduct = async (productId:string,quantity:number) => {
    const order={
        productId,
        quantity
    }
    console.log('product test')
    RedisPublish.publish('purchase_events',JSON.stringify(order))
}