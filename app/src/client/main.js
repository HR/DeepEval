//import React, { Component } from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AudioExample from './audio';
import VideoExample from './video';

class App extends Component {
	render() {
		return (
			<div>
				<h1>React Multimedia Capture Test</h1>
				<br />

				<VideoExample />
			</div>
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById('entry')
);
