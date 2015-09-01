import { Map, List, Iterable } from 'immutable';

export const defaultFields = List(['Title', 'UserName', 'Password', 'URL', 'Notes']);

export function getFields(entry) {
    return entry.get('String', List()).map(field => field.get('Key'));
}

export function getPathForUUID(root, uuid) {
    function getPath(acc = List(), item, key) {
        if (Map.isMap(item) && item.get('UUID') === uuid) {
            return acc.push(key);
        }
        if (Iterable.isIterable(item)) {
            var subPath = item.reduce(getPath, List());
            if (!subPath.isEmpty()) {
                return acc.push(key).concat(subPath);
            }
        }
        return acc;
    }

    const path = getPath(List(), root).shift();
    return path.isEmpty() ? null : path;
}

export function getPathForFieldValue(entry, fieldName) {
    const fieldIndex = entry.get('String', List()).findIndex(item => item.get('Key') === fieldName);
    if (fieldIndex === -1) {
        throw new Error(`Field ${fieldName} not found`);
    }
    return List([
        'String',
        fieldIndex,
        'Value'
    ]);
}

export function getEntryFieldValue(entry, fieldName, defaultValue) {
    return entry.getIn(getPathForFieldValue(entry, fieldName)) || defaultValue;
}

export function getEntryTitle(entry) {
    return getEntryFieldValue(entry, 'Title', '*no title*')
}