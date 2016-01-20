var Header = require('./header')

module.exports = React.createClass({
	displayName: 'DiaryLayout',
	BGColors : {
		'great': '#f9c4c0',
		'good': '#fcd6d0',
		'ok': '#ead7ca',
		'bad': '#d7dbcc',
		'worst': '#c3d8d1'
	},
	colors : {
		'great': '#fc5959',
		'good': '#ff9085',
		'ok': '#e5a89a',
		'bad': '#b8bfa1',
		'worst': '#acc1b9'
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
		var bgColor = this.BGColors[this.state.mood];
		var ftColor = this.colors[this.state.mood];
		var diaryStyle = { backgroundColor : bgColor, color: ftColor };
		return(
			<div className="container layout-diary" style={diaryStyle}>					
				{this.props.children}
			</div>
		)
	}
});