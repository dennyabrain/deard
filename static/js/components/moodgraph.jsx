var Loader = require('./loader')

module.exports = React.createClass({
	displayName: 'MoodGraph',


	componentDidMount : function() {
		//console.log(this.props.data);
		var allData = this.props.data; //{0:[0:{}, 1:{}], 1:[], 2:[]...}
		//var unixTimeKeys = []; // keys
		var moodCountPerDay = 0;
		var moodSumPerDay = 0;
		var moodAvgPerDay = []; //[0.2, 1.5, 0.6, -5, 1.5, 0.6, -5]
		var days = []; //[2, 3, 4, 5, 6, 0]
		var startDay = this.props.today.getDay();
		//console.log("ALL DATA IN MOOD GRAPH")
		//console.log(allData);
		//var arrayCount = 0;
		for (var k in allData) {
			if (allData.hasOwnProperty(k)) {
				// store keys in array
         		//unixTimeKeys.push(k);
         		//var date = new Date(k*1000);
         		//console.log(k);
				switch(startDay) {
		 			case 0:
		 				days.unshift("SUN");
		 				break;
		 			case 1:
		 				days.unshift("MON");
		 				break;
		 			case 2:
		 				days.unshift("TUE");
		 				break;
		 			case 3:
		 				days.unshift("WED");
		 				break;
		 			case 4:
		 				days.unshift("THU");
		 				break;
		 			case 5:
		 				days.unshift("FRI");
		 				break;
		 			case 6:
		 				days.unshift("SAT");
		 				break;
		 			default: break;
		 		}
		 		if (startDay>0) startDay--;
		 		else startDay = 6;
		 		// console.log("***DATA IN MOODGRAPH***")
     //     		console.log(allData[k])
         		// for each array element, calculate afinn average
         		// -2, -1, 1, 2, 3
         		for (var i = 0; i < allData[k].length; i++) {

         			if (allData[k][i].mood_score != null && allData[k][i].mood_score > -50) {
         				moodCountPerDay++;
         				moodSumPerDay += allData[k][i].mood_score;
         			}
         		}
         		if (moodCountPerDay > 0) moodAvgPerDay.unshift(Math.round((moodSumPerDay/moodCountPerDay) * 100));
         		else moodAvgPerDay.unshift(null);
         		moodCountPerDay = 0;
         		moodSumPerDay = 0;
    		}
		} // end of for loop
		// console.log("***MOOD AVERAGE***")
		// console.log(moodAvgPerDay);
		var ctx = document.getElementById("myChart").getContext("2d");
		var gradient = ctx.createLinearGradient(0, 0, 0, 200);
		// gradient.addColorStop(0, 'rgba(137,239,229,1)');   
		// gradient.addColorStop(0.8, 'rgba(253,120,97,1)');
		// gradient.addColorStop(0.4, 'rgba(212,20,90,1)');
		
		gradient.addColorStop(1.0, 'rgba(137,239,229,1)'); //blue
		gradient.addColorStop(0.5, 'rgba(253,120,97,0.6)');
		gradient.addColorStop(0.0, 'rgba(212,20,90,1)'); //red
		// gradient.addColorStop(0.6, 'rgba(128,128,128,1)');
		
		var chartData = {
		    labels: days,
		    datasets: [
		        {
		            label: "This week",
		            fillColor: gradient,
		            strokeColor: gradient,
		            pointColor: "rgba(200,200,200,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: moodAvgPerDay
		        }
		    ]
		};
		var options = {
			scaleOverride : true,
	        scaleSteps : 10,
	        scaleStepWidth : 100,
	        scaleStartValue : -500, 
			// scaleShowGridLines : true,
			scaleShowHorizontalLines: true,
			scaleShowVerticalLines: false,
			datasetFill : false,
			scaleLineColor: 'transparent',
			scaleShowLabels: false,
			datasetStrokeWidth : 10,
			pointDotRadius : 8,
			scaleFontFamily: "'HKGrotesque-regular', 'sans-serif'",
			scaleFontColor: "rgba(47,48,44,0.7)"
		}

		var myLineChart = new Chart(ctx).Line(chartData, options);
	},
	componentDidUpdate : function(props, states, context) {
		// if (this.props.data && props.data && this.props.data.length != props.data.length) {
		// 	this.scrollToLastComment()
		// }
	},
	render: function() {
		// <img src="/static/img/mood-happy.svg" width="25"/>
		// <img src="/static/img/mood-sad.svg" width="25"/>
		return (
			<div className="moodgraph container-fluid">
				<div className="moodgraph-key col-md-1 col-xs-1">
					{ReactEmoji.emojify(":D")}
					{ReactEmoji.emojify(":'(")}
				</div>
				<div className="col-md-11 col-xs-11">
					<canvas id="myChart" height="300"></canvas>
				</div>
			</div>
		);
	}
});

