
export interface ConfigEnvironment{
    app: { port: number,},
    db: {
      host: string,
      port: number,
      name: string,
    },
}

export interface ConfigDb{
    dev: ConfigEnvironment,
    pro:ConfigEnvironment,
    [key: string]: ConfigEnvironment
}