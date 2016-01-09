var Loader = require('./loader')
// var io = require('socket.io-client');

module.exports = React.createClass({
	displayName: 'App',
	
	childContextTypes: {
		showDate : React.PropTypes.any,
		setShowDate : React.PropTypes.func,
		userKey: React.PropTypes.any,
		setUserKey: React.PropTypes.func
	},
	getChildContext: function() {
		return {
			showDate : this.state.showDate,
			setShowDate : this.setShowDate,
			userKey: this.state.userKey,
			setUserKey: this.setUserKey
		};
	},
	getInitialState: function() {
		return {
			status: 'disconnected',
			showDate : null,
			userKey: null,
			loaded : false
		}
	},
	setShowDate: function(date) {
		this.setState({
			showDate: date
		});
	},
	setUserKey: function(key) {
		this.setState({
			userKey: key
		});
	},

	// SOCKET STUFF
	componentWillMount: function() {
        // this.socket = io.connect('http://' + document.domain + ':' + location.port);
        // this.socket.on('connect', this.connect);
        // this.socket.on('disconnect', this.disconnect);
        // this.socket.on('insert',function(text){
        //     console.log('Got Event')
        // })
        //this.socket.on('welcome', this.welcome);
    },
    // connect: function() {
    // 	this.setState({ loaded: true, status: 'connected' });
    // 	console.log("connected: "+ this.socket.id);
    // },
    // disconnect: function() {
    // 	this.setState({ loaded: false, status: 'disconnected' });
    // },
	componentDidMount: function() {
		setTimeout(function() {
			this.setState({ loaded: true });
		}.bind(this), 1000);
	},
	render: function() {
		return this.state.loaded ? this.props.children : (
			<div className="app-loading">
				<Loader />
			</div>
		);
	}
});
