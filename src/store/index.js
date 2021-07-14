import thunk from 'redux-thunk';
import { persistReducer,persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import { applyMiddleware, compose, createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers from '../reducer';

const enhancer = compose(
    applyMiddleware(
        thunk,
        createLogger({
            predicate:() => __DEV__ ,
        })
    ),
);

const persistConfig = {
    key : 'root',
    timeout : 0 ,
    storage:AsyncStorage,
    whitelist : ['']
};

const persistedReducer = persistReducer(persistConfig , reducers);
export const store = createStore(persistedReducer , {} , enhancer);
export const persistor = persistStore(store);