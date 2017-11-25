import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AudioExample from './audio';
import VideoExample from './video';
import { subscribeToTimer } from './socket';

class App extends Component {
	render() {
		return (
			<div>
				<VideoExample />
			</div>
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById('entry')
);
