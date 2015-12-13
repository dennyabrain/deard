module.exports = React.createClass({
	displayName: 'CommentForm',

	getInitialState: function() {
		return {text: ''};
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var text = this.state.text.trim();
		if (!text) {
			return;
		}
		this.props.onCommentSubmit({text: text});
		this.setState({text: ''});

		var elem = document.getElementById('commentList');
		elem.scrollTop = elem.scrollHeight;
	},
	render: function() {
		return (
			<form className="commentForm tk-anonymous-pro" onSubmit={this.handleSubmit}>
				<textarea className="form-control"  
				  placeholder="Say something... " 
				  value={this.state.text}
				  onChange={this.handleTextChange} />
				<input type="submit" value="Post" />
			</form>
		)
	}
});