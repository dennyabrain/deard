/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:5000/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	

	var Route = ReactRouter.Route;
	var Link = ReactRouter.Link;
	var Router = ReactRouter.Router;
	var BrowserHistory = History.createHistory;
	var IndexRoute = ReactRouter.IndexRoute;

	var App = __webpack_require__(1);
	var DiaryLayout = __webpack_require__(3);
	var Content = __webpack_require__(5);
	var StaticLayout = __webpack_require__(9);
	var Home = __webpack_require__(10);
	var Login = __webpack_require__(11);
	var Register = __webpack_require__(12);

	// var Comment = require('./components/comment')
	// var CommentList = require('./components/commentList')

	ReactDOM.render(React.createElement(
		Router,
		{ history: BrowserHistory() },
		React.createElement(
			Route,
			{ path: '/', component: App },
			React.createElement(
				Route,
				{ path: 'comments', component: DiaryLayout },
				React.createElement(IndexRoute, { component: Content })
			),
			React.createElement(
				Route,
				{ component: StaticLayout },
				React.createElement(IndexRoute, { component: Home }),
				React.createElement(Route, { path: 'login', component: Login }),
				React.createElement(Route, { path: 'register', component: Register })
			)
		)
	), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Loader = __webpack_require__(2);

	module.exports = React.createClass({
		displayName: 'App',

		childContextTypes: {
			showDate: React.PropTypes.any,
			setShowDate: React.PropTypes.func,
			userKey: React.PropTypes.any,
			setUserKey: React.PropTypes.func
		},
		getChildContext: function () {
			return {
				showDate: this.state.showDate,
				setShowDate: this.setShowDate,
				userKey: this.state.userKey,
				setUserKey: this.setUserKey
			};
		},
		getInitialState: function () {
			return {
				showDate: null,
				userKey: null,
				loaded: false
			};
		},
		setShowDate: function (date) {
			this.setState({
				showDate: date
			});
		},
		setUserKey: function (key) {
			this.setState({
				userKey: key
			});
		},
		componentDidMount: function () {
			setTimeout((function () {
				this.setState({ loaded: true });
			}).bind(this), 3000);
		},
		render: function () {
			return this.state.loaded ? this.props.children : React.createElement(
				'div',
				{ className: 'app-loading' },
				React.createElement(Loader, null)
			);
		}
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React.createClass({
		displayName: 'Loader',

		render: function () {
			return React.createElement(
				"div",
				{ className: "loader" },
				React.createElement(
					"span",
					{ className: "star" },
					React.createElement("img", { src: "/static/img/load-star-black.svg", width: "18", height: "18" })
				),
				React.createElement(
					"span",
					{ className: "star" },
					React.createElement("img", { src: "/static/img/load-star-black.svg", width: "15", height: "15" })
				),
				React.createElement(
					"span",
					{ className: "star" },
					React.createElement("img", { src: "/static/img/load-star-black.svg", width: "12", height: "12" })
				)
			);
		}
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Header = __webpack_require__(4);

	module.exports = React.createClass({
		displayName: 'DiaryLayout',
		render: function () {
			return React.createElement(
				'div',
				{ className: 'container layout-diary' },
				React.createElement(Header, { logoIcon: true, showDate: true }),
				this.props.children
			);
		}
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	var Link = ReactRouter.Link;

	module.exports = React.createClass({
		displayName: 'Header',

		contextTypes: {
			showDate: React.PropTypes.any,
			userKey: React.PropTypes.any,
			setUserKey: React.PropTypes.func
		},
		logout: function () {
			this.context.setUserKey(null);
		},
		render: function () {
			return React.createElement(
				"header",
				null,
				React.createElement(
					"div",
					{ className: "container" },
					React.createElement(
						"div",
						{ className: "title" },
						this.props.logoIcon ? React.createElement("img", { src: "/static/img/logo-d.svg", width: "30" }) : React.createElement(
							"span",
							null,
							React.createElement("img", { src: "/static/img/key.svg", width: "55" }),
							React.createElement("img", { src: "/static/img/logo-dear.svg", width: "100" }),
							React.createElement("img", { src: "/static/img/logo-d-w.svg", width: "22" })
						)
					),
					React.createElement(
						"div",
						{ className: "title-date" },
						this.props.showDate ? React.createElement(
							"p",
							null,
							this.context.showDate
						) : ""
					),
					this.context.userKey == null ? React.createElement(
						"div",
						{ className: "right header-login" },
						React.createElement(
							Link,
							{ to: "/register" },
							"new account"
						)
					) : "",
					React.createElement(
						"div",
						{ className: "right header-login" },
						this.context.userKey == null ? React.createElement(
							Link,
							{ to: "/login" },
							"login"
						) : React.createElement(
							"a",
							{ href: "/logout", onClick: this.logout },
							"logout"
						)
					)
				)
			);
		}
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var CommentForm = __webpack_require__(6);
	var CommentList = __webpack_require__(7);
	var Loader = __webpack_require__(2);

	module.exports = React.createClass({
		displayName: 'Content',

		contextTypes: {
			userKey: React.PropTypes.any,
			setUserKey: React.PropTypes.func,
			history: React.PropTypes.object
		},
		getCommentsFromServer: function () {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				cache: false,
				success: (function (data) {
					this.context.setUserKey(data.userKey);
					this.setState({ loadingResponse: false, loaded: true, data: data.comments });
				}).bind(this),
				error: (function (ehx, status, err) {
					console.log(this.props.url, status, err.toString());
					this.context.history.pushState(null, "/", {});
				}).bind(this)
			});
		},
		handleCommentSubmit: function (comment) {
			var comments = this.state.data;
			// Optimistically set an id on the new comment. It will be replaced by an
			// id generated by the server. In a production application you would likely
			// not use Date.now() for this and would have a more robust system in place.

			// comments.type, comments.text

			comment.id = Date.now();
			// comment.author = this.context.userKey;
			comment.type = "user";
			var newComments = comments.concat([comment]);

			this.setState({ data: newComments, loadingResponse: true });
			this.disablePolling();

			$.ajax({
				url: this.props.url,
				dataType: 'json',
				type: 'POST',
				data: comment,
				success: (function (data) {
					// var arr=[];
					// arr[0]=data;
					// // you will need to append to comment list, or send back all comments

					// In order to "fake" the loading, disable comment polling until we're done
					// Wait 3 seconds, and then get new comments from server and re-enable polling.
					setTimeout((function () {
						this.setState({ loadingResponse: false }, function () {
							this.getCommentsFromServer();
							this.enablePolling();
						});
					}).bind(this), 3000);
				}).bind(this),
				error: (function (ehx, status, err) {
					console.log(this.props.url, status, err.toString());
				}).bind(this)
			});
		},
		getInitialState: function () {
			return { data: [], loaded: false };
		},
		getDefaultProps: function () {
			return { url: "/comments", pollInterval: 3000 };
		},
		componentWillMount: function () {},
		componentDidMount: function () {
			setTimeout((function () {
				this.getCommentsFromServer();
				this.enablePolling();
			}).bind(this), 2000);
		},
		componentWillUnmount: function () {
			this.disablePolling();
		},
		enablePolling: function () {
			this.checkInterval = setInterval(this.getCommentsFromServer, this.props.pollInterval);
		},
		disablePolling: function () {
			clearInterval(this.checkInterval);
		},
		render: function () {
			return React.createElement(
				'div',
				{ className: 'content main' },
				this.state.loaded ? React.createElement(CommentList, { data: this.state.data, loading: this.state.loadingResponse }) : React.createElement(Loader, null),
				React.createElement(
					'div',
					{ className: 'commentFormArea' },
					React.createElement(
						'div',
						{ className: 'container' },
						React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
					)
				)
			);
		}
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = React.createClass({
		displayName: 'CommentForm',

		getInitialState: function () {
			return { text: '' };
		},
		handleTextChange: function (e) {
			this.setState({ text: e.target.value });
		},
		handleSubmit: function (e) {
			e.preventDefault();
			var text = this.state.text.trim();
			if (!text) {
				return;
			}
			this.props.onCommentSubmit({ text: text });
			this.setState({ text: '' });

			var elem = document.getElementById('commentList');
			elem.scrollTop = elem.scrollHeight;
		},
		render: function () {
			return React.createElement(
				'form',
				{ className: 'commentForm tk-anonymous-pro', onSubmit: this.handleSubmit },
				React.createElement('textarea', { className: 'form-control',
					placeholder: 'Say something... ',
					value: this.state.text,
					onChange: this.handleTextChange }),
				React.createElement('input', { type: 'submit', value: 'Post' })
			);
		}
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Loader = __webpack_require__(2);
	var Comment = __webpack_require__(8);

	module.exports = React.createClass({
		displayName: 'CommentList',

		componentDidMount: function () {
			this.scrollToLastComment();
		},
		componentDidUpdate: function (props, states, context) {
			if (this.props.data && props.data && this.props.data.length != props.data.length) {
				this.scrollToLastComment();
			}
		},
		scrollToLastComment: function () {
			var c = this.refs.commentList.getDOMNode().lastChild;
			if (typeof c != 'undefined') {
				var pos = this.getPosition(c);
				// window.scrollTo(0,pos.y);
				$('html, body').animate({ scrollTop: pos.y }, 500);
			}
		},
		getPosition: function (element) {
			var xPosition = 0,
			    yPosition = 0;
			while (element) {
				xPosition += element.offsetLeft + element.clientLeft;
				yPosition += element.offsetTop + element.clientTop;
				element = element.offsetParent;
			}
			return { x: xPosition, y: yPosition };
		},
		render: function () {
			var lastTimeAt = 0;
			var commentNodes = this.props.data.map(function (comment, i) {
				if (comment.created_at && comment.created_at - lastTimeAt >= 300) {
					lastTimeAt = comment.created_at;
					var d = new Date(comment.created_at * 1000),
					    h = d.getHours() > 12 ? d.getHours() - 12 : d.getHours(),
					    z = d.getHours() == 23 || d.getHours() < 12 ? 'am' : 'pm';
					timeAt = h + ':' + ("00" + d.getMinutes()).slice(-2) + ' ' + z;
				} else {
					timeAt = null;
				}
				return React.createElement(
					Comment,
					{ key: 'comment-' + i, timeAt: timeAt, commentId: comment.id, commentAfinnScore: comment.afinn_score, commentType: comment.type },
					comment.text
				);
			});

			return React.createElement(
				'div',
				{ ref: 'commentList', className: 'commentList', id: 'commentList' },
				commentNodes,
				this.props.loading ? React.createElement(Loader, null) : ""
			);
		}
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = React.createClass({
		displayName: 'Comment',

		colors: {
			'-3': '#90EBE1',
			'-2': '#90EBE1',
			'-1': '#90EBE1',
			'0': '#F87C69',
			'1': '#D31D5C',
			'2': '#D31D5C',
			'3': '#D31D5C'
		},

		render: function () {
			if (this.props.commentType == "bot") {
				var scoreBgColor = this.colors[parseInt(this.props.commentAfinnScore || 0)],
				    commentStyle = { backgroundColor: scoreBgColor };
			}

			return React.createElement(
				'span',
				null,
				this.props.timeAt ? React.createElement(
					'div',
					{ className: 'timestamp' },
					this.props.timeAt
				) : "",
				this.props.commentType == "user" ? React.createElement(
					'div',
					{ className: 'comment comment-user tk-anonymous-pro' },
					this.props.children
				) : React.createElement(
					'div',
					{ className: 'comment comment-bot tk-anonymous-pro', style: commentStyle },
					this.props.children
				)
			);
		}
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Header = __webpack_require__(4);

	module.exports = React.createClass({
		displayName: 'StaticLayout',
		render: function () {
			return React.createElement(
				'div',
				{ className: 'layout-static' },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(Header, null),
					this.props.children
				)
			);
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	var Link = ReactRouter.Link;

	module.exports = React.createClass({
		displayName: 'Home',

		render: function () {
			return React.createElement(
				"div",
				{ className: "home main" },
				React.createElement(
					"h1",
					{ className: "tk-anonymous-pro" },
					"Hey there! Thanks for testing this out. dear d. is a smart diary that responds to you. Get started by creating a new account."
				),
				React.createElement(
					Link,
					{ to: "/register" },
					React.createElement(
						"button",
						{ className: "tk-anonymous-pro" },
						"Create new account"
					)
				)
			);
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	var Link = ReactRouter.Link;

	module.exports = React.createClass({
		displayName: 'Login',

		contextTypes: {
			userKey: React.PropTypes.any,
			setUserKey: React.PropTypes.func,
			history: React.PropTypes.object
		},

		getInitialState: function () {
			return { userKey: null, password: null };
		},
		getDefaultProps: function () {
			return { url: "/login2" };
		},
		handleNewKeyChange: function (e) {
			this.setState({ userKey: e.target.value });
		},
		handlePasswordChange: function (e) {
			this.setState({ password: e.target.value });
		},
		handleNewKeySubmit: function (e) {
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
				success: (function (data) {
					// this.setState({data:data});

					console.log("Logged in!!", data);
					if (data.status == "success") {
						this.context.setUserKey(key);
						this.context.history.pushState(null, "/comments", {});
					}
				}).bind(this),
				error: (function (ehx, status, err) {
					console.log(this.props.url, status, err.toString());
				}).bind(this)
			});
		},
		render: function () {
			return React.createElement(
				'div',
				{ className: 'login main tk-anonymous-pro' },
				React.createElement(
					'div',
					{ className: 'new-user-area' },
					React.createElement(
						'h2',
						null,
						'Login'
					),
					React.createElement(
						'p',
						null,
						'If you do not have a username and password, register for a new user ',
						React.createElement(
							Link,
							{ to: '/register' },
							'here'
						),
						'.'
					),
					React.createElement(
						'form',
						{ className: 'logInForm', onSubmit: this.handleNewKeySubmit },
						React.createElement('input', { type: 'text',
							placeholder: 'Username',
							value: this.state.userKey,
							onChange: this.handleNewKeyChange }),
						React.createElement('input', { type: 'password',
							placeholder: 'Password',
							value: this.state.userPasscode,
							onChange: this.handlePasswordChange }),
						React.createElement('input', { type: 'submit', value: 'Enter' })
					)
				)
			);
		}
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = React.createClass({
		displayName: 'Register',

		contextTypes: {
			userKey: React.PropTypes.any,
			setUserKey: React.PropTypes.func,
			history: React.PropTypes.object
		},

		getInitialState: function () {
			return { username: null, pw: null };
		},
		getDefaultProps: function () {
			return { url: "/register" };
		},
		handleNewKeyChange: function (e) {
			this.setState({ username: e.target.value });
		},
		handlePasswordChange: function (e) {
			this.setState({ pw: e.target.value });
		},
		handleNewKeySubmit: function (e) {
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
				success: (function (data) {
					// this.setState({data:data});

					console.log("Logged in!!", data);
					if (data.status == "success") {
						this.context.setUserKey(key);
						this.context.history.pushState(null, "/comments", {});
					}
				}).bind(this),
				error: (function (ehx, status, err) {
					console.log(this.props.url, status, err.toString());
				}).bind(this)
			});
		},
		render: function () {
			return React.createElement(
				'div',
				{ className: 'login main tk-anonymous-pro' },
				React.createElement(
					'div',
					{ className: 'new-user-area' },
					React.createElement(
						'h2',
						null,
						'Choose a username and password'
					),
					React.createElement(
						'p',
						null,
						'This will remain anonymous.'
					),
					React.createElement(
						'form',
						{ className: 'logInForm', onSubmit: this.handleNewKeySubmit },
						React.createElement('input', { type: 'text',
							placeholder: 'Username',
							value: this.state.userKey,
							onChange: this.handleNewKeyChange }),
						React.createElement('input', { type: 'password',
							placeholder: 'Password',
							value: this.state.userPasscode,
							onChange: this.handlePasswordChange }),
						React.createElement('input', { type: 'submit', value: 'Enter' })
					)
				)
			);
		}
	});

/***/ }
/******/ ]);