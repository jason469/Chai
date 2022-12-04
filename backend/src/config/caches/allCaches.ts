import {RedisCache} from "./RedisCache";

export const allCwimpiesCache = new RedisCache('', '', 'redis', 6379, 0, "cwimpie")
export const allColoursCache = new RedisCache('', '', 'redis', 6379, 0, "colour")
