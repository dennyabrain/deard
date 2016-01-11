module.exports = React.createClass({
	displayName: 'Comment',
	
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
					commentStyle = { color : scoreBgColor };
		}

		var comment = this.props.children;
		var paragraphs = comment.split(/\n/);
		var p = paragraphs.map(function(paragraph,i){
			return (
				<p>{paragraph}</p>
			)
		});

		return (
			<span>
			{ this.props.timeAt ? 
				(<div className="timestamp">{this.props.timeAt}</div>) :
				""
			}
			{
				this.props.commentType == "user" ?
					(
						<div className="comment comment-user tk-anonymous-pro">
							{p}
						</div>
					) :
					(
						<div className="comment comment-bot tk-anonymous-pro" style={commentStyle}>
							{this.props.children}
						</div>
					)
			}
			</span>
		)
	}
});