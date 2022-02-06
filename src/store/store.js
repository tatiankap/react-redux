// import { combineReducers } from 'redux';
import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { logger } from './middleware/logger';
import taskReducer from './task';
import errorReducer from './errors';


// import { thunk } from './middleware/thunk';
// import { taskReducer } from './task/reducer';
// const initialState = [
// 	{ id: 1, title: 'task 1', completed: false },
// 	{ id: 2, title: 'task 2', completed: false },
// ];

// const middlewareEnhancer = applyMiddleware(logger, thunk);

const rootReducer = combineReducers({
	tasks: taskReducer,
	errors: errorReducer
	
});

function conigureStore() {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
		devTools: process.env.NODE_ENV !== 'production',
	});
}
// function conigureStore() {
// 	return createStore(taskReducer, compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
// }

export default conigureStore;
