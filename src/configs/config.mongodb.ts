"use strict";

import { ConfigDb,ConfigEnvironment } from "@/types";
import 'dotenv/config'

//level 0
const dev0:ConfigEnvironment= {
  app: { port: 3000 },
  db: {
    host: "localhost",
    port: 27017,
    name: "shopdev",
  },
};

//level 1
const dev:ConfigEnvironment= {
  app: { port: parseInt(process.env.DEV_APP_PORT || '3000')},
  db: {
    host: process.env.DEV_HOST|| "localhost",
    port: parseInt(process.env.DEV_PORT || '27017'),
    name: process.env.DEV_NAME|| "shopdev",
  },
};

const pro:ConfigEnvironment = {
    app: { port: parseInt(process.env.PRO_APP_PORT || '3000')},
    db: {
      host: process.env.PRO_HOST|| "localhost",
      port: parseInt(process.env.PRO_PORT || '27017'),
      name: process.env.PRO_NAME|| "shoppro",
    },
}

const config:ConfigDb={dev,pro}

const env:string=process.env.NODE_ENV || 'dev'
export default config[env];
