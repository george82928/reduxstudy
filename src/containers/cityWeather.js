import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class CityWeather extends Component {

	render() {
		let weatherInfo = this.props.weather;
			if (weatherInfo && !_.isEmpty(weatherInfo) ) {
				return (
					<div>
						<h2>Current whether of the city of {weatherInfo.name}: </h2>
						<h4>Current Weather: {weatherInfo.weather[0].main} </h4>
						<h4>Current temperature: {weatherInfo.main.temp - 273.15} C</h4>
						<h4>Current Wind speed: {weatherInfo.wind.speed} </h4>
						<h4>Current Pressure: {weatherInfo.main.pressure} </h4>
					</div>
				);
			} else {
				return <div>Please enter city name</div>;
			}
	}
}

function mapStateToProps(state) {
	return {
		weather: state.weather
	}
}

export default connect(mapStateToProps)(CityWeather);