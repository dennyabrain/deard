var Loader = require('./loader')

module.exports = React.createClass({
	displayName: 'MoodGraph',


	componentDidMount : function() {
		// var allData = this.props.data;
		// var unixTimeKeys = []; // keys
		// var afinnCount = 0;
		// var afinnSum = 0;
		// var afinnAverage = []; //[0.2, 1.5, 0.6, -5, 1.5, 0.6, -5]
		// var days = []; //[2, 3, 4, 5, 6, 0]
		// //var arrayCount = 0;
		// for (var k in target) {
		// 	if (target.hasOwnProperty(k)) {
		// 		// store keys in array
  //        		unixTimeKeys.push(k);
  //        		var date = new Date(k*1000);
  //        		switch(date.getUTCDay()) {
  //        			case 0:
  //        				days.push("MON");
  //        				break;
  //        			case 1:
  //        				days.push("TUE");
  //        				break;
  //        			case 2:
  //        				days.push("WED");
  //        				break;
  //        			case 3:
  //        				days.push("THU");
  //        				break;
  //        			case 4:
  //        				days.push("FRI");
  //        				break;
  //        			case 5:
  //        				days.push("SAT");
  //        				break;
  //        			case 6:
  //        				days.push("SUN");
  //        				break;
  //        			default: break;
  //        		}
				
  //        		// for each array element, calculate afinn average
  //        		for (var i = 0; i < allData[k].length; i++) {
  //        			if (allData[k].afinn_score) {
  //        				afinnCount++;
  //        				afinnSum += allData[k].afinn_score;
  //        			}
  //        		}
  //        		if (afinnCount > 0) afinnAverage.push(afinnSum/afinnCount);
  //        		else afinnAverage.push(0);
  //   		}
		// }

		// var chartData = {
		//     labels: days,
		//     datasets: [
		//         {
		//             label: "My First dataset",
		//             fillColor: "rgba(220,220,220,0.2)",
		//             strokeColor: "rgba(220,220,220,1)",
		//             pointColor: "rgba(220,220,220,1)",
		//             pointStrokeColor: "#fff",
		//             pointHighlightFill: "#fff",
		//             pointHighlightStroke: "rgba(220,220,220,1)",
		//             data: afinnAverage
		//         }
		//     ]
		// };
		// var ctx = document.getElementById("myChart").getContext("2d");
		// var myLineChart = new Chart(ctx).Line(chartData, options);
	},
	componentDidUpdate : function(props, states, context) {
		// if (this.props.data && props.data && this.props.data.length != props.data.length) {
		// 	this.scrollToLastComment()
		// }
	},
	render: function() {
		//var lastTimeAt = 0;
		
		// var dataPoints = this.props.data.map(function(comment,i){
		// 	var point = {
		// 		key: i,
		// 		sentiment: comment.afinn_score,
		// 		time: comment.created_at
		// 	}
		// 	return (
		// 		<Comment key={'comment-' + i} timeAt={timeAt} commentId={comment.id} commentAfinnScore={comment.afinn_score} commentType={comment.type}>
		// 			{comment.text}
		// 		</Comment>
		// 	);
		// });
	// <canvas id="myChart" width="400" height="400"></canvas>
		return (
			<div className="moodgraph">
				Mood graph
			</div>
		);
	}
});

