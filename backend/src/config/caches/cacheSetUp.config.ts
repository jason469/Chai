import {allCwimpiesCache} from "./allCaches";

const cwimpieService = require('../../services/cwimpie')

export const cacheSetUpConfig = async () => {
    console.log('setting up cache')
    const allCwimpies = await cwimpieService.getAllCwimpies()
    for (let cwimpie of allCwimpies) {
        console.log(typeof cwimpie.photo)
        await allCwimpiesCache.setValueByKey(cwimpie.name, cwimpie.name)
    }
    let allKeys = await allCwimpiesCache.getAllKeys()
    console.log('redis cache', allKeys)
}
