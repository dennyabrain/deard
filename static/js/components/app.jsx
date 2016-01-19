var Loader = require('./loader')
//var TimeoutTransitionGroup = require('./timeout-transition-group')
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
	componentDidMount: function() {
		setTimeout(function() {
			this.setState({ loaded: true });
		}.bind(this), 1000);
	},
	render: function() {
		return this.state.loaded ? this.props.children
		 : (
			<div className="app-loading">
				<Loader />
			</div>
		);
	}
});

// <TimeoutTransitionGroup enterTimeout={100} leaveTimeout={100} transitionName="screen">
// 	{this.props.children}
// </TimeoutTransitionGroup>
