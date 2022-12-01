const redis = require('redis')

export class RedisCache {
    username: string;
    password: string;
    host: string;
    port: number;
    dbNumber: number;
    private url: string;
    private client: any;
    private isClientConnected: boolean = false;

    constructor(username: string, password: string, host: string, port: number, dbNumber: number) {
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.dbNumber = dbNumber;

        this.url = `redis[s]://${this.username}:${this.password}@${this.host}:${this.port}${this.dbNumber}`
        this.connect()
            .then(() => {
                this.isClientConnected = true
            })
            .catch(() => this.isClientConnected = false)
    }

    private async connect(): Promise<void> {
        try {
            this.client = redis.createClient({
                url: `redis://redis:${this.port}`
            })
            this.client.on('error', (err:any) => console.log('Redis - Connection status: error ', { err }));
            this.client.on('connect', () => console.log('Redis - Connection status: connected'));
            this.client.on('end', () => console.log('Redis - Connection status: disconnected'));
            this.client.on('reconnecting', () => console.log('Redis - Connection status: reconnecting'));
            await this.client.connect(this.port, this.host)
        } catch {
            console.log(`There was an error connecting to the redis cache`)
        }
    }

    async getAllKeys() {
        if (this.client && this.isClientConnected) {
            try {
                await this.client.keys
            } catch {
                console.log(`There was an error getting all the keys`)
            }
        }
    }

    async getValueByKey(key: string) {
        try {
            await this.client.get(key, (error: any, value: any) => {
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
                        if (value != null) return resolve(JSON.parse(value))
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