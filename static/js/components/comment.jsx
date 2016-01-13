module.exports = React.createClass({
	displayName: 'Comment',
	
	colors : {
		'great': '#fc5959',
		'good': '#ff9085',
		'ok': '#e5a89a',
		'bad': '#b8bfa1',
		'worst': '#acc1b9'
	},
	
	render: function() {
		if (this.props.commentType == "bot") {
			var scoreBgColor = this.colors[this.props.mood],
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
			<div className="clearfix" />
			</span>
		)
	}
});