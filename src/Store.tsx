import {
    createStore, combineReducers, compose, applyMiddleware
} from 'redux';
import createPromiseMiddleware from 'redux-promise-middleware';
import filterReducer from './routes/Todo/filter/reducer';
import todoReducer from './routes/Todo/todos/reducer';
import chartReducer from './routes/Chart/reducer';
import {createLogger} from 'redux-logger'

const logger = createLogger({
    // ...options
});

const reducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer,
    chart: chartReducer,
});

// @ts-ignore
const middlewares = [createPromiseMiddleware];

// @ts-ignore
middlewares.push(logger)

const win = window;
const storeEnhancers = compose(
// @ts-ignore
    applyMiddleware(...middlewares),
// @ts-ignore
    (win && win.__REDUX_DEVTOOLS_EXTENSION__) ? win.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);

const initialState = {

};
export default createStore(reducer, initialState, storeEnhancers);
