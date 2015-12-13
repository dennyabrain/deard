var Loader = require('./loader')

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
	},
	getInitialState: function() {
		return {data:[], loaded: false};
	}, 
	getDefaultProps : function() { 
		return {url:"/comments", pollInterval: 3000}; 
	},
	componentDidMount: function() {
		setTimeout(function() {
			this.getCommentsFromServer();
			this.enablePolling();
		}.bind(this), 2000);
	},
	componentWillUnmount: function() {
		this.disablePolling();
	},
	enablePolling: function() {
		this.checkInterval = setInterval(this.getCommentsFromServer, this.props.pollInterval);
	},
	disablePolling: function() {
		clearInterval(this.checkInterval);
	},
	render: function() {
		return (
			<div className="userData main">
				{ this.state.loaded ? 
					(<span>User data top</span>) :
					(<Loader />)
				}
				<div className="dataArea">
					<div className="container">
						User data bottom
					</div>
				</div>
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

    <Week time={} >
	<div>This week</div>
	<MoodGraph />
	<WordGraph />
	<DaysList />
</Week>
*/
// userdata.jsx
// <div>
//   <h2> {} </h2>
// 	<MoodGraph time={} />
// 	<WordGraph time={} />
// 	<DaysList time={} />
// </div>

// daysList.jsx
// <Day>
//  {}
// </Day>

// day.jsx
// <div>date</div>
// <div>
// 	moods
// </div>
