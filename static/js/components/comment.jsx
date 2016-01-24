module.exports = React.createClass({
	displayName: 'Comment',
	
	colors : {
		'great': '#fc5959',
		'good': '#ff9085',
		'ok': '#e5a89a',
		'bad': '#b8bfa1',
		'worst': '#acc1b9'
	},

	createMarkup: function(link) {
		return {__html: "<a href="+link+">more info</a>"};
	},
	
	render: function() {
		
		if (this.props.commentType == "bot") {
			var scoreBgColor = this.colors[this.props.mood],
					commentStyle = { color : scoreBgColor };
		}

		var comment = this.props.children;
		var paragraphs = comment.split(/\n/);
		var htmlLink = null;
		//'https://fromjia1.typeform.com/to/XpQBTW'
		var htmlLinkRegex = /(https?:\/\/\w+\.\w+\.com\/\w+\/\w+)/;

		var p = paragraphs.map(function(paragraph,i){
			console.log(paragraph);
			
			htmlLink = htmlLinkRegex.exec(paragraph);
			console.log(htmlLink);
			if (htmlLink!=null) {
				console.log("htmlLInk[0]: "+htmlLink[0]);
				paragraph = paragraph.replace(htmlLinkRegex, "");
				console.log(paragraph);
				return (
					<span>
						<p>
							{ReactEmoji.emojify(paragraph, {attributes: {width: '40px', height: '40px'}})}
						</p>
						<button dangerouslySetInnerHTML={this.createMarkup(htmlLink[0])} />
					</span>
				)
			}				
			
			return (<p>{ReactEmoji.emojify(paragraph, {attributes: {width: '40px', height: '40px'}})}</p>)
		}.bind(this));
		// console.log("*****p*****")
		// console.log(p)
		// <p className="center" style={{fontSize: "15px"}}>{timeAt}</p>

		return (
			<span>
			{ this.props.timeAt != null ? 
				(<p className="center" style={{fontSize: "15px"}}>{this.props.timeAt}</p>) :
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
							{p}
						</div>
					)
			}
			<div className="clearfix" />
			</span>
		)
	}
});