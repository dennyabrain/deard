
module.exports = React.createClass({
	displayName: 'WordCount',


	componentDidMount : function() {
		// console.log(this.props.data);
		var allData = this.props.data;
		//var unixTimeKeys = []; // keys
		var afinnCount = 0;
		var afinnSum = 0;
		var afinnAverage = []; //[0.2, 1.5, 0.6, -5, 1.5, 0.6, -5]
		var days = []; //[2, 3, 4, 5, 6, 0]
		var todayDay = this.props.today.getDay();
		//var arrayCount = 0;
		for (var k in allData) {
			if (allData.hasOwnProperty(k)) {
				// store keys in array
         		//unixTimeKeys.push(k);
         		//var date = new Date(k*1000);
         		//console.log(k);
				switch(todayDay) {
		 			case 0:
		 				days.push("SUN");
		 				break;
		 			case 1:
		 				days.push("MON");
		 				break;
		 			case 2:
		 				days.push("TUE");
		 				break;
		 			case 3:
		 				days.push("WED");
		 				break;
		 			case 4:
		 				days.push("THU");
		 				break;
		 			case 5:
		 				days.push("FRI");
		 				break;
		 			case 6:
		 				days.push("SAT");
		 				break;
		 			default: break;
		 		}
		 		if (todayDay>0) todayDay--;
		 		else todayDay = 6;

         		// for each array element, calculate afinn average
         		for (var i = 0; i < allData[k].length; i++) {
         			if (allData[k][i].afinn_score) {
         				afinnCount++;
         				afinnSum += allData[k][i].afinn_score;
         			}
         		}
         		if (afinnCount > 0) afinnAverage.push(Math.round((afinnSum/afinnCount) * 100));
         		else afinnAverage.push(0);
         		afinnCount = 0;
         		afinnSum = 0;
    		}
		} // end of for loop
		console.log(afinnAverage);

		var chartData = {
		    labels: days,
		    datasets: [
		        {
		            label: "This week",
		            fillColor: "rgba(248,124,105,0.75)",
		            strokeColor: "rgba(220,220,220,1)",
		            highlightFill: "rgba(248,124,105,1)",
		            data: afinnAverage
		        }
		    ]
		};
		var options = {
			scaleOverride : true,
	        scaleSteps : 10,
	        scaleStepWidth : 100,
	        scaleStartValue : -500, 
			scaleShowGridLines : false,
			// datasetFill : false,
			scaleLineColor: 'transparent',
			scaleShowLabels: false,
			barShowStroke : false
		}

		var ctx = document.getElementById("myWordChart").getContext("2d");
		var myBarChart = new Chart(ctx).Bar(chartData, options);
	},
	componentDidUpdate : function(props, states, context) {
		// if (this.props.data && props.data && this.props.data.length != props.data.length) {
		// 	this.scrollToLastComment()
		// }
	},
	render: function() {
		return (
			<div className="wordcount">
					<canvas id="myWordChart"></canvas>
			</div>
		);
	}
});

