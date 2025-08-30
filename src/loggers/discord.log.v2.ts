// 'use strict'
// import { Client, Intents } from 'discord.js'
// class LoggerService {
//     client;channelId:string
//     constructor() {
//         this.client = new Client({
//             intents:[
//                 Intents.FLAGS.DIRECT_MESSAGES,
//                 Intents.FLAGS.GUILDS,
//                 Intents.FLAGS.GUILD_MESSAGES,
//                 Intents.FLAGS.MESSAGE_CONTENT
//             ]
//         })

//         // add channel id
//         this.channelId = process.env.DISCORD_CHANNELID as string
//         this.client.on('ready',()=>{
//             console.log(`logger is on ${this.client.user?.tag}`)
//         })
//         this.client.login(process.env.DISCORD_TOKEN)
//     }
//     sendToFormatCode(logData:any){
//         const {code,message='This is some additional information about the code.',title='Code Example'} = logData;
//     //    if(1===1){//product and dev

//     //    }
//         const codeMessage = {
//             content:message,
//             embeds:[
//                 {
//                     color:parseInt('00ff00',16),
//                     title,
//                     description:'```json\n '+JSON.stringify(code,null,2)+'\n```'

//                 }
//             ]
//         }
//         this.sendToMessage(codeMessage)
//     }
//     sendToMessage(message:any){
    
//         console.log('channelid',this.channelId)
//         const channel =this.client.channels.cache.get(this.channelId) as any;
//         console.log('channel',channel);
//         if(!channel){
//             console.error('Could not find this channel...');
//             return;
//         }
//         channel.send(message).catch((e:any)=>console.error(e))
//     }
// }



// const Logger = new LoggerService()
// export {Logger}
