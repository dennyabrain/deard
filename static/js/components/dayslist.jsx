var Loader = require('./loader')

module.exports = React.createClass({
	displayName: 'DaysList',

	componentDidMount : function() {
		//this.scrollToLastComment()
	},
	componentDidUpdate : function(props, states, context) {
		// if (this.props.data && props.data && this.props.data.length != props.data.length) {
		// 	this.scrollToLastComment()
		// }
	},
	render: function() {
		var lastTimeAt = 0;
		var commentNodes = this.props.data.map(function(comment,i){
			if (comment.created_at && comment.created_at - lastTimeAt >= 300) {
				lastTimeAt = comment.created_at;
				var d = new Date(comment.created_at * 1000),
						h = (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()),
						z = d.getHours() == 23 || d.getHours() < 12 ? 'am' : 'pm';
				timeAt = h + ':' + ("00" + d.getMinutes()).slice(-2) + ' ' + z;
			} else {
				timeAt = null;
			}
			return (
				<Comment key={'comment-' + i} timeAt={timeAt} commentId={comment.id} commentAfinnScore={comment.afinn_score} commentType={comment.type}>
					{comment.text}
				</Comment>
			);
		});

		return (
			<div ref="commentList" className="commentList" id="commentList">
				{commentNodes} 
				{this.props.loading? (<Loader />) : ""}
			</div>
		);
	}
});

<Day time={}>
 {}
</Day>