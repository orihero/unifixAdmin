import { createStore } from 'redux';
import reducers from './reducers';


export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
