'use strict'
import { notifyModel } from "@/models/notification.model"

export const pushNotiToSystem = async ({type="SHOP-001",receivedId="1",
    senderId="1",
    options={}
})=>{
    let noti_content

    if(type==="SHOP-001"){
        noti_content="@@@ vua moi them mot san pham moi: @@@@"
    }
    if(type==="PROMOTION-001"){
        noti_content="@@@ vua moi them mot voucher moi: @@@@"
    }  if(type==="ORDER-001"){
        noti_content="@@@ vua moi order thanh cong: @@@@"
    }  if(type==="ORDER-002"){
        noti_content="@@@ order that bai: @@@@"
    }   

    const newNoti= await notifyModel.create({
        noti_type:type,
        noti_content:noti_content,
        noti_senderId:senderId,
        noti_receivedId:receivedId,
        noti_options:options
    })
     return newNoti
}

export const listNotiByUser = async ({userId=1,type="All",isRead=0})=>{
    const match:any={noti_receivedId:userId}
    if(type!=="All"){
        match['noti_type'] = type
    }

    return await notifyModel.aggregate([
        {
            $match:match
        },
        {
            $project:{
                noti_type:1,
                noti_senderId:1,
                noti_received:1,
                noti_content:{
                    $concat:[
                        {
                            $substr:['$noti_options.shop_name ',0,-1]
                        },
                        "vua moi them mot san pham moi: ",
                        {
                            $substr:['$noti_options.product_name',0,-1]

                        }
                    ]
                },
                createAt:1,
                noti_options:1
            }
        }
    ])
}
