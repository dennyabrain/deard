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
		mood: React.PropTypes.any,
		setMood: React.PropTypes.func
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
		var date = this.state.date;
		var r = "?range=7&startdate=" +
				date.getFullYear() + "-" +
				(date.getMonth() + 1) + "-" +
				date.getDate();
		var refreshed = false;
		if (range == r) {
			refreshed = true;
		}
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
				if (refreshed){
					console.log("REFRESHED!!!");
					
					var lastMood; 
					var revComments = (data.comments[0]);
					//var arr = []; //array to store object keys
					
					console.log("REVCOMMENTS LENGTH")
					console.log(revComments);
					
					// for (var c in revComments) {
					// 	arr.push(c);
					// }
					for (var c = revComments.length-1; c >= 0; c--) {
						console.log("REVCOMMENTS")
						console.log(revComments[c]);
						if (revComments[c].type == "bot") {	
							if (revComments[c].commentFormType == "situation") {
								switch (revComments[c].mood_score) {
									case -2:
										lastMood = "worst";
										//console.log("LAST MOOD IS NOW WORST")
										break;
									case -1:
										lastMood = "bad";
										//console.log("LAST MOOD IS NOW BAD")
										break;
									case 0:
										lastMood = "ok";
										//console.log("LAST MOOD IS NOW OK")
										break;
									case 1:
										lastMood = "good";
										//console.log("LAST MOOD IS NOW GOOD")
										break;
									case 2:
										lastMood = "great";
										//console.log("LAST MOOD IS NOW GREAT")
										break;
									default:
										break;
								}
								//lastMood = revComments[c].mood_score;
								this.context.setMood(lastMood);
								//this.setState({mood: lastMood});
								console.log("USERDATA SETMOOD NEW CONTEXT MOOD")
								console.log(this.context.mood);
								break;
							}
						}
					}
				}

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
		console.log("THIS CONTEXT MOOD")
		console.log(this.context.mood);
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
