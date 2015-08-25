import Promise from 'bluebird';
import KeePassIO from 'keepass.io';
import { Map, List, Iterable } from 'immutable';
import qweKdbxJson from '../qwe.kdbx.jsx';
import { isDev } from '../utils/Enviroment';

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
		return Promise.resolve({getRawApi: () => ({ get: () => qweKdbxJson})})
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
