import * as actionTypes from './actionTypes';

export function taskReducer(state = [], action) {
	switch (action.type) {
		case actionTypes.taskUpdated: {
            const newArray = [...state];
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id
            );
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                ...action.payload,
            };
            return newArray;
        }
		case actionTypes.taskDelete:{
			const newArr = [...state].filter(el => el.id !== action.payload.id);
			return newArr;}
		default:
			return state;
	}
}
