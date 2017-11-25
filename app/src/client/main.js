import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AudioExample from './audio';
import VideoExample from './video';
import { subscribeToTimer } from './socket';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
	render() {
		const style = {
		  margin: 12,
		};
		return (
			<MuiThemeProvider>
					<VideoExample />
			</MuiThemeProvider>
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById('entry')
);
