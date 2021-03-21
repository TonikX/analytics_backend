import {createStore, compose, applyMiddleware} from "redux";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import {createLogicMiddleware} from 'redux-logic';

import reducers from './reducers';
import logics from './logics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    const getStore = () => store;

    const deps = {
        getStore: getStore,
    };

    const permanentLogicMiddleware = createLogicMiddleware(logics, deps);

    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(
            thunk,
            reduxImmutableStateInvariant(),
            permanentLogicMiddleware
        ))
    );

    return store;
}

export const store = configureStore();