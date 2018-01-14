import { GET_WEATHER } from '../actions/index';

export default function(state = {}, action) {
	switch(action.type) {
		case GET_WEATHER:
		console.log('result of the request:', action.payload.data);
			let changedState = Object.assign({}, state, action.payload.data);
			console.log('Changed States is:' + JSON.stringify(changedState));
			return changedState;
		default:
			return state;
	}
}