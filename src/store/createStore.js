export function createStore(initialState) {
	let state = initialState;
  let listeners = [];

	function getState() {
		return state;
	}

	function dispatch(reducer, action) {
		state = reducer(state, action);
    for(let i = 0; i < listeners.length; i++){
      const listener = listeners[i];
      listener();
    }
	}

  function subscribe(lisener){
    listeners.push(lisener)
  }
	return {
		getState,
		dispatch,
    subscribe
	};
}