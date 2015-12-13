var Loader = require('./loader')

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
		}.bind(this), 3000);
	},
	render: function() {
		return this.state.loaded ? this.props.children : (
			<div className="app-loading">
				<Loader />
			</div>
		);
	}
});
