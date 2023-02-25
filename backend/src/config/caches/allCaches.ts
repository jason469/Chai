import {RedisCache} from "./RedisCache";

const username:string = `${process.env.REDIS_USERNAME}`
const password:string = `${process.env.REDIS_PASSWORD}`
const host:string = `${process.env.REDIS_HOST}`
const port:number = Number(process.env.REDIS_PORT)
const dbNumber:number = Number(process.env.REDIS_DBNUMBER)

export const allCwimpiesCache = new RedisCache(username, password, host, port, dbNumber, "cwimpie")
export const allColoursCache = new RedisCache(username, password, host, port, dbNumber, "colour")
