import React, { Component } from 'react';
import SearchBar from '../containers/searchBar.js';
import CityWeather from '../containers/cityWeather.js';

class App extends Component {

	render() {
		return (
			<div>
				<SearchBar />
				<CityWeather />
			</div>
			);
	}
}

export default App;

