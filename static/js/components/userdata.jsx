var Loader = require('./loader')
var MoodGraph = require('./moodgraph')
var WordCount = require('./wordcount')
var DaysList = require('./dayslist')

module.exports = React.createClass({
	displayName: 'UserData',

	contextTypes : {
		userKey : React.PropTypes.any,
		setUserKey : React.PropTypes.func,
		history : React.PropTypes.object	
	},
	getCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				//var c = $.extend(true, {},data);
				//this.context.setUserKey(data.userKey)
				this.setState({loadingResponse: false, loaded: true, data: data.comments});

			}.bind(this),
			error: function(ehx, status, err) {
				console.log(this.props.url, status, err.toString());
				this.context.history.pushState(null, "/", {});
			}.bind(this)
		});
		//console.log(this.state.data);
	},
	getInitialState: function() {
		return {data:[], loaded: false, todayDate: new Date()};
	}, 
	getDefaultProps : function() { 
		return {url:"/userstats", pollInterval: 3000}; 
	},
	componentDidMount: function() {
		setTimeout(function() {
			this.getCommentsFromServer();
			//this.enablePolling();
		}.bind(this), 2000);
	},
	componentWillMount : function() {
	   $('body').addClass('userData-mounted');
	}, 
	componentWillUnMount : function() {
	   $('body').removeClass('userData-mounted');
	},
	render: function() {
		return (
			<div className="userData">
				{ this.state.loaded ? 
					(
						<div>
							<div className="userData-week"><h2> This week </h2></div>
							<MoodGraph data={this.state.data} today={this.state.todayDate}/>
							<WordCount data={this.state.data} today={this.state.todayDate}/>
							<DaysList data={this.state.data} today={this.state.todayDate}/>
						</div>
					) :
					(<Loader />)
				}
			</div>
		)
	}
});
