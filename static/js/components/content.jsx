var CommentForm = require('./commentform')
var CommentList = require('./commentList')
var Loader = require('./loader')
var Header = require('./header')

module.exports = React.createClass({
	displayName: 'Content',

	contextTypes : {
		userKey : React.PropTypes.any,
		setUserKey : React.PropTypes.func,
		history : React.PropTypes.object,
		mood : React.PropTypes.any,
		setMood : React.PropTypes.func
	},
	getCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.context.setUserKey(data.userKey)
				
				this.setState({loadingResponse: false, loaded: true, data:data.comments}, function() {
        				// Update the commentFormType on latest bot response.
					//var revComments = (data.comments).reverse();
					console.log("NEW COMMENT FORM TYPE")
					console.log(data.commentFormType)
					var revComments = (data.comments);

					//this.setState({ date:revComments[0].created_at });
					// if (!this.state.returnSession) {
					// 	for (var c in revComments) {
					// 		console.log(revComments[c].commentFormType);
					// 		if (revComments[c].type == "bot") {						
					// 			if (this.state.commentFormType != revComments[c].commentFormType) {
					// 				this.setState({commentFormType : revComments[c].commentFormType});
					// 				console.log("COMMENT FORMT TYPE FROM SERVER")
					// 				console.log(revComments[c].commentFormType)
					// 			}
					// 			break;
					// 		}
					// 	}
					// } else {
						this.setState({commentFormType: data.commentFormType, returnSession: false});
					//}
				});
			}.bind(this),
			error: function(ehx, status, err) {
				console.log(this.props.url, status, err.toString());
				this.context.history.pushState(null, "/", {});
			}.bind(this)
		});
	},
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		// Optimistically set an id on the new comment. It will be replaced by an
		// id generated by the server. In a production application you would likely
		// not use Date.now() for this and would have a more robust system in place.

		// comments.type, comments.text 
		console.log("HANDLING COMMENT SUBMIT IN CONTENT")
		console.log(comment)

		comment.id = Date.now();
		// comment.author = this.context.userKey;
		comment.type = "user";
		var newComments = comments.concat([comment]);

		this.setState({data: newComments, loadingResponse: true});

		// SOCKET STUFF
		// console.log(this.socket);
		// this.socket.emit('clientMessage', { "user-comment": comment });
		// this.socket.on('userMessageRcvd', function(data) {
		// 	console.log(data);
		// })
		
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data){
				console.log("success POST");
				console.log(data);
			}.bind(this),
			error: function(ehx, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data:[], loaded: false, commentFormType: "nothing", 
			status: 'disconnected', date: new Date(), mood: "good",
			returnSession: false}
	}, 
	getDefaultProps : function() { 
		return {url:"/comments"}; 
	},
	// SOCKET STUFF
	componentWillMount: function() {
        this.socket = io.connect('http://' + document.domain + ':' + location.port);
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('insert',this.insert);
        //this.socket.on('returnSessionLogin',this.login);

    },
    connect: function() {
    	console.log("SOCKET CONNECT");
    	this.setState({ status: 'connected' });
    	console.log("connected: "+ this.socket.id);
    },
    disconnect: function() {
    	console.log("SOCKET DISCONNECT");
    	this.setState({ status: 'disconnected' });
    },
    insert: function(comment) {
    	//console.log(comment);
    	console.log("SCKET INSERT");
    	console.log(comment.commentFormType);
    	var data = this.state.data;
    	data.push(comment);
    	this.setState({data: data, 
    		loadingResponse: false, 
    		loaded: true,
    		commentFormType: comment.commentFormType});
    },
	componentDidMount: function() {
		setTimeout(function() {
			//this.socket.on('login',this.login);
			this.getCommentsFromServer();
		}.bind(this), 100);
	},
	render: function() {
		// console.log("THIS STATE DATE GETMONTH");
		// console.log(this.state.date.getMonth());
		return (
			<span>
			<Header headerType="chat" date={this.state.date} logoIcon={true} showDate={true}/> 
			<div className="content main">
				{ this.state.loaded ? 
					(
						<CommentList data={this.state.data} loading={this.state.loadingResponse} mood={this.context.mood}/>
					) :
					(<Loader />)
				}
				<div className="commentFormArea">
					<div className="container">
						<CommentForm commentFormType={this.state.commentFormType} onCommentSubmit={this.handleCommentSubmit} />
					</div>
				</div>
			</div>
			</span>
		)
	}
});