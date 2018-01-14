import axios from 'axios';
const API_KEY = 'f0ae30dc0473e56e792d187ce2d81175';

const ROOT_URL=`http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;


export const GET_WEATHER = 'GET_WEATHER';

export function getWeather(city) {
	
	let url = `${ROOT_URL}&q=${city},au`;
	console.log(`request url is: ${url}`);
	let request = axios.get(url);

	return {
		type: GET_WEATHER,
		payload: request
	}
}