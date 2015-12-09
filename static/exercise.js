/*

App -> home
App -> login
App -> content

*/

//import { Router, Route, Link } from 'react-router'
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var Router = ReactRouter.Router
var BrowserHistory = History.createHistory
var IndexRoute = ReactRouter.IndexRoute

// {this.props.loading? (<Loader />) : ""}
var Comment = React.createClass({
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
			<span>
			{ this.props.timeAt ? 
				(<div className="timestamp">{this.props.timeAt}</div>) :
				""
			}
			{
				this.props.commentType == "user" ?
					(
						<div className="comment comment-user tk-anonymous-pro">
							{this.props.children}
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


var CommentList = React.createClass({
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
		if (typeof(c) != 'undefined') {
			var pos = this.getPosition(c);
			// window.scrollTo(0,pos.y);
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

var CommentForm = React.createClass({
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

var Content = React.createClass({
	contextTypes : {
		userKey : React.PropTypes.any,
		setUserKey : React.PropTypes.func,
		history : React.PropTypes.object	
	},
	getCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.context.setUserKey(data.userKey)
				this.setState({loadingResponse: false, loaded: true, data:data.comments});
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

		comment.id = Date.now();
		// comment.author = this.context.userKey;
		comment.type = "user";
		var newComments = comments.concat([comment]);

		this.setState({data: newComments, loadingResponse: true});
		this.disablePolling();

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data){
				// var arr=[];
				// arr[0]=data;
				// // you will need to append to comment list, or send back all comments

				// In order to "fake" the loading, disable comment polling until we're done
				// Wait 3 seconds, and then get new comments from server and re-enable polling.
				setTimeout(function() {
					this.setState({loadingResponse: false}, function() {
						this.getCommentsFromServer();
						this.enablePolling();
					});
				}.bind(this), 3000);
			}.bind(this),
			error: function(ehx, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data:[], loaded: false};
	}, 
	getDefaultProps : function() { 
		return {url:"/comments", pollInterval: 3000}; 
	},
	componentWillMount : function() {
		
	},
	componentDidMount: function() {
		setTimeout(function() {
			this.getCommentsFromServer();
			this.enablePolling();
		}.bind(this), 2000);
	},
	componentWillUnmount: function() {
		this.disablePolling();
	},
	enablePolling: function() {
		this.checkInterval = setInterval(this.getCommentsFromServer, this.props.pollInterval);
	},
	disablePolling: function() {
		clearInterval(this.checkInterval);
	},
	render: function() {
		return (
			<div className="content main">
				{ this.state.loaded ? 
					(<CommentList data={this.state.data} loading={this.state.loadingResponse}/>) :
					(<Loader />)
				}
				<div className="commentFormArea">
					<div className="container">
						<CommentForm onCommentSubmit={this.handleCommentSubmit} />
					</div>
				</div>
			</div>
		)
	}
});

// <div class="container">
// 	<form action='login' method='post'>
// 		<input class="form-control" type='text' name='username', id='username', placeholder='username'></input>
// 		<input class="form-control" type='password' name='pw', id='pw', placeholder='password'></input>
// 		<input class="btn btn-default" type='submit' name='login' value="Login"></input>
// 	</form>
// </div>

var Login = React.createClass({
	contextTypes : {
		userKey : React.PropTypes.any,
		setUserKey : React.PropTypes.func,
		history : React.PropTypes.object
	},

	getInitialState: function() {
		return {userKey: null, password: null};
	},
	getDefaultProps : function() { 
		return {url:"/login2"}; 
	},
	handleNewKeyChange: function(e) {
		this.setState({userKey: e.target.value});
	},
	handlePasswordChange: function(e) {
		this.setState({password: e.target.value});
	},
	handleNewKeySubmit: function(e) {
		e.preventDefault();
		var key = this.state.userKey.trim();
		if (!key) {
			return;
		}
		
		var userLogin = this.state;		
		//console.log(userLogin);
		//ajax POST userKey
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: userLogin,
			success: function(data){
				// this.setState({data:data});
				
				console.log("Logged in!!", data);
				if(data.status == "success"){
					this.context.setUserKey(key);
					this.context.history.pushState(null, "/comments", {});
				}	

			}.bind(this),
			error: function(ehx, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		return (
			<div className="login main tk-anonymous-pro">
				<div className="new-user-area">
					<h2>Login</h2>
					<p>
						If you do not have a username and password, register for a new user <Link to="/register">here</Link>.
					</p>
					<form className="logInForm" onSubmit={this.handleNewKeySubmit}>
						<input type="text" 
						  placeholder="Username" 
						  value={this.state.userKey}
				  		  onChange={this.handleNewKeyChange} />
				  		<input type="password" 
						  placeholder="Password" 
						  value={this.state.userPasscode}
				  		  onChange={this.handlePasswordChange} />
						<input type="submit" value="Enter" />
					</form>
				</div>
			</div>
		)
	}
});


var Register = React.createClass({
	contextTypes : {
		userKey : React.PropTypes.any,
		setUserKey : React.PropTypes.func,
		history : React.PropTypes.object
	},

	getInitialState: function() {
		return {username: null, pw: null};
	},
	getDefaultProps : function() { 
		return {url:"/register"}; 
	},
	handleNewKeyChange: function(e) {
		this.setState({username: e.target.value});
	},
	handlePasswordChange: function(e) {
		this.setState({pw: e.target.value});
	},
	handleNewKeySubmit: function(e) {
		e.preventDefault();
		var key = this.state.username.trim();
		if (!key) {
			return;
		}
		
		var userLogin = this.state;		
		// console.log(userLogin);
		//ajax POST userKey
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: userLogin,
			success: function(data){
				// this.setState({data:data});
				
				console.log("Logged in!!", data);
				if(data.status == "success"){
					this.context.setUserKey(key);
					this.context.history.pushState(null, "/comments", {});
				}	

			}.bind(this),
			error: function(ehx, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		return (
			<div className="login main tk-anonymous-pro">
				<div className="new-user-area">
					<h2>Choose a username and password</h2>
					<p>
						This will remain anonymous.
					</p>
					<form className="logInForm" onSubmit={this.handleNewKeySubmit}>
						<input type="text"
						  placeholder="Username" 
						  value={this.state.userKey}
				  		  onChange={this.handleNewKeyChange} />
				  		<input type="password" 
						  placeholder="Password" 
						  value={this.state.userPasscode}
				  		  onChange={this.handlePasswordChange} />
						<input type="submit" value="Enter" />
					</form>
				</div>
			</div>
		)
	}
});

// <img src="static/assets/load-star-black.svg" />
var Loader = React.createClass({
	render: function() {
		return (
			<div className="loader">
				<span className="star"><img src="/static/assets/load-star-black.svg" width="18" height="18"/></span>
				<span className="star"><img src="/static/assets/load-star-black.svg" width="15" height="15"/></span>
				<span className="star"><img src="/static/assets/load-star-black.svg" width="12" height="12"/></span>
			</div>
		)
	}
});


var Home = React.createClass({
	render: function() {
		return (
			<div className="home main">
				<h1 className="tk-anonymous-pro">
					Hey there! Thanks for testing this out. 
					dear d. is a smart diary that responds to you. 
					Get started by creating a new account.
				</h1>
				<Link to="/register">
					<button className="tk-anonymous-pro">Create new account</button>
				</Link>
			</div>
		)
	}
});

// <h1 className="tk-anonymous-pro"><b>Diary Bot</b></h1>
var Header = React.createClass({
	contextTypes: {
		showDate : React.PropTypes.any,
		userKey: React.PropTypes.any,
		setUserKey: React.PropTypes.func
	},
	logout: function() {
		this.context.setUserKey(null);
	},
	render: function() {
		return (
			<header>
				<div className="container">
					<div className="title">
						{ this.props.logoIcon ?
							(<img src="/static/assets/logo-d.svg" width="30"/>) :
							(	<span>
									<img src="/static/assets/key.svg" width="55"/>
									<img src="/static/assets/logo-dear.svg" width="100"/>
									<img src="/static/assets/logo-d-w.svg" width="22"/>
								</span>
							)
						}
					</div>

					<div className="title-date">
						{ this.props.showDate ?
							(<p>{this.context.showDate}</p>) :
							""
						}
					</div>

					{
						this.context.userKey == null ?
						(<div className="right header-login">
							<Link to="/register">new account</Link>
						</div>) : ""
					}	

					<div className="right header-login">
						{
							this.context.userKey == null ?
							(<Link to="/login">login</Link>) :
							(<a href="/logout" onClick={this.logout}>logout</a>)
						}						
					</div>				
				</div>
			</header>
		)
	}
});

var StaticLayout = React.createClass({
	render: function() {
		return(
			<div className="layout-static">
				<div className="container">
					<Header /> 
					{this.props.children}
				</div>
			</div>
		)
	}
});

var DiaryLayout = React.createClass({
	render: function() {
		return(
			<div className="container layout-diary">
				<Header logoIcon={true} showDate={true}/> 
				{this.props.children}
			</div>
		)
	}
});

var App = React.createClass({
	childContextTypes: {
		showDate : React.PropTypes.any,
		setShowDate : React.PropTypes.func,
		userKey: React.PropTypes.any,
		setUserKey: React.PropTypes.func
	},
	getChildContext: function() {
		return {
			showDate : this.state.showDate,
			setShowDate : this.setShowDate,
			userKey: this.state.userKey,
			setUserKey: this.setUserKey
		};
	},
	getInitialState: function() {
		return {
			showDate : null,
			userKey: null,
			loaded : false
		}
	},
	setShowDate: function(date) {
		this.setState({
			showDate: date
		});
	},
	setUserKey: function(key) {
		this.setState({
			userKey: key
		});
	},
	componentDidMount: function() {
		setTimeout(function() {
			this.setState({ loaded: true });
		}.bind(this), 3000);
	},
	render: function() {
		return this.state.loaded ? this.props.children : (
			<div className="app-loading">
				<Loader />
			</div>
		);
	}
});


ReactDOM.render((
	<Router history={BrowserHistory()}>
		<Route path="/" component={App}>
			<Route path="comments" component={DiaryLayout}>
				<IndexRoute component={Content} />
			</Route>
			<Route component={StaticLayout}>
				<IndexRoute component={Home} />
				<Route path="login" component={Login} />
				<Route path="register" component={Register} />
				</Route>
		</Route>
	</Router>
), document.getElementById('app'));
