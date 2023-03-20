export {};
import {allColoursCache, allCwimpiesCache} from "./allCaches";

const cwimpieService = require('../../services/cwimpie')
const colourService = require('../../services/colour')

export const cacheSetUpConfig = async () => {
    console.log('setting up caches')

    const allCwimpies = await cwimpieService.getAllCwimpies()
    for (let cwimpie of allCwimpies) {
        await allCwimpiesCache.setValueByKey(cwimpie.name, cwimpie)
    }

    const allColours = await colourService.getAllColours()
    for (let colour of allColours) {
        await allColoursCache.setValueByKey(colour.name, colour)
    }
    return
}
