"use strict";

import mongoose from "mongoose";
import { countConnect } from "@/helpers";

const connectString = "mongodb://localhost:27017/shop";

class Database {
    private static instance: Database|null =null;
    constructor() {
        this.connect();
    }

    connect(type="mongodb") {
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }
        mongoose
            .connect(connectString,{
                maxPoolSize:20 //trong mongoose,mysql... nhóm kết nối là tập hợp các kết nối của csdl có thể tái sử dụng
            })
            .then(() => {
                console.log(`Connected Mongodb Success`);
                countConnect();
            })
            .catch((err) => console.log(`Error Connect!`));
    }

    static getInstance():Database{
        if (!Database.instance) {
           Database.instance = new Database();
        }
        return Database.instance;
    }
 
}

const instanceMongodb = Database.getInstance();


export default instanceMongodb;
