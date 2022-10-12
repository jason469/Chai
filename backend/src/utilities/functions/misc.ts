import {FavouriteChoices} from "../enums/model_enums";

export function getValueFromEnumWithKey(choices:any, type: string) {
    return Object.values(choices)[Object.keys(choices).indexOf(type)]
}