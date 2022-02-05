import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { initiateStore } from './store/store';
import * as actions from './store/actions';
// import { createStore } from './store/createStore';
// import { taskReducer } from './store/taskReducer';
// import { taskUpdated } from './store/actionsTypes';

// const initialState = [
// 	{ id: 1, title: 'task 1', completed: false },
// 	{ id: 2, title: 'task 2', completed: false },
// ];

const store = initiateStore();
// const store = createStore(taskReducer, initialState);
const App = () => {
	const [state, setState] = useState(store.getState());
	useEffect(() => {
    store.subscribe(() => {
        setState(store.getState());
    });
}, []);

	const completeTask = taskId => {
		store.dispatch(actions.taskCompleted(taskId));
	};

	const changeTitle = taskId => {
		store.dispatch(actions.titleChanged(taskId));
	};

	const deleteTask = taskId => {
		store.dispatch(actions.taskDelete(taskId));
	};

	return (
		<>
			<h1>App</h1>
			<ul>
				{state.map(el => (
					<li key={el.id}>
						<p>{el.title}</p>
						<p>{`Completed: ${el.completed}`}</p>
						<button onClick={() => completeTask(el.id)}>complete</button>
						<button onClick={() => changeTitle(el.id)}>change title</button>
						<button onClick={() => deleteTask(el.id)}>delete</button>
						<hr />
					</li>
				))}
			</ul>
		</>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
