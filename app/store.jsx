import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './reducers';
import * as _ from 'lodash';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
    transformer: _.compose(JSON.parse, JSON.stringify)
});

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducer, initialState);
}
