import {Collection, Model} from "mongoose";
const TaskService = require('../../services/task')
const Stamp = require('../../models/Stamp')

export function getValueFromEnumWithKey(choices:any, type: string) {
    return Object.values(choices)[Object.keys(choices).indexOf(type)]
}

export function getPropertyFromObject(object:Object, naiveProperty:string) {
    type ObjectKey = keyof typeof object;
    const property = naiveProperty as ObjectKey;
    if (object[property] === undefined) {
        return undefined
    } else {
        return object[property]
    }
}

export async function cascadeDelete(collection:Model<Collection>, deletedItem:any, deletedItemProperty:string) {
    let children = await collection.find({[`${deletedItemProperty}`]: deletedItem._id}).lean()
    children.forEach((child:any) => {
        if (Array.isArray(child[deletedItemProperty])) {
            const index = child[deletedItemProperty].indexOf(deletedItem._id, 0);
            child[deletedItemProperty].splice(index, 1);
        } else {
            child[deletedItemProperty] = null;
        }
        child.save();
    })
}
