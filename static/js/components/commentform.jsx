module.exports = React.createClass({
	displayName: 'CommentForm',

	contextTypes : {
		mood : React.PropTypes.any,
		setMood : React.PropTypes.func
	},
	getInitialState: function() {
		return {text: ""};
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		if (e) e.preventDefault();
		//var text = this.state.text.trim();
		// console.log(e);
		// var text = e;
		if (!this.state.text) {
			return;
		}

		var comment = {text: this.state.text, commentFormType: this.props.commentFormType}
		
		if (this.props.commentFormType == "bye") {
			comment.newSession = true;
		}

		this.props.onCommentSubmit(comment);
		this.setState({text: ""});

		var elem = document.getElementById('commentList');
		elem.scrollTop = elem.scrollHeight;
	},
	setTextInput: function(input) {
		//console.log(input);
		this.setState({text: input.text}, function() {
			if (this.props.commentFormType == "mood") {
				switch(this.state.text) {
		        	case ":D":
		        		this.context.setMood("great");
		        		console.log("SET MOOD IN COMMENTFORM");
		        		break;
		        	case ":)":
						this.context.setMood("good");
		        		break;
		        	case ":/":
		        		this.context.setMood("ok");
		        		break;
		        	case ":(":
		        		this.context.setMood("bad");
		        		break;
		        	case ":'(":
		        		this.context.setMood("worst");
		        		break;
		        	default:
		        		break;
		        }

		        this.handleSubmit();
		    }
		});
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
		    case "greeting":
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
		        //console.log("setTextInput: "+this.setTextInput)
		        break;
		    default:
		    	formContent = "";
		}
	

		return (
			<form className="commentForm tk-anonymous-pro" onSubmit={this.handleSubmit}>
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
		var placeholder = "";
		switch(this.props.commentFormType) {
			case "feeling":
				placeholder = "Write out specific feelings..."; 
				break;
	    	case "situation":
	    		placeholder = "Describe the situation..."; 
	    		break;
	    	case "thought":
	    		placeholder = "Describe your thought..."; 
	    		break;
	    	case "rethinking":
	    		placeholder = "Try to think about this in a positive way..."; 
	    		break;
	    	default:
	    		break;
		}
		return (
			<div className="row">
				<div className="col-xs-10 input-text">
					<p><textarea className="form-control" 
						placeholder={placeholder}  
						value={this.state.text} 
						onChange={this.handleTextChange} /></p>
				</div>
				<div className="col-xs-2 input-button">
					<h2><input id="input-post" type="submit" value="Post" 
						onClick={this.handleInput} /></h2>
				</div>
			</div>
		)
	}
});


var ButtonInput = React.createClass({
	displayName: 'ButtonInput',

	handleInput: function(e) {
		this.props.textInput({text: e.target.value});
	},
	render: function() {
		var buttonText = "OK";
		if (this.props.commentFormType == "bye") {
			buttonText = "Log new";
		}
		return (
			<span>
				{
					buttonText == "Log new" ? (
						<h2><button type="submit" value="Log new" onClick={this.handleInput} >{buttonText}</button></h2>
					)
					:(
						<h2><button type="submit" value="OK" onClick={this.handleInput} >{buttonText}</button></h2>
					)
				}
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
				<div className="col-xs-1" />
				<div className="col-xs-2"><input type="submit" value="wtf" onClick={this.handleInput} /></div>
				<div className="col-xs-2"><input type="submit" value="bad" onClick={this.handleInput} /></div>
				<div className="col-xs-2"><input type="submit" value="meh" onClick={this.handleInput} /></div>
				<div className="col-xs-2"><input type="submit" value="good" onClick={this.handleInput} /></div>
				<div className="col-xs-2"><input type="submit" value="great" onClick={this.handleInput} /></div>
				<div className="col-xs-1" />
			</div>
		)
	}
});


var MoodSelectionInput = React.createClass({
	displayName: 'MoodSelectionInput',

	handleInput: function(e) {
		//console.log (this)
		var mood = e.currentTarget.getAttribute('data-mood');
		// this.setState({moodType : mood}, function() {
		// 	//this.refs.commentForm.getDOMNode().submit();
		// }.bind(this));
		e.preventDefault();
		this.props.textInput({text: mood});
		console.log(mood);
	},
	render: function() {
		
		return (
			<div className="row">
				<div className="col-xs-1" />
				
				<div className="col-xs-2">
					<a href="javascript:;" onClick={this.handleInput} data-mood=":D">
						{ ReactEmoji.emojify(":D") }
					</a>
				</div>
				<div className="col-xs-2">
					<a href="javascript:;" onClick={this.handleInput} data-mood=":)">
						{ ReactEmoji.emojify(":)") }
					</a>
				</div>
				<div className="col-xs-2">
					<a href="javascript:;" onClick={this.handleInput} data-mood=":/">
						{ ReactEmoji.emojify(":/") }
					</a>
				</div>
				<div className="col-xs-2">
					<a href="javascript:;" onClick={this.handleInput} data-mood=":(">
						{ ReactEmoji.emojify(":(") }
					</a>
				</div>
				<div className="col-xs-2">
					<a href="javascript:;" onClick={this.handleInput} data-mood=":'(">
						{ ReactEmoji.emojify(":'(") }
					</a>
				</div>
				<div className="col-xs-1" />
			</div>
		)
	}
});

