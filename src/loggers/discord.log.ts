'use strict'
import {Client,GatewayIntentBits} from 'discord.js'

const client = new Client({
    intents:[
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})


client.on('ready',()=>{
    console.log(`logger is on ${client.user?.tag}`)
})

const token=process.env.DISCORD_TOKEN

client.login(token)

client.on('messageCreate',(msg:any)=>{
    if(msg.author.bot) return
    if(msg.content==='hello'){
        msg.reply("How can i help you?")
    }
})