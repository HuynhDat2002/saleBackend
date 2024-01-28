'use strict'

import * as Redis from 'redis'

// class RedisPublishService {
//       subscriber;publisher
//     constructor() {
//         this.subscriber = Redis.createClient()
//         this.publisher = Redis.createClient()
//     }

//     publish(channel:any,message:string){
//         return new Promise((resolve,reject)=>{
//             this.publisher.publish(channel,message,(err:any,reply:any)=>{
//                 if(err){
//                     reject(err)
//                 }
//                 else{
//                     resolve(reply)
//                 }
//             })
//         })   
//     }
// }
const subscriber = Redis.createClient()
const publisher = Redis.createClient()

export const publish = async (channel:any,message:any) =>{
    await publisher.connect();
    // const codeMessage = {
    //     content:message,
    //     embeds:[
    //         {
    //             color:parseInt('00ff00',16),
    //             title,
    //             description:'```json\n '+JSON.stringify(code,null,2)+'\n```'

    //         }
    //     ]
    // }
    await publisher.publish(channel,message)
}

export const subscribe = async (channel:any, callback:any) => {
    await subscriber.connect();
    await subscriber.subscribe(channel,(message)=>{
        console.log('message',message);
    });
    subscriber.on('message',(subscriberChannel:any,message:any)=>{
        if(channel===subscriberChannel){
            callback(channel,message)
        }
    })
}