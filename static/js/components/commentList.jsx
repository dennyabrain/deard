var Loader = require('./loader')
var Comment = require('./comment')

module.exports = React.createClass({
	displayName: 'CommentList',

	componentDidMount : function() {
		this.scrollToLastComment()
	},
	componentDidUpdate : function(props, states, context) {
		if (this.props.data && props.data && this.props.data.length != props.data.length) {
			this.scrollToLastComment()
		}
	},
	scrollToLastComment : function() {
		var c = this.refs.commentList.getDOMNode().lastChild;
		//console.log(c);
		if (typeof(c) != 'undefined') {
			var pos = this.getPosition(c);
			// window.scrollTo(0,pos.y);
			//console.log(pos);
			$('html, body').animate({scrollTop: pos.y}, 500);
		}
	},
	getPosition : function(element) {
		var xPosition = 0, yPosition = 0;
		while(element) {
			xPosition += (element.offsetLeft + element.clientLeft);
			yPosition += (element.offsetTop + element.clientTop);
			element = element.offsetParent;
		}
		return { x: xPosition, y: yPosition };
	},
	render: function() {
		var lastTimeAt = 0;
		var timeAt = "";
		var commentNodes = this.props.data.map(function(comment,i){

			if (comment.type == "bot" && comment.commentFormType == "mood") {
			 	//lastTimeAt = comment.created_at;
			 	
				var d = new Date(comment.created_at),
						h = (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()),
						z = d.getHours() == 23 || d.getHours() < 12 ? 'am' : 'pm';
				timeAt = h + ':' + ("00" + d.getMinutes()).slice(-2) + ' ' + z;
				console.log("******TIME AT*****")
				console.log(d)
				console.log(comment)
			} 
			return (
				<Comment key={'comment-' + i} commentId={comment.id} commentAfinnScore={comment.afinn_score} commentType={comment.type}>
					{comment.text}
				</Comment>
			);
			
		});

		

		return (
			<div ref="commentList" className="commentList" id="commentList">
			    <p className="center" style={{fontSize: "15px"}}>{timeAt}</p>
				{commentNodes} 
				{this.props.loading? (<Loader />) : ""}
			</div>
		);
	}
});

// if (comment.created_at && comment.created_at - lastTimeAt >= 300) {
// 	lastTimeAt = comment.created_at;