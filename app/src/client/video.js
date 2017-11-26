import React, { Component } from 'react';
import MediaCapturer from 'react-multimedia-capture';
import imageBus from './socket';
import RaisedButton from 'material-ui/RaisedButton';

class VideoExample extends React.Component {
	constructor() {
		super();
		this.state = {
			granted: false,
			rejectedReason: '',
			recording: false,
			paused: false,
      emotionData: {}
		};

		this.handleGranted = this.handleGranted.bind(this);
		this.handleDenied = this.handleDenied.bind(this);
		this.handleStart = this.handleStart.bind(this);
		this.handleStop = this.handleStop.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.handleResume = this.handleResume.bind(this);
		this.setStreamToVideo = this.setStreamToVideo.bind(this);
		this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
		this.downloadVideo = this.downloadVideo.bind(this);
	}
	handleGranted() {
		this.setState({ granted: true });
		console.log('Permission Granted!');
	}
	handleDenied(err) {
		this.setState({ rejectedReason: err.name });
		console.log('Permission Denied!', err);
	}
	handleStart(stream) {
		this.setState({
			recording: true
		});

		this.setStreamToVideo(stream);
		console.log('Recording Started.');
	}
	handleStop(blob) {
		this.setState({
			recording: false
		});

		this.releaseStreamFromVideo();

		console.log('Recording Stopped.');
		this.downloadVideo(blob);
	}
	handlePause() {
		this.releaseStreamFromVideo();

		this.setState({
			paused: true
		});
	}
	handleResume(stream) {
		this.setStreamToVideo(stream);

		this.setState({
			paused: false
		});
	}
	handleError(err) {
		console.log(err);
	}
	setStreamToVideo(stream) {
		let video = this.refs.app.querySelector('video');

		if(window.URL) {
			video.src = window.URL.createObjectURL(stream);
			console.log(stream)
			const track = stream.getVideoTracks()[0]
			this.captureFrame(track)
			setInterval(function(){ this.captureFrame(track) }.bind(this), 1000);
		}
		else {
			video.src = stream;
		}
	}
  postImageUpdateEmotionData(img64) {
    let data = {
      uri: img64
    }
    imageBus(data, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      this.setState({emotionData: results})
    })
  }
  // function dataURItoBlob(dataURI) {
  //   // convert base64 to raw binary data held in a string
  //   // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  //   var byteString = atob(dataURI.split(',')[1]);
  //
  //   // separate out the mime component
  //   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  //
  //   // write the bytes of the string to an ArrayBuffer
  //   var ab = new ArrayBuffer(byteString.length);
  //
  //   // create a view into the buffer
  //   var ia = new Uint8Array(ab);
  //
  //   // set the bytes of the buffer to the correct values
  //   for (var i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //   }
  //
  //   // write the ArrayBuffer to a blob, and you're done
  //   var blob = new Blob([ab], {type: mimeString});
  //   return blob;
  //
  // }
	captureFrame(track) {
		let imageCapture = new ImageCapture(track)
		console.log(imageCapture)
		imageCapture.grabFrame()
		.then(imageBitmap => {
			console.log(imageBitmap)
			const canvas = document.getElementById('myCanvas');
			this.drawCanvas(canvas, imageBitmap);
      // this.postImageUpdateEmotionData(canvas.toDataURL());
      canvas.toBlob((blob)=>{
        this.postImageUpdateEmotionData(blob)
      }, 'image/jpeg');
		})
		.catch(error => console.error(error));
	}
	drawCanvas(canvas, img) {
	  canvas.width = getComputedStyle(canvas).width.split('px')[0];
	  canvas.height = getComputedStyle(canvas).height.split('px')[0];
	  let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
	  let x = (canvas.width - img.width * ratio) / 2;
	  let y = (canvas.height - img.height * ratio) / 2;
	  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
	      x, y, img.width * ratio, img.height * ratio);
	}
	releaseStreamFromVideo() {
		this.refs.app.querySelector('video').src = '';
	}
	downloadVideo(blob) {
		let url = URL.createObjectURL(blob);
		let a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		a.target = '_blank';
		document.body.appendChild(a);

		a.click();
	}
	render() {
		const granted = this.state.granted;
		const rejectedReason = this.state.rejectedReason;
		const recording = this.state.recording;
		const paused = this.state.paused;

		return (
			<div ref="app">
				<h3>Video Recorder</h3>
				<MediaCapturer
					constraints={{ audio: true, video: true }}
					timeSlice={10}
					onGranted={this.handleGranted}
					onDenied={this.handleDenied}
					onStart={this.handleStart}
					onStop={this.handleStop}
					onPause={this.handlePause}
					onResume={this.handleResume}
					onError={this.handleError}
					render={({ start, stop, pause, resume }) =>
					<div>
						<p>Granted: {granted.toString()}</p>
						<p>Rejected Reason: {rejectedReason}</p>
						<p>Recording: {recording.toString()}</p>
						<p>Paused: {paused.toString()}</p>
						<RaisedButton onClick={start} label="Start" />
						<RaisedButton onClick={stop} label="Stop" />
						<RaisedButton onClick={pause} label="Pause" />
						<RaisedButton onClick={resume} label="Resume" />

						<p>Streaming test</p>
						<video autoPlay></video>
						<canvas id="myCanvas"></canvas>
					</div>
				} />
			</div>
		);
	}
}

export default VideoExample;
