import Promise from 'bluebird';
import KeePassIO from 'keepass.io';
import IM, { Map, List, Iterable } from 'immutable';
import qweKdbxJson from '../qwe.kdbx.jsx';
import { isDev } from './Enviroment';
import * as base64 from 'base64-js';
import * as uuid from 'uuid';
//FIXME
var moment = require('moment');

export function KeePassReviver(key, value) {
    const isIndexed = Iterable.isIndexed(value);
    if (!isIndexed && (key === 'Group' || key === 'Entry')) {
        return List([value.toMap()]);
    }
    return isIndexed ? value.toList() : value.toMap();
}

export function KeePassLoadFile(filePath, password, keyFilePath) {
    var db = new KeePassIO.Database();
    if (password) {
        db.addCredential(new KeePassIO.Credentials.Password(password));
    }
    if (keyFilePath) {
        db.addCredential(new KeePassIO.Credentials.Keyfile(keyFilePath));
    }
    //TODO remove in production
    if (isDev) {
        return Promise.resolve({getRawApi: () => ({get: () => qweKdbxJson})})
    } else {
        return Promise.promisify(db.loadFile, db)(filePath)
            .then(() => db)
    }
}

export function KeePassSaveFile(db, filePath, json) {
    //TODO remove in production
    if (isDev) {
        return Promise.reject(new Error('Save disabled'));
    } else {
        db.getRawApi().set(json);
        return Promise.promisify(db.saveFile, db)(filePath);
    }
}

export function createGroup() {
    return IM.fromJS({
        'Notes': '',
        'IsExpanded': 'False',
        'Times': {
            'LastModificationTime': null,
            'CreationTime': null,
            'LastAccessTime': null,
            'ExpiryTime': moment('4000-01-01').format(),
            'Expires': 'False',
            'UsageCount': '0',
            'LocationChanged': null
        },
        'DefaultAutoTypeSequence': '',
        'Name': '(No title)',
        'EnableAutoType': 'null',
        'IconID': '37',
        'EnableSearching': 'null',
        'UUID': null,
        'LastTopVisibleEntry': 'AAAAAAAAAAAAAAAAAAAAAA=='
    }, KeePassReviver)
        .set('UUID', base64.fromByteArray(uuid.v4(null, new Array(16))))
        .mergeIn(['Times'], {
            LastModificationTime: moment().format(),
            CreationTime: moment().format(),
            LastAccessTime: moment().format(),
            LocationChanged: moment().format()
        });
}

export function createEntry() {
    return IM.fromJS({
        'ForegroundColor': '',
        'BackgroundColor': '',
        'OverrideURL': '',
        'Times': {
            'LastModificationTime': null,
            'CreationTime': null,
            'LastAccessTime': null,
            'ExpiryTime': moment('4000-01-01').format(),
            'Expires': 'False',
            'UsageCount': '0',
            'LocationChanged': null
        },
        'AutoType': {
            'Enabled': 'True',
            'DataTransferObfuscation': '0'
        },
        'String': [
            {
                'Key': 'Title',
                'Value': ''
            },
            {
                'Key': 'UserName',
                'Value': ''
            },
            {
                'Key': 'Password',
                'Value': ''
            },
            {
                'Key': 'URL',
                'Value': ''
            },
            {
                'Key': 'Notes',
                'Value': ''
            }
        ],
        'History': '',
        'IconID': '0',
        'Tags': '',
        'UUID': null
    }, KeePassReviver)
        .set('UUID', base64.fromByteArray(uuid.v4(null, new Array(16))))
        .mergeIn(['Times'], {
            LastModificationTime: moment().format(),
            CreationTime: moment().format(),
            LastAccessTime: moment().format(),
            LocationChanged: moment().format()
        });
}