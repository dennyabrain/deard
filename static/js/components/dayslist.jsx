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
		var dateTemp;
		var todayDay = this.props.today.getDay();
		var todayDate = this.props.today.getDate();
		//console.log(this.props.data);
		for(var d in this.props.data) {
			var comment = this.props.data[d];
			if (this.props.data.hasOwnProperty(d)) {
				
		 		switch(todayDay) {
		 			case 0:
		 				day = "SUN";
		 				break;
		 			case 1:
		 				day = "MON";
		 				break;
		 			case 2:
		 				day = "TUE";
		 				break;
		 			case 3:
		 				day = "WED";
		 				break;
		 			case 4:
		 				day = "THU";
		 				break;
		 			case 5:
		 				day = "FRI";
		 				break;
		 			case 6:
		 				day = "SAT";
		 				break;
		 			default: break;
		 		}
		 		if (todayDay>0) todayDay--;
		 		else todayDay = 6;
		 	} // end of if statement
		 	//console.log(comment);
			days.push((
				<Day key={'comment-' + day} day={day} date={todayDate} data={this.props.data[d]}>
				</Day>
			));

			todayDate--;
		} // end of going through object

		//console.log(days);
		
		return (
			<div className="daysList">
				{days} 
			</div>
		);
	}
});

// <span>{date}</span>
// <span>{comment[date]}</span>

