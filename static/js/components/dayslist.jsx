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
		// var todayDate = this.props.today.getDate();
		var todayDate = this.props.today;
		var dayListCount = 0;
		
		//console.log(this.props.data);
		for(var d in this.props.data) {

			var comment = this.props.data[d];
			// console.log("***DATA IN DAYLIST***")
			// console.log(this.props.data[d]);
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
		 	//console.log("dayListCount: " + dayListCount)
			days.push((
				<Day key={'comment-' + dayListCount} keyNum={'comment-' + dayListCount} day={day} 
					date={todayDate.getDate()} data={this.props.data[d]} />
			));

			todayDate -= (1000 * 60 * 60 * 24); 
			todayDate = new Date(todayDate);
			dayListCount++;
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

