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

		return (
			<div className="day">
				{this.props.children}
			</div>
		)
	}
});