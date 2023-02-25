const Redis = require("ioredis");

export class RedisCache {
    username: string;
    password: string;
    host: string;
    port: number;
    dbNumber: number;
    url: string;
    private client: any;
    private isClientConnected: boolean = false;
    private prefix: string = "";  // Used to prepend each key in the cache

    constructor(url: string = '', username: string = '', password: string = '', host: string = '', port: number = 6379, dbNumber: number = 0, prefix: string = '') {
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.dbNumber = dbNumber;
        this.prefix = prefix
        this.url = url

        try {
            if (this.url != '') {
                this.client = new Redis(this.url)
            } else {
                this.client = new Redis(`redis://${this.host}:${this.port}/${this.dbNumber}`)
            }
            this.isClientConnected = true
        } catch {
            console.error('Could not create redis cache')
        }
    }

    async getAllKeys() {
        if (this.client && this.isClientConnected) {
            try {
                return await this.client.keys(`*${this.prefix}__*`)
            } catch {
                console.log(`There was an error getting all the keys`)
            }
        }
    }

    async getValueByKey(key: string, hasPrefix: boolean = false) {
        try {
            let finalKey = hasPrefix ? key : `${this.prefix}__${key}`
            return await this.client.get(finalKey, (error: any, value: any) => {
                if (value != null) {
                    console.log('cache hit')
                    return JSON.parse(value)
                } else {
                    console.log('cache miss')
                    return null
                }
            })
        } catch {
            console.log(`There was an error getting the keys`)
            return null
        }
    }

    async setValueByKey(key: string, value: any, hasPrefix: boolean = false) {
        if (this.client && this.isClientConnected) {
            let finalKey = hasPrefix ? key : `${this.prefix}__${key}`
            console.log(finalKey)
            console.log(JSON.stringify(value))
            try {
                await this.client.set(finalKey, JSON.stringify(value))
            } catch {
                console.log(`There was an error setting the value for ${key}`)
            }
        }
    }

    async deleteValueByKey(key: string, hasPrefix: boolean = false) {
        if (this.client && this.isClientConnected) {
            let finalKey = hasPrefix ? key : `${this.prefix}__${key}`
            try {
                await this.client.del(finalKey)
            } catch {
                console.log(`There was an error setting the value for ${key}`)
            }
        }
    }


    // async getOrSetCacheWithCallback(key: string, callback: Function) {
    //     // Returns cached data from either cache or function call
    //     if (this.client && this.isClientConnected) {
    //         try {
    //             return new Promise((resolve: any, reject: any) => {
    //                 this.client.get(`${this.prefix}__${key}`, async (error: any, value: any) => {
    //                     if (error) return reject(error)
    //                     if (value != null) {
    //                         console.log('cache hit')
    //                         return resolve(JSON.parse(value))
    //                     }
    //                     const freshData = await callback()
    //                     this.client.set(`${this.prefix}__${key}`, JSON.stringify(freshData))
    //                     resolve(freshData)
    //                 })
    //             })
    //         } catch {
    //             console.log(`There was an error setting the value for ${key}`)
    //         }
    //     }
    // }
}