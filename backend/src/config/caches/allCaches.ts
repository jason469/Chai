import {RedisCache} from "./RedisCache";

export const allCwimpiesCache = new RedisCache('', '', 'redis', 6379, 0)
