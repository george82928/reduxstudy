import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getWeather } from '../actions/index';

class SearchBar extends Component {
	constructor (props) {
    	super(props);
    	this.state = { 
    	city: '' 
    	};
      this.handleCityChange = this.handleCityChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleCityChange(e) {
  		this.setState({
  			city: e.target.value
  		});
  	}
    handleSubmit(e) {
      console.log(this.state.city);
      this.props.getWeather(this.state.city);
    }

	render() {
		return (
			<div>
				<input type="text" className="" onChange={this.handleCityChange} />
				<button className="btn btn-default" onClick={this.handleSubmit}>Submit</button>

			</div>
			);
	}
}

export default connect(null, { getWeather })(SearchBar);