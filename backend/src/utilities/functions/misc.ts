import {Collection} from "mongoose";

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

export async function cascadeDelete(collection:Collection, deletedItem:any, deletedItemProperty:string) {
    let children = await collection.find({deletedItemProperty: deletedItem._id})
    console.log(children)
    await children.forEach(child => {
        if (Array.isArray(child[deletedItemProperty])) {
            const index = child[deletedItemProperty].indexOf(deletedItem._id, 0);
            child[deletedItemProperty].splice(index, 1);
        } else {
            child[deletedItemProperty] = null
        }
        child.save()
    })
}