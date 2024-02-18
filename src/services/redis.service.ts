import { ReservationInventoryProps } from '@/types';
//

'use strict'


import * as redis from 'redis'
import {promisify} from 'util' //chuyen doi mot ham thanh promise async await
import {AcquireLockProps} from '@/types'
import * as inventoryReposity from '@/models/repositories/inventory.repository'
const redisClient = redis.createClient();

// const callback:any=async (err:any,result:any)=>{
//     if(err) {
//         console.error("Error connecting to Redis:: ",err);
//         return err
//     }
//     else{
//         console.log('Connected to Redis')
//         return await result
//     }
    
// }

// redisClient.ping(callback)
const pexpire = promisify(redisClient.pExpire).bind(redisClient)

const setnxAsync = promisify(redisClient.setNX).bind(redisClient)


//---------------Optimistic key-----------------------
//----------------------------------------------------

export const acquireLock = async ({productId,quantity,cartId}:AcquireLockProps) =>{
    const key  = `lock_v2024_${productId}`
    /*
     khi ai vao mua mot san pham thi se duoc cap 1 key (nguoi di truoc), sau khi 
     sau khi nguoi di truoc dat hang xong se tra lai key de nguoi khac vao
     */

    //neu chua lay duoc key thi cho phep nguoi do cho 10 lan
    const retryTimes=10;


    //thoi gian tam lock la 3s
    const expireTime=3000;

    for(let i=0;i<retryTimes;i++){
        //tao mot key de ai nam giu duoc vao thanh toan
        const result = await setnxAsync(key,expireTime);
        console.log('result ',result);

        // neu chua co ai giu key thi result = 1
        if(result===1){
            //thao tac voi inventory
            const isReservation:any = await inventoryReposity.reservationInventory({productId,quantity,cartId})
            if(isReservation.modifiedCount){
                await pexpire(key,expireTime)
                return key;
            }
            return null;
        }
        else{
            await new Promise((resolve)=>setTimeout(resolve,50))
        }
    }
    return null;
}

export const releaseLock = async (keyLock:any) =>{
    const delAsyncKey=promisify(redisClient.del).bind(redisClient)
    return delAsyncKey;
}
