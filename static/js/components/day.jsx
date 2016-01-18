module.exports = React.createClass({
	displayName: 'Day',
	
	colors : {
		'-3': '#90EBE1',
		'-2': '#90EBE1',
		'-1': '#90EBE1',
		'0': '#F87C69',
		'1': '#D31D5C',
		'2': '#D31D5C',
		'3': '#D31D5C'
	},
	
	render: function() {
		// if (this.props.commentType == "bot") {
		// 	var scoreBgColor = this.colors[ parseInt(this.props.commentAfinnScore || 0) ],
		// 			commentStyle = { backgroundColor : scoreBgColor };
		// }
		// var days = [];
		// for (var i = 0; i<this.props.data.length; i++) {
		// 	if (this.props.data[i].type == "user") {
		// 		days.push((
		// 			<div className="day-dots">
		// 			</div>
		// 		));
		// 		console.log(this.props.data[i]);
		// 	}
		// }

		var dayLogText = "";
		var charCount = 0;
		var maxChars = 65;
		// console.log("DATA IN DAY");
		// console.log(this.props.data);
		var moodCount = 0;
		var moodSum = 0;
		var moodAvg = null;
		var allData = this.props.data;
		for (var i = 0; i < allData.length; i++) {
 			if (allData[i].mood_score && allData[i].mood_score != -999) {
 				moodCount++;
 				moodSum += allData[i].mood_score;
 			}

			if (this.props.data[i].type == "user" &&
				this.props.data[i].commentFormType == "situation") {
				console.log("this.props.data[i].text.length: "+this.props.data[i].text.length);
				for (var n = 0; n < this.props.data[i].text.length; n++){
					if(charCount < maxChars) {
						charCount++;
						dayLogText += this.props.data[i].text[n];
					} else {
						if (charCount < this.props.data[i].text.length){
							dayLogText += "...";
							break;
						}
					}
				}
				//console.log("charCount: "+ charCount);
				//console.log("dayLogText: "+dayLogText);
				charCount = 0;
				break;
			}
		}

		if (moodCount > 0) moodAvg = moodSum/moodCount;
     	moodCount = 0;
     	moodSum = 0;

		var borderStyle = {};

		if (this.props.keyNum == "comment-0") {
			borderStyle = {borderRadius: "10px 10px 0 0"};
		} else if (this.props.keyNum == "comment-6") {
			borderStyle = {borderRadius: "0 0 10px 10px", 
							marginBottom: "5px",
							boxShadow: "0px 1px 1px rgba(47, 48, 44, 0.2)"};
		}

		// console.log("this.props.key: "+this.props.keyNum)
		// console.log("borderStyle: ")
		// console.log(borderStyle )

		return (
			<div className="day container-fluid" style={borderStyle} >
				<div className="row">
					<div className="day-time col-md-2 col-xs-2">
						<h1 className="day-date">{this.props.date}</h1>
						<h2 className="day-day">{this.props.day}</h2>
					</div>
					<div className="day-comments col-md-8 col-xs-8">
						<p>{dayLogText}</p>
					</div>
					<div className="day-mood col-md-2 col-xs-2">
						{moodAvg}
					</div>
				</div>
			</div>
		)
	}
});