import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VideoExample from './video';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AreaChart from './chart'

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

class Chart extends Component {
	render() {
		return (
			<AreaChart />
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById('entry')
);

ReactDOM.render(
	<Chart />,
	document.getElementById('well')
);
