//import React, { Component } from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AudioExample from './audio';
import VideoExample from './video';
import { subscribeToTimer } from './socket';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  timestamp: 'no timestamp yet'
		}
		subscribeToTimer((err, timestamp) => this.setState({
	    timestamp
	  }));
	}

	render() {
		return (
			<div>
				<h1>React Multimedia Capture Test</h1>
				<br />
				<p>
	      This is the timer value: {this.state.timestamp}
	      </p>
				<VideoExample />
			</div>
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById('entry')
);
