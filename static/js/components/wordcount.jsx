
module.exports = React.createClass({
	displayName: 'WordCount',


	componentDidMount : function() {
		// console.log(this.props.data);
		var allData = this.props.data;
		//var unixTimeKeys = []; // keys
		var afinnCount = 0;
		var afinnSum = 0;
		var wordCounts = []; //[0.2, 1.5, 0.6, -5, 1.5, 0.6, -5]
		var words = []; //[2, 3, 4, 5, 6, 0]
		var todayDay = this.props.today.getDay();
		
		var dict = {};
		var keys = [];
		//var arrayCount = 0;
		for (var k in allData) {
    		// for each array element, calculate afinn average
     		for (var i = 0; i < allData[k].length; i++) {
     			if (allData[k][i].nouns) {
     				var nouns = allData[k][i].nouns;
     				for (var w = 0; w < nouns.length; w++){
					    var word = nouns[w];
					    if (!dict.hasOwnProperty(word)){
					      dict[word] = 1
					      keys.push(word);
					    } else {
					      dict[word]++
					    }    
					}
     			}
     		}     		
			//console.log(dict);
			keys.sort(function(a, b) {
			  return (dict[b] -  dict[a]);
			});

			// function comparsion(key1, key2){
			// 	var count1 = dict[key1];
			// 	var count2 = dict[key2];
			// 	return count2 - count1 // negative num, switch order of keys
			// }

		} // end of loop

		words = [keys[0], keys[1], keys[2], keys[3], keys[4], keys[5], keys[6]];
		wordCounts = [dict[keys[0]], dict[keys[1]], dict[keys[2]], dict[keys[3]],
				dict[keys[4]], dict[keys[5]], dict[keys[6]]];

		var chartData = {
		    labels: words,
		    datasets: [
		        {
		            label: "This week",
		            fillColor: "rgba(248,124,105,0.75)",
		            strokeColor: "rgba(220,220,220,1)",
		            highlightFill: "rgba(248,124,105,1)",
		            data: wordCounts
		        }
		    ]
		};
		var options = {
			// scaleOverride : true,
	  //       scaleSteps : 15,
	  //       scaleStepWidth : 1,
	  //       scaleStartValue : 0, 
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

var dict = {};
var keys = [];

function process(txt) {

  var tokens = txt.split(/\W+/);

  dict = {}
  keys = []

  for (var i = 0; i < tokens.length; i++){
    var word = tokens[i];
    if (!dict.hasOwnProperty(word)){
      dict[word] = 1
      key.push(word);
    } else {
      dict[word]++
    }    
  }
  console.log(dict);

  keys.sort(comparison)

  function comparsion(key1, key2){
    var count1 = dict[key1];
    var count2 = dict[key2];

    return count2 - count1 // negative num, switch order of keys
  }

  console.log(keys)

}

