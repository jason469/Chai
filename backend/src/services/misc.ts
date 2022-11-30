
module.exports = class MiscService {
    static async convertDateToUTC(datestring:string) {
        try {
            let date = new Date(datestring)
            let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                date.getUTCDate(), date.getUTCHours(),
                date.getUTCMinutes(), date.getUTCSeconds())
            return new Date(now_utc)
        } catch (error) {
            console.log(`Could not fetch cwimpie sex enum with error ${error}`)
        }
    }
}