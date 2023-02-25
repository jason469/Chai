import {RedisCache} from "./RedisCache";
require('dotenv').config()

const username:string = `${process.env.REDIS_USERNAME}`
const password:string = `${process.env.REDIS_PASSWORD}`
const host:string = `${process.env.REDIS_HOST}`
const port:number = Number(process.env.REDIS_PORT)
const dbNumber:number = Number(process.env.REDIS_DBNUMBER)

export const allCwimpiesCache = new RedisCache('', username, password, host, port, dbNumber, "cwimpie")
export const allColoursCache = new RedisCache('', username, password, host, port, dbNumber, "colour")

// const url:string = 'redis://red-cfsq1harrk0c832s9p2g:6379'
// export const allCwimpiesCache = new RedisCache(url)
// export const allColoursCache = new RedisCache(url)
