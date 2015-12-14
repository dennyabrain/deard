var Loader = require('./loader')
var MoodGraph = require('./moodgraph')
//var DaysList = require('./dayslist')

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
				this.context.setUserKey(data.userKey)
				this.setState({loadingResponse: false, loaded: true, data:data.comments});

			}.bind(this),
			error: function(ehx, status, err) {
				console.log(this.props.url, status, err.toString());
				this.context.history.pushState(null, "/", {});
			}.bind(this)
		});
		console.log(this.state.data);
	},
	getInitialState: function() {
		return {data:[], loaded: false};
	}, 
	getDefaultProps : function() { 
		return {url:"/userstats", pollInterval: 3000}; 
	},
	componentDidMount: function() {
		setTimeout(function() {
			//this.getCommentsFromServer();
			//this.enablePolling();
		}.bind(this), 2000);
	},
	// componentWillUnmount: function() {
	// 	this.disablePolling();
	// },
	// enablePolling: function() {
	// 	this.checkInterval = setInterval(this.getCommentsFromServer, this.props.pollInterval);
	// },
	// disablePolling: function() {
	// 	clearInterval(this.checkInterval);
	// },
	render: function() {
		return (
			<div className="userData main">
				{ this.state.loaded ? 
					(
						<div>
							<h2> This week </h2>
							<MoodGraph />
						</div>
					) :
					(<Loader />)
				}
			</div>
		)
	}
});
/*
- week: this week
  - mood graph
  - words
  - days
    - each day
    <MoodGraph data={this.state.data} />
    
<DaysList data={this.state.data} />

BACKEND ---


import datetime


time.time()
startDate = time.today() - timedelta(days=7)


commentsEachDay = {}

for loop 7 times
	- mon
	- tue
	- wed
	....

	date = 1234543.345
	date = '2015-12-05'
	commentsEachDay[ date ] = [
		cooments, ...
	]



	where(creatd_at >= startDte)

[
	{comment1},
	...

]


FRONTEND ---
- pass data 
inside moodgraph

	foreach day


- GET  on componentdidMount

*/

// <div>
//   <h2> This week </h2>
// 	<MoodGraph data={this.state.data} />
// 	<DaysList data={this.state.data} />
// </div>

// moodgraph.jsx
// <div></div>

// daysList.jsx
// <Day time={}>
//  {}
// </Day>

// day.jsx
// <div>
// 	<div>date</div>
// 	<div>
// 		moods
// 	</div>
// </div>

