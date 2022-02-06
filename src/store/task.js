import { createAction, createSlice } from '@reduxjs/toolkit';
import todosService from './../services/todos.service';
import { setError } from './errors';
const initialState = { entities: [], isLoading: true };

// const update = createAction('task/updated');
// const remove = createAction('task/delete');

// const TASK_UPDATED = 'task/updated';
// const TASK_DELETED = 'task/delete';

// export function taskCompleted(id) {
// 	return update({ id, completed: true });
// 	// return {
// 	// 	type: TASK_UPDATED,
// 	// 	payload: { id, completed: true },
// 	// };
// }

// export function titleChanged(id) {
// 	return update({ id, title: `New title for ${id}` });
// 	// return {
// 	// 	type: TASK_UPDATED,
// 	// 	payload: { id, title: `New title for ${id}` },
// 	// };
// }

// export function taskDelete(id) {
// 	return remove({ id });
// 	// return {
// 	// 	type: TASK_DELETED,
// 	// 	payload: { id },
// 	// };
// }

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		recived(state, action) {
			state.entities = action.payload;
			state.isLoading = false;
			// return action.payload;
		},
		update(state, action) {
			const elementIndex = state.entities.findIndex(el => el.id === action.payload.id);
			state.entities[elementIndex] = {
				...state.entities[elementIndex],
				...action.payload,
			};
		},
		create(state, action){
			state.entities.push(action.payload)
		},
		remove(state, action) {
			state.entities = state.entities.filter(el => el.id !== action.payload.id);
		},
		taskRequested(state) {
			state.isLoading = true;
		},
		taskRequestFailed(state, action) {
			// state.error = action.payload
			state.isLoading = false;
		},
	},
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, create, recived, taskRequested, taskRequestFailed } = actions;

// const taskRequested = createAction('task/requested')
// const taskRequestFailed = createAction('task/requesteFailed')
export const loadTasks = () => async dispatch => {
	dispatch(taskRequested());
	try {
		const data = await todosService.fetch();
		dispatch(recived(data));
	} catch (error) {
		dispatch(taskRequestFailed());
		dispatch(setError(error.message));
	}
};

export const createTask = () => async dispatch => {
	try {
		const data = await todosService.create({completed: false, title: 'task title', userId: 1});
		dispatch(create(data))
	} catch (error) {
		dispatch(setError(error.message));
	}
	
}

export const completeTask = id => dispatch => {
	dispatch(update({ id, completed: true }));
};

// export function taskCompleted(id) {
// 	return update({ id, completed: true });
// 	// return {
// 	// 	type: TASK_UPDATED,
// 	// 	payload: { id, completed: true },
// 	// };
// }

export function titleChanged(id) {
	return update({ id, title: `New title for ${id}` });
	// return {
	// 	type: TASK_UPDATED,
	// 	payload: { id, title: `New title for ${id}` },
	// };
}

export function taskDelete(id) {
	return remove({ id });
	// return {
	// 	type: TASK_DELETED,
	// 	payload: { id },
	// };
}



// const taskReducer = createReducer(initialState, builder => {
// 	builder
// 		.addCase(update, (state, action) => {
// 			const elementIndex = state.findIndex(el => el.id === action.payload.id);
// 			state[elementIndex] = {
// 				...state[elementIndex],
// 				...action.payload,
// 			};
// 		})
// 		.addCase(remove, (state, action) => {
// 			return state.filter(el => el.id !== action.payload.id);
// 		});
// });

// function taskReducer(state = [], action) {
// 	switch (action.type) {
// 		case update.type: {
// 			const newArray = [...state];
// 			const elementIndex = newArray.findIndex(el => el.id === action.payload.id);
// 			newArray[elementIndex] = {
// 				...newArray[elementIndex],
// 				...action.payload,
// 			};
// 			return newArray;
// 		}
// 		case remove.type: {
// 			const newArr = [...state].filter(el => el.id !== action.payload.id);
// 			return newArr;
// 		}
// 		default:
// 			return state;
// 	}
// }
export const getTasks = () => state => state.tasks.entities;
export const getTasksLoadingStatus = () => state => state.tasks.isLoading;


export default taskReducer;
