var Header = require('./header')

module.exports = React.createClass({
	displayName: 'DiaryLayout',
	colors : {
		'great': '#f9c4c0',
		'good': '#fcd6d0',
		'ok': '#ead7ca',
		'bad': '#d7dbcc',
		'worst': '#c3d8d1'
	},
	childContextTypes : {
		mood : React.PropTypes.any,
		setMood : React.PropTypes.func
	},
	getChildContext : function() {
		return {
		 	mood : this.state.mood,
			setMood : this.setMood
		};
	},
	componentWillMount : function() {
	   $('body').addClass('userData-mounted');
	}, 
	componentWillUnMount : function() {
	   $('body').removeClass('userData-mounted');
	},
	setMood: function(data) {
		this.setState({ mood: data });
		console.log("SET MOOD IN DIARYLAYOUT: "+ data);
	},
	getInitialState: function() {
		return { mood: "good"}
	},
	render: function() {
		var bgColor = this.colors[this.state.mood],
		bgStyle = { backgroundColor : bgColor };
		return(
			<div className="container layout-diary" style={bgStyle}>					
				{this.props.children}
			</div>
		)
	}
});