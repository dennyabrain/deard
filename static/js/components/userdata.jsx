var Loader = require('./loader')
var MoodGraph = require('./moodgraph')
var WordCount = require('./wordcount')
var DaysList = require('./dayslist')
var Header = require('./header')

module.exports = React.createClass({
	displayName: 'UserData',

	colors : {
		'great': '#fc5959',
		'good': '#ff9085',
		'ok': '#e5a89a',
		'bad': '#b8bfa1',
		'worst': '#acc1b9'
	},
	contextTypes : {
		userKey : React.PropTypes.any,
		setUserKey : React.PropTypes.func,
		history : React.PropTypes.object,
		mood: React.PropTypes.any	
	},
	childContextTypes : {
		week : React.PropTypes.any,
		setWeek : React.PropTypes.func
	},
	getChildContext : function() {
		return {
		 	week : this.state.weekNum,
			setWeek : this.setWeek
		};
	},
	setWeek: function(range, newDate){
		console.log("SET WEEK!")
		console.log(range)
		this.setState({loaded: false, date: newDate})
		this.getCommentsFromServer(range);
	},
	getCommentsFromServer: function(range) {
		$.ajax({
			url: this.props.url+range,
			dataType: 'json',
			cache: false,
			success: function(data){
				//var c = $.extend(true, {},data);
				//this.context.setUserKey(data.userKey)
				console.log("DATA COMMENTS IN MOOD")
				console.log(data.comments); // {0:[], 1:[], 2:[]}
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
		return {data:[], loaded: false, date: new Date(), 
				weekNum: 0};
	}, 
	getDefaultProps : function() { 
		return {url:"/userstats"}; 
		///userstats?range=7
	},
	componentDidMount: function() {
		var date = this.state.date;
		setTimeout(function() {
			var range = "?range=7&startdate=" +
						date.getFullYear() + "-" +
						(date.getMonth() + 1) + "-" +
						date.getDate(); //  /userstats?range=30&startdate=2015-12-01
			this.getCommentsFromServer(range);
			//this.enablePolling();
		}.bind(this), 100);
	},
	componentWillMount : function() {
	   $('body').addClass('userData-mounted');
	}, 
	componentWillUnMount : function() {
	   $('body').removeClass('userData-mounted');
	},
	render: function() {
		var ftColor = this.colors[this.context.mood];
		console.log("USERDATA FONT COLOR: "+ftColor);
		console.log("FROM USERDATA TO DAYLIST")
		console.log(this.state.data);
		return (
			<span>
			<Header headerType="mood" logoIcon={true} showDate={true} 
				showWeekNum={this.state.weekNum} today={this.state.date} /> 
			<div className="userData">
				{ this.state.loaded ? 
					(
						<div>
							<div className="userData-week"></div>
							<MoodGraph data={this.state.data} today={this.state.date}/>
							<WordCount fontColor={ftColor} data={this.state.data} today={this.state.date}/>
							<DaysList data={this.state.data} today={this.state.date}/>
						</div>
					) :
					(<Loader />)
				}
			</div>
			</span>
		)
	}
});
