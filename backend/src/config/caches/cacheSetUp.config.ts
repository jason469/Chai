import {allCwimpiesCache} from "./allCaches";

const cwimpieService = require('../../services/cwimpie')

export const cacheSetUpConfig = async () => {
    console.log('setting up cache')
    const allCwimpies = await cwimpieService.getAllCwimpies()
    for (let cwimpie of allCwimpies) {
        await allCwimpiesCache.setValueByKey(cwimpie.name, cwimpie)
    }
    return
}
