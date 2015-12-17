var Loader = require('./loader')
var Day = require('./day')

module.exports = React.createClass({
	displayName: 'DaysList',

	componentDidMount : function() {
		//this.scrollToLastComment()
		var days = [];
	},
	componentDidUpdate : function(props, states, context) {
		// if (this.props.data && props.data && this.props.data.length != props.data.length) {
		// 	this.scrollToLastComment()
		// }
	},
	render: function() {
		var lastTimeAt = 0;

		var day;
		var days = [];
		var date;
		
		for(var d in this.props.data) {
			if (this.props.data.hasOwnProperty(d)) {
				date = new Date(d*1000);
		 		switch(date.getUTCDay()) {
		 			case 0:
		 				day = "MON";
		 				break;
		 			case 1:
		 				day = "TUE";
		 				break;
		 			case 2:
		 				day = "WED";
		 				break;
		 			case 3:
		 				day = "THU";
		 				break;
		 			case 4:
		 				day = "FRI";
		 				break;
		 			case 5:
		 				day = "SAT";
		 				break;
		 			case 6:
		 				day = "SUN";
		 				break;
		 			default: break;
		 		}
		 	} // end of if statement
			days.push((
				<Day key={'comment-' + day} day={day} date={date.getDate()}>
				</Day>
			));
		}
		
		return (
			<div className="commentList">
				{days} 
			</div>
		);
	}
});

// <span>{date}</span>
// <span>{comment[date]}</span>

