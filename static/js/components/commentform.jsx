module.exports = React.createClass({
	displayName: 'CommentForm',

	getInitialState: function() {
		return {text: ""};
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		//var text = this.state.text.trim();
		// console.log(e);
		// var text = e;
		if (!this.state.text) {
			return;
		}
		this.props.onCommentSubmit({text: this.state.text});
		this.setState({text: ""});

		var elem = document.getElementById('commentList');
		elem.scrollTop = elem.scrollHeight;
	},
	setTextInput: function(input) {
		//console.log(input);
		this.setState({text: input.text});
	},
	render: function() {
		var formContent;
		switch(this.props.commentFormType) {
		    case "feeling":
		    case "situation":
		    case "thought":
		    case "rethinking":
		    	formContent = <TextFieldInput commentFormType={this.props.commentFormType} 
		    				textInput={this.setTextInput} />;
		        break;
		    case "preMechTurk":
		    case "bye":
		        formContent = <ButtonInput commentFormType={this.props.commentFormType} 
		        			textInput={this.setTextInput} />;
		        break;
		    case "review":
		        formContent = <RatingSelectionInput 
		        			textInput={this.setTextInput} />;
		        break;
		    case "mood":
		        formContent = <MoodSelectionInput 
		        			textInput={this.setTextInput} />;
		        break;
		    default:
		    	formContent = "";
		}
	

		return (
			<form className="commentForm container-fluid tk-anonymous-pro" onSubmit={this.handleSubmit}>
				{formContent}
			</form>
		)
	}
});


/*
	Form Input Classes
*/

var TextFieldInput = React.createClass({
	displayName: 'TextFieldInput',

	getInitialState: function() {
		return {text: ""};
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleInput: function(e) {
		this.props.textInput({text: this.state.text});
		this.setState({text: ""});
	},
	render: function() {
		return (
			<span>
				<textarea className="form-control"  
					placeholder="Say something... "  
					value={this.state.text} 
					onChange={this.handleTextChange} />
				<input id="input-post" type="submit" value="Post" 
					onClick={this.handleInput} />
			</span>
		)
	}
});

// var TextFieldInput = React.createClass({
// 	displayName: 'TextFieldInput',
// 	render: function() {
// 		return (
// 			<span>
// 				<textarea className="form-control"  
// 					placeholder="Say something... " 
// 					value={this.state.text}
// 					onChange={this.handleTextChange} />
// 				<input id="input-post" type="submit" value="Post" />
// 			</span>
// 		)
// 	}
// });

var ButtonInput = React.createClass({
	displayName: 'ButtonInput',

	handleInput: function(e) {
		this.props.textInput({text: e.target.value});
	},
	render: function() {
		return (
			<span>
				<button type="submit" value="Ok" onClick={this.handleInput} >OK</button>
			</span>
		)
	}
});

var RatingSelectionInput = React.createClass({
	displayName: 'RatingSelectionInput',

	handleInput: function(e) {
		this.props.textInput({text: e.target.value});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-1" />
				<div className="col-md-2"><input type="submit" value="wtf" onClick={this.handleInput} /></div>
				<div className="col-md-2"><input type="submit" value="bad" onClick={this.handleInput} /></div>
				<div className="col-md-2"><input type="submit" value="meh" onClick={this.handleInput} /></div>
				<div className="col-md-2"><input type="submit" value="good" onClick={this.handleInput} /></div>
				<div className="col-md-2"><input type="submit" value="great" onClick={this.handleInput} /></div>
				<div className="col-md-1" />
			</div>
		)
	}
});

var MoodSelectionInput = React.createClass({
	displayName: 'MoodSelectionInput',

	handleInput: function(e) {
		//e.preventDefault();
		this.props.textInput({text: e.target.value});
		console.log(e.target.value);
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-1" />
				<div className="col-md-2">
					<input type="image" src="/static/img/emoji1.svg" width="35" height="35" alt="Submit" 
						onClick={this.handleInput} value=":D" />
				</div>
				<div className="col-md-2">
					<input type="image" src="/static/img/emoji1.svg" width="35" height="35" alt="Submit" 
						onClick={this.handleInput} value=":)" />
				</div>
				<div className="col-md-2">
					<input type="image" src="/static/img/emoji1.svg" width="35" height="35" alt="Submit" 
						onClick={this.handleInput} value=":/" />
				</div>
				<div className="col-md-2">
					<input type="image" src="/static/img/emoji1.svg" width="35" height="35" alt="Submit" 
						onClick={this.handleInput} value=":(" />
				</div>
				<div className="col-md-2">
					<input type="image" src="/static/img/emoji1.svg" width="35" height="35" alt="Submit" 
						onClick={this.handleInput} value=":'(" />
				</div>
				<div className="col-md-1" />
			</div>
		)
	}
});