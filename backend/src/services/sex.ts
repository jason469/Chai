import {CwimpieSexes} from "../utilities/enums/modelEnums";
import {getValueFromEnumWithKey} from "../utilities/functions/misc";

module.exports = class SexService {
    static async getSex(sex:string) {
        try {
            return getValueFromEnumWithKey(CwimpieSexes, sex)
        } catch (error) {
            console.log(`Could not fetch cwimpie sex enum with error ${error}`)
        }
    }
}