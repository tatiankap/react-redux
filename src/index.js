import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';
import conigureStore from './store/store';
import { titleChanged, taskDelete, completeTask, createTask, getTasks, loadTasks, getTasksLoadingStatus} from './store/task';
// import { createStore } from './store/createStore';
// import { taskReducer } from './store/taskReducer';
// import { taskUpdated } from './store/actionsTypes';

// const initialState = [
// 	{ id: 1, title: 'task 1', completed: false },
// 	{ id: 2, title: 'task 2', completed: false },
// ];

const store = conigureStore();
// const store = createStore(taskReducer, initialState);
const App = () => {
	const state = useSelector(getTasks());
	const isLoading = useSelector(getTasksLoadingStatus());
	const error = useSelector(getError());
	const dispatch = useDispatch();

	// const [state, setState] = useState(store.getState());
	useEffect(() => {
		dispatch(loadTasks())
		// store.subscribe(() => {
		// 	setState(store.getState());
		// });
	}, []);

	// const completeTask = taskId => {
	// 	store.dispatch(taskCompleted(taskId));
	// };

	const changeTitle = taskId => {
		dispatch(titleChanged(taskId));
	};

	const deleteTask = taskId => {
		dispatch(taskDelete(taskId));
	};
	if(isLoading){
		return <h1>loading....</h1>
	}
	if(error){
		return <p>{error}</p>
	}
	return (
		<>
			<h1>App</h1>
			<ul>
				{state.map(el => (
					<li key={el.id}>
						<p>{el.title}</p>
						<p>{`Completed: ${el.completed}`}</p>
						<button onClick={() => dispatch(completeTask(el.id))}>complete</button>
						<button onClick={() => changeTitle(el.id)}>change title</button>
						<button onClick={() => deleteTask(el.id)}>delete</button>
						<hr />
					</li>
				))}
			</ul>
			<button onClick={() => dispatch(createTask())}>add new task</button>
		</>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store} >
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
