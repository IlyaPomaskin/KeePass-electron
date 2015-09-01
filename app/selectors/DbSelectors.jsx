import { Map, List, Iterable } from 'immutable';
import { getPathForUUID } from '../utils/Entry';

function groupsReduce(acc = List(), item = Map()) {
    if (item.isEmpty()) {
        return acc;
    }
    if (Iterable.isIndexed(item)) {
        return acc.concat(item.map(groupsReduce.bind(null, List())));
    } else {
        return acc.push(
            Map({
                uuid: item.get('UUID'),
                isExpanded: item.get('isExpanded') === "True",
                groups: item.get('Group', []).reduce(groupsReduce, List()),
                entriesCount: item.get('Entry', []).size,
                name: item.get('Name')
            })
        );
    }
}

export function groupsSelector(root = Map()) {
    return groupsReduce(List(), root).get(0);
}

export function entriesSelector(root, selectedGroup) {
    const path = getPathForUUID(root, selectedGroup);
    return path === null ? List() : root.getIn(path).get('Entry', List());
}
