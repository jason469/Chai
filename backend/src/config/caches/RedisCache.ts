const Redis = require("ioredis");

export class RedisCache {
    username: string;
    password: string;
    host: string;
    port: number;
    dbNumber: number;
    private client: any;
    private isClientConnected: boolean = false;

    constructor(username: string, password: string, host: string, port: number, dbNumber: number) {
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.dbNumber = dbNumber;

        try {
            this.client =  new Redis(`redis://${this.host}:${this.port}/${this.dbNumber}`)
            this.isClientConnected = true
        } catch {
            console.error('Could not create redis cache')
        }
    }

    async getAllKeys() {
        if (this.client && this.isClientConnected) {
            try {
                return await this.client.keys("*")
            } catch {
                console.log(`There was an error getting all the keys`)
            }
        }
    }

    async getValueByKey(key: string) {
        try {
            return await this.client.get(key, (error: any, value: any) => {
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

    async setValueByKey(key: string, value: any) {
        if (this.client && this.isClientConnected) {
            try {
                await this.client.set(key, JSON.stringify(value))
            } catch {
                console.log(`There was an error setting the value for ${key}`)
            }
        }
    }

    async getOrSetCacheWithCallback(key: string, callback: Function) {
        // Returns cached data from either cache or function call
        if (this.client && this.isClientConnected) {
            try {
                return new Promise((resolve: any, reject: any) => {
                    this.client.get(key, async (error: any, value: any) => {
                        if (error) return reject(error)
                        if (value != null) {
                            console.log('cache hit')
                            return resolve(JSON.parse(value))
                        }
                        const freshData = await callback()
                        this.client.set(key, JSON.stringify(freshData))
                        resolve(freshData)
                    })
                })
            } catch {
                console.log(`There was an error setting the value for ${key}`)
            }
        }
    }

    async getOrSetCacheWithValue(key: string, newValue: any = null) {
        if (this.client && this.isClientConnected) {
            try {
                return new Promise((resolve: any, reject: any) => {
                    this.client.get(key, async (error: any, value: any) => {
                        if (error) return reject(error)
                        if (value != null) return resolve(JSON.parse(value))
                        this.client.set(key, JSON.stringify(newValue))
                        resolve(value)
                    })
                })
            } catch {
                console.log(`There was an error setting the value for ${key}`)
            }
        }
    }
}