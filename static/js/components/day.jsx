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
		if (this.props.commentType == "bot") {
			var scoreBgColor = this.colors[ parseInt(this.props.commentAfinnScore || 0) ],
					commentStyle = { backgroundColor : scoreBgColor };
		}
		var days = [];
		for (var i = 0; i<this.props.data.length; i++) {
			days.push((
				<div className="day-dots">
				</div>
			));
		}

		return (
			<div className="day container-fluid">
				<div className="row">
					<div className="day-time col-md-2 col-xs-2">
						<h1 className="day-date">{this.props.date}</h1>
						<h1 className="day-day">{this.props.day}</h1>
					</div>
					<div className="day-comments col-md-10 col-xs-10">
						{days}
					</div>
				</div>
			</div>
		)
	}
});