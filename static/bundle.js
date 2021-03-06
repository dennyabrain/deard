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
	var UserData = __webpack_require__(9);
	var StaticLayout = __webpack_require__(14);
	var Home = __webpack_require__(15);
	var Login = __webpack_require__(16);
	var Register = __webpack_require__(17);
	//var Header = require('./header')

	ReactDOM.render(React.createElement(
		Router,
		{ history: BrowserHistory() },
		React.createElement(
			Route,
			{ path: '/', component: App },
			React.createElement(
				Route,
				{ path: 'comments', component: DiaryLayout },
				React.createElement(IndexRoute, { component: Content }),
				React.createElement(Route, { path: 'data', component: UserData })
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

	// <Route path="comments" component={DiaryLayout}>

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Loader = __webpack_require__(2);
	// var io = require('socket.io-client');

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
				status: 'disconnected',
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
			}).bind(this), 1000);
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
					React.createElement("img", { src: "/static/img/load-star-white.svg", width: "18", height: "18" })
				),
				React.createElement(
					"span",
					{ className: "star" },
					React.createElement("img", { src: "/static/img/load-star-white.svg", width: "15", height: "15" })
				),
				React.createElement(
					"span",
					{ className: "star" },
					React.createElement("img", { src: "/static/img/load-star-white.svg", width: "12", height: "12" })
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
		BGColors: {
			'great': '#f9c4c0',
			'good': '#fcd6d0',
			'ok': '#ead7ca',
			'bad': '#d7dbcc',
			'worst': '#c3d8d1'
		},
		colors: {
			'great': '#fc5959',
			'good': '#ff9085',
			'ok': '#e5a89a',
			'bad': '#b8bfa1',
			'worst': '#acc1b9'
		},
		childContextTypes: {
			mood: React.PropTypes.any,
			setMood: React.PropTypes.func
		},
		getChildContext: function () {
			return {
				mood: this.state.mood,
				setMood: this.setMood
			};
		},
		componentWillMount: function () {
			$('body').addClass('userData-mounted');
		},
		componentWillUnMount: function () {
			$('body').removeClass('userData-mounted');
		},
		setMood: function (data) {
			this.setState({ mood: data });
			console.log("SET MOOD IN DIARYLAYOUT: " + data);
		},
		getInitialState: function () {
			return { mood: "good" };
		},
		render: function () {
			var bgColor = this.BGColors[this.state.mood];
			var ftColor = this.colors[this.state.mood];
			diaryStyle = { backgroundColor: bgColor, color: ftColor };
			return React.createElement(
				'div',
				{ className: 'container layout-diary', style: diaryStyle },
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
			setUserKey: React.PropTypes.func,
			week: React.PropTypes.any,
			setWeek: React.PropTypes.func
		},
		getInitialState: function () {
			return { headerStatus: "chat" };
		},
		changeHeader: function () {
			if (this.state.headerStatus == "chat") this.setState({ headerStatus: "mood" });else if (this.state.headerStatus == "mood") this.setState({ headerStatus: "chat" });
		},
		logout: function () {
			this.context.setUserKey(null);
		},
		render: function () {
			var month = new Array();
			month[0] = "Jan";month[1] = "Feb";
			month[2] = "Mar";month[3] = "Apr";
			month[4] = "May";month[5] = "Jun";
			month[6] = "Jul";month[7] = "Aug";
			month[8] = "Sep";month[9] = "Oct";
			month[10] = "Nov";month[11] = "Dec";
			//var m = month[this.props.date.getMonth()];
			//var d = this.props.date.getDate();
			//console.log("THIS PROPS DATE OBJECT")
			//console.log(this.props.date);
			var header, m, d;
			switch (this.props.headerType) {
				case "static":
					header = React.createElement(StaticHeader, null);
					break;
				case "chat":
					m = month[this.props.date.getMonth()];
					d = this.props.date.getDate();
					header = React.createElement(ChatHeader, { headerType: this.state.headerStatus, month: m, date: d, changeHeader: this.changeHeader });
					break;
				case "mood":
					header = React.createElement(ChatHeader, { headerType: this.props.headerType, changeHeader: this.changeHeader,
						weekNum: this.props.showWeekNum, today: this.props.today });
					break;
				default:
					header = "";
			}

			return React.createElement(
				"header",
				{ className: "container" },
				header
			);
		}
	});

	// <img src="/static/img/logo-dear.svg" width="100"/>
	// <img src="/static/img/logo-d-w.svg" width="22"/>

	var StaticHeader = React.createClass({
		displayName: 'StaticHeader',
		contextTypes: {
			location: React.PropTypes.object
		},
		render: function () {
			return React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-xs-12 col-md-4" },
					React.createElement(
						"div",
						{ className: "right header-login" },
						React.createElement(
							"p",
							null,
							React.createElement(
								Link,
								{ to: "/register" },
								"register"
							)
						)
					),
					React.createElement(
						"div",
						{ className: "header-login" },
						React.createElement(
							"p",
							null,
							React.createElement(
								Link,
								{ to: "/login" },
								"login"
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "static-logo-key col-md-8 col-xs-12" },
					this.context.location.pathname == "/" ? React.createElement(
						Link,
						{ to: "/" },
						React.createElement(
							"div",
							{ className: "home-logo" },
							React.createElement("img", { src: "/static/img/key-black.svg", width: "65" }),
							React.createElement("img", { src: "/static/img/logo-deard.svg", width: "160" })
						)
					) : React.createElement(Link, { to: "/" })
				)
			);
		}
	});
	// <img src="/static/img/key-black.svg" width="55"/>
	// <a href="/"><img src="/static/img/key.svg" width="55"/></a>

	var ChatHeader = React.createClass({
		displayName: 'ChatHeader',

		contextTypes: {
			week: React.PropTypes.any,
			setWeek: React.PropTypes.func
		},
		getInitialState: function () {
			return { headerStatus: this.props.headerType,
				weekNum: this.props.weekNum,
				weekDate: this.props.today };
		},
		changeHeader: function () {
			if (this.state.headerStatus == "chat") {
				this.setState({ headerStatus: "mood" });
			} else if (this.state.headerStatus == "mood") this.setState({ headerStatus: "chat" });
		},
		backWeek: function () {
			//   /userstats?range=7&startdate=2015-12-01
			var oneWeekAgo = new Date();
			oneWeekAgo.setDate(this.state.weekDate.getDate() - 7);
			this.setState({ weekDate: oneWeekAgo,
				weekNum: this.state.weekNum - 1 });
			var range = "?range=7&startdate=" + oneWeekAgo.getFullYear() + "-" + (oneWeekAgo.getMonth() + 1) + "-" + oneWeekAgo.getDate();
			this.context.setWeek(range, oneWeekAgo);
		},
		nextWeek: function () {
			var oneWeekLater = new Date();
			this.props.weekNum++;
			oneWeekLater.setDate(this.state.weekDate.getDate() + 7);
			this.setState({ weekDate: oneWeekLater,
				weekNum: this.state.weekNum + 1 });
			var range = "?range=7&startdate=" + oneWeekLater.getFullYear() + "-" + (oneWeekLater.getMonth() + 1) + "-" + oneWeekLater.getDate();
			this.context.setWeek(range, oneWeekLater);
		},
		render: function () {

			if (this.state.weekDate) {
				var firstDay = new Date();
				firstDay.setDate(this.state.weekDate.getDate() - 7);
				var headerDate = firstDay.getMonth() + 1 + "/" + firstDay.getDate() + " - " + (this.state.weekDate.getMonth() + 1) + "/" + this.state.weekDate.getDate();
				console.log("HEADER DATE: " + this.state.weekDate);
			}

			return React.createElement(
				"div",
				{ className: "row header-row" },
				this.state.headerStatus == "mood" ? React.createElement(
					"span",
					null,
					React.createElement("div", { className: "logo-d col-xs-2" }),
					React.createElement(
						"div",
						{ className: "mood-title logo-d col-xs-8" },
						this.state.weekNum == 0 ? React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "mood-back col-xs-2" },
								React.createElement(
									"button",
									{ onClick: this.backWeek },
									"back"
								)
							),
							React.createElement(
								"div",
								{ className: "center col-xs-8" },
								React.createElement(
									"h2",
									null,
									"This week"
								)
							),
							React.createElement("div", { className: "right col-xs-2", style: { backgroundColor: "transparent" } })
						) : React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "mood-back col-xs-2" },
								React.createElement(
									"button",
									{ onClick: this.backWeek },
									"back"
								)
							),
							React.createElement(
								"div",
								{ className: "center col-xs-8" },
								React.createElement(
									"h2",
									null,
									headerDate
								)
							),
							React.createElement(
								"div",
								{ className: "mood-next col-xs-2" },
								React.createElement(
									"button",
									{ onClick: this.nextWeek },
									"next"
								)
							)
						)
					),
					React.createElement(
						"div",
						{ className: "right logo-d col-xs-2" },
						React.createElement(
							Link,
							{ to: "/comments" },
							React.createElement("img", { src: "/static/img/logo-d.svg", width: "30", onClick: this.changeHeader })
						)
					)
				) : React.createElement(
					"span",
					null,
					React.createElement(
						"div",
						{ className: "title-data col-xs-2" },
						React.createElement(
							Link,
							{ to: "/comments/data" },
							React.createElement("img", { src: "/static/img/data-icon2.svg", width: "25",
								onClick: this.changeHeader })
						)
					),
					React.createElement(
						"div",
						{ className: "logo-d col-xs-8" },
						React.createElement(
							"h2",
							null,
							this.props.month,
							" ",
							this.props.date
						)
					),
					React.createElement(
						"div",
						{ className: "right col-xs-2" },
						React.createElement(
							"a",
							{ href: "/logout", onClick: this.logout },
							React.createElement("img", { src: "/static/img/logout.svg", width: "10" })
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
	var Header = __webpack_require__(4);

	module.exports = React.createClass({
		displayName: 'Content',

		contextTypes: {
			userKey: React.PropTypes.any,
			setUserKey: React.PropTypes.func,
			history: React.PropTypes.object,
			mood: React.PropTypes.any,
			setMood: React.PropTypes.func
		},
		getCommentsFromServer: function () {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				cache: false,
				success: (function (data) {
					this.context.setUserKey(data.userKey);

					this.setState({ loadingResponse: false, loaded: true, data: data.comments }, function () {
						// Update the commentFormType on latest bot response.
						//var revComments = (data.comments).reverse();
						console.log("NEW COMMENT FORM TYPE");
						console.log(data.commentFormType);
						var revComments = data.comments;

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
						this.setState({ commentFormType: data.commentFormType, returnSession: false });
						//}
					});
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
			console.log("HANDLING COMMENT SUBMIT IN CONTENT");
			console.log(comment);

			comment.id = Date.now();
			// comment.author = this.context.userKey;
			comment.type = "user";
			var newComments = comments.concat([comment]);

			this.setState({ data: newComments, loadingResponse: true });

			$.ajax({
				url: this.props.url,
				dataType: 'json',
				type: 'POST',
				data: comment,
				success: (function (data) {
					console.log("success POST");
					console.log(data);
				}).bind(this),
				error: (function (ehx, status, err) {
					console.log(this.props.url, status, err.toString());
				}).bind(this)
			});
		},
		getInitialState: function () {
			return { data: [], loaded: false, commentFormType: "nothing",
				status: 'disconnected', date: new Date(), mood: "good",
				returnSession: false };
		},
		getDefaultProps: function () {
			return { url: "/comments" };
		},
		// SOCKET STUFF
		componentWillMount: function () {
			this.socket = io.connect('http://' + document.domain + ':' + location.port);
			this.socket.on('connect', this.connect);
			this.socket.on('disconnect', this.disconnect);
			this.socket.on('insert', this.insert);
			//this.socket.on('returnSessionLogin',this.login);
		},
		connect: function () {
			console.log("SOCKET CONNECT");
			this.setState({ status: 'connected' });
			console.log("connected: " + this.socket.id);
		},
		disconnect: function () {
			console.log("SOCKET DISCONNECT");
			this.setState({ status: 'disconnected' });
		},
		insert: function (comment) {
			//console.log(comment);
			console.log("SCKET INSERT");
			console.log(comment.commentFormType);
			var data = this.state.data;
			data.push(comment);
			this.setState({ data: data,
				loadingResponse: false,
				loaded: true,
				commentFormType: comment.commentFormType });
		},
		componentDidMount: function () {
			setTimeout((function () {
				//this.socket.on('login',this.login);
				this.getCommentsFromServer();
			}).bind(this), 100);
		},
		render: function () {
			// console.log("THIS STATE DATE GETMONTH");
			// console.log(this.state.date.getMonth());
			return React.createElement(
				'span',
				null,
				React.createElement(Header, { headerType: 'chat', date: this.state.date, logoIcon: true, showDate: true }),
				React.createElement(
					'div',
					{ className: 'content main' },
					this.state.loaded ? React.createElement(CommentList, { data: this.state.data, loading: this.state.loadingResponse, mood: this.context.mood }) : React.createElement(Loader, null),
					React.createElement(
						'div',
						{ className: 'commentFormArea' },
						React.createElement(
							'div',
							{ className: 'container' },
							React.createElement(CommentForm, { commentFormType: this.state.commentFormType, onCommentSubmit: this.handleCommentSubmit })
						)
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

		contextTypes: {
			mood: React.PropTypes.any,
			setMood: React.PropTypes.func
		},
		getInitialState: function () {
			return { text: "" };
		},
		handleTextChange: function (e) {
			this.setState({ text: e.target.value });
		},
		handleSubmit: function (e) {
			e.preventDefault();
			//var text = this.state.text.trim();
			// console.log(e);
			// var text = e;
			if (!this.state.text) {
				return;
			}

			var comment = { text: this.state.text, commentFormType: this.props.commentFormType };

			if (this.props.commentFormType == "bye") {
				comment.newSession = true;
			}

			this.props.onCommentSubmit(comment);
			this.setState({ text: "" });

			var elem = document.getElementById('commentList');
			elem.scrollTop = elem.scrollHeight;
		},
		setTextInput: function (input) {
			//console.log(input);
			this.setState({ text: input.text }, function () {
				if (this.props.commentFormType == "mood") {
					switch (this.state.text) {
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
				}
			});
		},
		render: function () {
			var formContent;
			switch (this.props.commentFormType) {
				case "feeling":
				case "situation":
				case "thought":
				case "rethinking":
					formContent = React.createElement(TextFieldInput, { commentFormType: this.props.commentFormType,
						textInput: this.setTextInput });
					break;
				case "preMechTurk":
				case "bye":
					formContent = React.createElement(ButtonInput, { commentFormType: this.props.commentFormType,
						textInput: this.setTextInput });
					break;
				case "greeting":
					formContent = React.createElement(ButtonInput, { commentFormType: this.props.commentFormType,
						textInput: this.setTextInput });
					break;
				case "review":
					formContent = React.createElement(RatingSelectionInput, {
						textInput: this.setTextInput });
					break;
				case "mood":
					formContent = React.createElement(MoodSelectionInput, {
						textInput: this.setTextInput });
					//console.log("setTextInput: "+this.setTextInput)
					break;
				default:
					formContent = "";
			}

			return React.createElement(
				"form",
				{ className: "commentForm tk-anonymous-pro", onSubmit: this.handleSubmit },
				formContent
			);
		}
	});

	/*
		Form Input Classes
	*/

	var TextFieldInput = React.createClass({
		displayName: 'TextFieldInput',

		getInitialState: function () {
			return { text: "" };
		},
		handleTextChange: function (e) {
			this.setState({ text: e.target.value });
		},
		handleInput: function (e) {
			this.props.textInput({ text: this.state.text });
			this.setState({ text: "" });
		},
		render: function () {
			return React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-xs-10 input-text" },
					React.createElement(
						"p",
						null,
						React.createElement("textarea", { className: "form-control",
							placeholder: "Say something... ",
							value: this.state.text,
							onChange: this.handleTextChange })
					)
				),
				React.createElement(
					"div",
					{ className: "col-xs-2 input-button" },
					React.createElement(
						"h2",
						null,
						React.createElement("input", { id: "input-post", type: "submit", value: "Post",
							onClick: this.handleInput })
					)
				)
			);
		}
	});

	var ButtonInput = React.createClass({
		displayName: 'ButtonInput',

		handleInput: function (e) {
			this.props.textInput({ text: e.target.value });
		},
		render: function () {
			var buttonText = "OK";
			if (this.props.commentFormType == "bye") {
				buttonText = "Log new";
			}
			return React.createElement(
				"span",
				null,
				buttonText == "Log new" ? React.createElement(
					"h2",
					null,
					React.createElement(
						"button",
						{ type: "submit", value: "Log new", onClick: this.handleInput },
						buttonText
					)
				) : React.createElement(
					"h2",
					null,
					React.createElement(
						"button",
						{ type: "submit", value: "OK", onClick: this.handleInput },
						buttonText
					)
				)
			);
		}
	});

	var RatingSelectionInput = React.createClass({
		displayName: 'RatingSelectionInput',

		handleInput: function (e) {
			this.props.textInput({ text: e.target.value });
		},
		render: function () {
			return React.createElement(
				"div",
				{ className: "row" },
				React.createElement("div", { className: "col-xs-1" }),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "submit", value: "wtf", onClick: this.handleInput })
				),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "submit", value: "bad", onClick: this.handleInput })
				),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "submit", value: "meh", onClick: this.handleInput })
				),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "submit", value: "good", onClick: this.handleInput })
				),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "submit", value: "great", onClick: this.handleInput })
				),
				React.createElement("div", { className: "col-xs-1" })
			);
		}
	});

	var MoodSelectionInput = React.createClass({
		displayName: 'MoodSelectionInput',

		handleInput: function (e) {
			//e.preventDefault();
			this.props.textInput({ text: e.target.value });
			console.log(e.target.value);
		},
		render: function () {
			return React.createElement(
				"div",
				{ className: "row" },
				React.createElement("div", { className: "col-xs-1" }),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "image", src: "/static/img/emoji1.svg", width: "35", height: "35", alt: "Submit",
						onClick: this.handleInput, value: ":D" })
				),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "image", src: "/static/img/emoji1.svg", width: "35", height: "35", alt: "Submit",
						onClick: this.handleInput, value: ":)" })
				),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "image", src: "/static/img/emoji1.svg", width: "35", height: "35", alt: "Submit",
						onClick: this.handleInput, value: ":/" })
				),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "image", src: "/static/img/emoji1.svg", width: "35", height: "35", alt: "Submit",
						onClick: this.handleInput, value: ":(" })
				),
				React.createElement(
					"div",
					{ className: "col-xs-2" },
					React.createElement("input", { type: "image", src: "/static/img/emoji1.svg", width: "35", height: "35", alt: "Submit",
						onClick: this.handleInput, value: ":'(" })
				),
				React.createElement("div", { className: "col-xs-1" })
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
			//console.log(c);
			if (typeof c != 'undefined') {
				var pos = this.getPosition(c);
				// window.scrollTo(0,pos.y);
				//console.log(pos);
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
			'great': '#fc5959',
			'good': '#ff9085',
			'ok': '#e5a89a',
			'bad': '#b8bfa1',
			'worst': '#acc1b9'
		},

		render: function () {
			if (this.props.commentType == "bot") {
				var scoreBgColor = this.colors[this.props.mood],
				    commentStyle = { color: scoreBgColor };
			}

			var comment = this.props.children;
			var paragraphs = comment.split(/\n/);
			var p = paragraphs.map(function (paragraph, i) {
				return React.createElement(
					'p',
					null,
					paragraph
				);
			});

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
					p
				) : React.createElement(
					'div',
					{ className: 'comment comment-bot tk-anonymous-pro', style: commentStyle },
					this.props.children
				),
				React.createElement('div', { className: 'clearfix' })
			);
		}
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Loader = __webpack_require__(2);
	var MoodGraph = __webpack_require__(10);
	var WordCount = __webpack_require__(11);
	var DaysList = __webpack_require__(12);
	var Header = __webpack_require__(4);

	module.exports = React.createClass({
		displayName: 'UserData',

		colors: {
			'great': '#fc5959',
			'good': '#ff9085',
			'ok': '#e5a89a',
			'bad': '#b8bfa1',
			'worst': '#acc1b9'
		},
		contextTypes: {
			userKey: React.PropTypes.any,
			setUserKey: React.PropTypes.func,
			history: React.PropTypes.object,
			mood: React.PropTypes.any
		},
		childContextTypes: {
			week: React.PropTypes.any,
			setWeek: React.PropTypes.func
		},
		getChildContext: function () {
			return {
				week: this.state.weekNum,
				setWeek: this.setWeek
			};
		},
		setWeek: function (range, newDate) {
			console.log("SET WEEK!");
			console.log(range);
			this.setState({ loaded: false, date: newDate });
			this.getCommentsFromServer(range);
		},
		getCommentsFromServer: function (range) {
			$.ajax({
				url: this.props.url + range,
				dataType: 'json',
				cache: false,
				success: (function (data) {
					//var c = $.extend(true, {},data);
					//this.context.setUserKey(data.userKey)
					//console.log("DATA COMMENTS IN MOOD")
					//console.log(data.comments); // {0:[], 1:[], 2:[]}
					this.setState({ loadingResponse: false, loaded: true, data: data.comments });
				}).bind(this),
				error: (function (ehx, status, err) {
					console.log(this.props.url, status, err.toString());
					this.context.history.pushState(null, "/", {});
				}).bind(this)
			});
			//console.log(this.state.data);
		},
		getInitialState: function () {
			return { data: [], loaded: false, date: new Date(),
				weekNum: 0 };
		},
		getDefaultProps: function () {
			return { url: "/userstats" };
			///userstats?range=7
		},
		componentDidMount: function () {
			var date = this.state.date;
			setTimeout((function () {
				var range = "?range=7&startdate=" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(); //  /userstats?range=30&startdate=2015-12-01
				this.getCommentsFromServer(range);
				//this.enablePolling();
			}).bind(this), 100);
		},
		componentWillMount: function () {
			$('body').addClass('userData-mounted');
		},
		componentWillUnMount: function () {
			$('body').removeClass('userData-mounted');
		},
		render: function () {
			var ftColor = this.colors[this.context.mood];
			console.log("USERDATA FONT COLOR: " + ftColor);
			return React.createElement(
				'span',
				null,
				React.createElement(Header, { headerType: 'mood', logoIcon: true, showDate: true,
					showWeekNum: this.state.weekNum, today: this.state.date }),
				React.createElement(
					'div',
					{ className: 'userData' },
					this.state.loaded ? React.createElement(
						'div',
						null,
						React.createElement('div', { className: 'userData-week' }),
						React.createElement(MoodGraph, { data: this.state.data, today: this.state.date }),
						React.createElement(WordCount, { fontColor: ftColor, data: this.state.data, today: this.state.date }),
						React.createElement(DaysList, { data: this.state.data, today: this.state.date })
					) : React.createElement(Loader, null)
				)
			);
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Loader = __webpack_require__(2);

	module.exports = React.createClass({
		displayName: 'MoodGraph',

		componentDidMount: function () {
			//console.log(this.props.data);
			var allData = this.props.data; //{0:[0:{}, 1:{}], 1:[], 2:[]...}
			//var unixTimeKeys = []; // keys
			var moodCountPerDay = 0;
			var moodSumPerDay = 0;
			var moodAvgPerDay = []; //[0.2, 1.5, 0.6, -5, 1.5, 0.6, -5]
			var days = []; //[2, 3, 4, 5, 6, 0]
			var startDay = this.props.today.getDay();
			//console.log("ALL DATA IN MOOD GRAPH")
			//console.log(allData);
			//var arrayCount = 0;
			for (var k in allData) {
				if (allData.hasOwnProperty(k)) {
					// store keys in array
					//unixTimeKeys.push(k);
					//var date = new Date(k*1000);
					//console.log(k);
					switch (startDay) {
						case 0:
							days.unshift("SUN");
							break;
						case 1:
							days.unshift("MON");
							break;
						case 2:
							days.unshift("TUE");
							break;
						case 3:
							days.unshift("WED");
							break;
						case 4:
							days.unshift("THU");
							break;
						case 5:
							days.unshift("FRI");
							break;
						case 6:
							days.unshift("SAT");
							break;
						default:
							break;
					}
					if (startDay > 0) startDay--;else startDay = 6;

					// for each array element, calculate afinn average
					// -2, -1, 1, 2, 3
					for (var i = 0; i < allData[k].length; i++) {
						if (allData[k][i].mood_score && allData[k][i].mood_score != -999) {
							moodCountPerDay++;
							moodSumPerDay += allData[k][i].mood_score;
						}
					}
					if (moodCountPerDay > 0) moodAvgPerDay.unshift(Math.round(moodSumPerDay / moodCountPerDay * 100));else moodAvgPerDay.unshift(null);
					moodCountPerDay = 0;
					moodSumPerDay = 0;
				}
			} // end of for loop
			//console.log("MOOD AVERAGE")
			//console.log(moodAvgPerDay);
			var ctx = document.getElementById("myChart").getContext("2d");
			var gradient = ctx.createLinearGradient(0, 0, 0, 200);
			// gradient.addColorStop(0, 'rgba(137,239,229,1)');  
			// gradient.addColorStop(0.8, 'rgba(253,120,97,1)');
			// gradient.addColorStop(0.4, 'rgba(212,20,90,1)');

			gradient.addColorStop(1.0, 'rgba(137,239,229,1)'); //blue
			gradient.addColorStop(0.5, 'rgba(253,120,97,0.6)');
			gradient.addColorStop(0.0, 'rgba(212,20,90,1)'); //red
			// gradient.addColorStop(0.6, 'rgba(128,128,128,1)');

			var chartData = {
				labels: days,
				datasets: [{
					label: "This week",
					fillColor: gradient,
					strokeColor: gradient,
					pointColor: "rgba(200,200,200,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: moodAvgPerDay
				}]
			};
			var options = {
				scaleOverride: true,
				scaleSteps: 10,
				scaleStepWidth: 100,
				scaleStartValue: -500,
				scaleShowGridLines: false,
				datasetFill: false,
				scaleLineColor: 'transparent',
				scaleShowLabels: false,
				datasetStrokeWidth: 10,
				pointDotRadius: 8,
				scaleFontFamily: "'HKGrotesque-regular', 'sans-serif'",
				scaleFontColor: "rgba(47,48,44,0.7)"
			};

			var myLineChart = new Chart(ctx).Line(chartData, options);
		},
		componentDidUpdate: function (props, states, context) {
			// if (this.props.data && props.data && this.props.data.length != props.data.length) {
			// 	this.scrollToLastComment()
			// }
		},
		render: function () {
			return React.createElement(
				'div',
				{ className: 'moodgraph container-fluid' },
				React.createElement(
					'div',
					{ className: 'moodgraph-key col-md-1 col-xs-1' },
					React.createElement('img', { src: '/static/img/mood-happy.svg', width: '25' }),
					React.createElement('img', { src: '/static/img/mood-sad.svg', width: '25' })
				),
				React.createElement(
					'div',
					{ className: 'col-md-11 col-xs-11' },
					React.createElement('canvas', { id: 'myChart', height: '300' })
				)
			);
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	
	module.exports = React.createClass({
		displayName: 'WordCount',

		getInitialState: function () {
			return { noWordsText: null, fontColor: this.props.fontColor };
		},
		componentDidMount: function () {
			// console.log(this.props.data);
			var allData = this.props.data;
			// console.log("ALL DATA IN WORD COUNT")
			// console.log(allData)
			//var unixTimeKeys = []; // keys
			var wordCounts = []; //[0.2, 1.5, 0.6, -5, 1.5, 0.6, -5]
			var words = []; //[2, 3, 4, 5, 6, 0]
			//var todayDay = this.props.today.getDay();

			var dict = {};
			var keys = [];

			//var arrayCount = 0;
			for (var k in allData) {
				// for each array element, calculate afinn average
				for (var i = 0; i < allData[k].length; i++) {
					if (allData[k][i].nouns) {
						if (allData[k][i].commentFormType == "situation" || allData[k][i].commentFormType == "rethinking" || allData[k][i].commentFormType == "feeling" || allData[k][i].commentFormType == "thought") {
							var nouns = allData[k][i].nouns;
							if (nouns.length < 0) break;
							for (var w = 0; w < nouns.length; w++) {
								var word = nouns[w];
								if (!dict.hasOwnProperty(word)) {
									dict[word] = 1;
									keys.push(word);
								} else {
									dict[word]++;
								}
							}
						}
					}
				}
				//console.log(dict);
				keys.sort(function (a, b) {
					return dict[b] - dict[a];
				});

				// function comparsion(key1, key2){
				// 	var count1 = dict[key1];
				// 	var count2 = dict[key2];
				// 	return count2 - count1 // negative num, switch order of keys
				// }
			} // end of loop

			words = [keys[0], keys[1], keys[2], keys[3], keys[4], keys[5], keys[6]];
			var numOfWords = 7;
			for (var i = 0; i < words.length; i++) {
				if (!words[i]) {
					words[i] = "";numOfWords--;
				}
			}
			//console.log("NUM OF WORDS: "+numOfWords);
			wordCounts = [dict[keys[0]] || 0, dict[keys[1]] || 0, dict[keys[2]] || 0, dict[keys[3]] || 0, dict[keys[4]] || 0, dict[keys[5]] || 0, dict[keys[6]] || 0];

			if (numOfWords == 0) {
				this.setState({ noWordsText: "There are no words." });
			}
			console.log("FONT COLOR: " + this.state.fontColor);
			var chartData = {
				labels: words,
				datasets: [{
					label: "This week",
					fillColor: this.state.fontColor,
					strokeColor: "rgba(220,220,220,1)",
					highlightFill: this.state.fontColor,
					data: wordCounts
				}]
			};
			var options = {
				scaleOverride: false,
				scaleSteps: 15,
				scaleStepWidth: 1,
				scaleBeginAtZero: false,
				scaleShowGridLines: false,
				// datasetFill : false,
				scaleLineColor: 'transparent',
				scaleShowLabels: false,
				barShowStroke: false,
				scaleFontFamily: "'HKGrotesque-regular', 'sans-serif'",
				scaleFontColor: "#2f302c"
			};

			//console.log(chartData, options)
			var ctx = document.getElementById("myWordChart").getContext("2d");
			var myBarChart = new Chart(ctx).Bar(chartData, options);
		},
		componentDidUpdate: function (props, states, context) {
			// if (this.props.data && props.data && this.props.data.length != props.data.length) {
			// 	this.scrollToLastComment()
			// }
		},
		//{ this.state.noWordsText ? "no words" : this.state.noWordsText }
		render: function () {
			return React.createElement(
				"div",
				{ className: "wordcount" },
				this.state.noWordsText ? React.createElement(
					"div",
					{ className: "myWordChart-noWords" },
					React.createElement(
						"p",
						null,
						this.state.noWordsText
					)
				) : React.createElement("canvas", { id: "myWordChart" })
			);
		}
	});

	var dict = {};
	var keys = [];

	function process(txt) {

		var tokens = txt.split(/\W+/);

		dict = {};
		keys = [];

		for (var i = 0; i < tokens.length; i++) {
			var word = tokens[i];
			if (!dict.hasOwnProperty(word)) {
				dict[word] = 1;
				key.push(word);
			} else {
				dict[word]++;
			}
		}
		console.log(dict);

		keys.sort(comparison);

		function comparsion(key1, key2) {
			var count1 = dict[key1];
			var count2 = dict[key2];

			return count2 - count1; // negative num, switch order of keys
		}

		console.log(keys);
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Loader = __webpack_require__(2);
	var Day = __webpack_require__(13);

	module.exports = React.createClass({
		displayName: 'DaysList',

		componentDidMount: function () {
			//this.scrollToLastComment()
			var days = [];
		},
		componentDidUpdate: function (props, states, context) {
			// if (this.props.data && props.data && this.props.data.length != props.data.length) {
			// 	this.scrollToLastComment()
			// }
		},
		render: function () {
			var lastTimeAt = 0;

			var day;
			var days = [];
			var date;
			var dateTemp;
			var todayDay = this.props.today.getDay();
			// var todayDate = this.props.today.getDate();
			var todayDate = this.props.today;
			var dayListCount = 0;
			//console.log(this.props.data);
			for (var d in this.props.data) {
				var comment = this.props.data[d];
				if (this.props.data.hasOwnProperty(d)) {

					switch (todayDay) {
						case 0:
							day = "SUN";
							break;
						case 1:
							day = "MON";
							break;
						case 2:
							day = "TUE";
							break;
						case 3:
							day = "WED";
							break;
						case 4:
							day = "THU";
							break;
						case 5:
							day = "FRI";
							break;
						case 6:
							day = "SAT";
							break;
						default:
							break;
					}
					if (todayDay > 0) todayDay--;else todayDay = 6;
				} // end of if statement
				//console.log(comment);
				//console.log("dayListCount: " + dayListCount)
				days.push(React.createElement(Day, { key: 'comment-' + dayListCount, keyNum: 'comment-' + dayListCount, day: day,
					date: todayDate.getDate(), data: this.props.data[d] }));

				todayDate -= 1000 * 60 * 60 * 24;
				todayDate = new Date(todayDate);
				dayListCount++;
			} // end of going through object

			//console.log(days);

			return React.createElement(
				'div',
				{ className: 'daysList' },
				days
			);
		}
	});

	// <span>{date}</span>
	// <span>{comment[date]}</span>

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = React.createClass({
		displayName: 'Day',

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
			// if (this.props.commentType == "bot") {
			// 	var scoreBgColor = this.colors[ parseInt(this.props.commentAfinnScore || 0) ],
			// 			commentStyle = { backgroundColor : scoreBgColor };
			// }
			// var days = [];
			// for (var i = 0; i<this.props.data.length; i++) {
			// 	if (this.props.data[i].type == "user") {
			// 		days.push((
			// 			<div className="day-dots">
			// 			</div>
			// 		));
			// 		console.log(this.props.data[i]);
			// 	}
			// }

			var dayLogText = "";
			var charCount = 0;
			var maxChars = 65;
			// console.log("DATA IN DAY");
			// console.log(this.props.data);
			var moodCount = 0;
			var moodSum = 0;
			var moodAvg = null;
			var allData = this.props.data;
			for (var i = 0; i < allData.length; i++) {
				if (allData[i].mood_score && allData[i].mood_score != -999) {
					moodCount++;
					moodSum += allData[i].mood_score;
				}

				if (this.props.data[i].type == "user" && this.props.data[i].commentFormType == "situation") {
					console.log("this.props.data[i].text.length: " + this.props.data[i].text.length);
					for (var n = 0; n < this.props.data[i].text.length; n++) {
						if (charCount < maxChars) {
							charCount++;
							dayLogText += this.props.data[i].text[n];
						} else {
							if (charCount < this.props.data[i].text.length) {
								dayLogText += "...";
								break;
							}
						}
					}
					//console.log("charCount: "+ charCount);
					//console.log("dayLogText: "+dayLogText);
					charCount = 0;
					break;
				}
			}

			if (moodCount > 0) moodAvg = moodSum / moodCount;
			moodCount = 0;
			moodSum = 0;

			var borderStyle = {};

			if (this.props.keyNum == "comment-0") {
				borderStyle = { borderRadius: "10px 10px 0 0" };
			} else if (this.props.keyNum == "comment-6") {
				borderStyle = { borderRadius: "0 0 10px 10px",
					marginBottom: "5px",
					boxShadow: "0px 1px 1px rgba(47, 48, 44, 0.2)" };
			}

			// console.log("this.props.key: "+this.props.keyNum)
			// console.log("borderStyle: ")
			// console.log(borderStyle )

			return React.createElement(
				'div',
				{ className: 'day container-fluid', style: borderStyle },
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'div',
						{ className: 'day-time col-md-2 col-xs-2' },
						React.createElement(
							'h1',
							{ className: 'day-date' },
							this.props.date
						),
						React.createElement(
							'h2',
							{ className: 'day-day' },
							this.props.day
						)
					),
					React.createElement(
						'div',
						{ className: 'day-comments col-md-8 col-xs-8' },
						React.createElement(
							'p',
							null,
							dayLogText
						)
					),
					React.createElement(
						'div',
						{ className: 'day-mood col-md-2 col-xs-2' },
						moodAvg
					)
				)
			);
		}
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Header = __webpack_require__(4);

	module.exports = React.createClass({
		displayName: 'StaticLayout',

		contextTypes: {
			location: React.PropTypes.object
		},
		render: function () {
			var name = this.context.location.pathname;

			var key = name.replace(/^\//, '');
			//.replace(/\//, '-') || ‘home’
			console.log("STATIC LAYOUT");
			console.log("layout-static page-" + key);
			return React.createElement(
				'div',
				{ className: "layout-static page-" + key },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(Header, { headerType: 'static' }),
					this.props.children
				)
			);
		}
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	var Link = ReactRouter.Link;

	module.exports = React.createClass({
		displayName: 'Home',

		render: function () {
			return React.createElement(
				"div",
				{ className: "home main" },
				React.createElement("h2", { className: "tk-anonymous-pro" })
			);
		}
	});

	// <Link to="/register">
	// 	<button className="tk-anonymous-pro">Create new account</button>
	// </Link>

	// Dear friend, dear d. is a smart diary that responds to you and let you track your mood.
	// Get started by creating a new account.

/***/ },
/* 16 */
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
			return { userKey: null, password: null,
				loginFail: false };
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
		handleLoginFail: function () {
			console.log("handleLoginFail");
			this.setState({ loginFail: true });
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
					} else {
						this.handleLoginFail();
					}
				}).bind(this),
				error: (function (ehx, status, err) {
					console.log(this.props.url, status, err.toString());
				}).bind(this)
			});
		},
		render: function () {
			var loginFailMsg = null;
			if (this.state.loginFail) {
				loginFailMsg = React.createElement(
					"div",
					{ className: "login-fail" },
					React.createElement(
						"p",
						null,
						"Wrong username or password"
					)
				);
			}
			return React.createElement(
				"div",
				{ className: "login main tk-anonymous-pro" },
				React.createElement(
					"div",
					{ className: "login-user-area" },
					loginFailMsg,
					React.createElement(
						"form",
						{ className: "logInForm", onSubmit: this.handleNewKeySubmit },
						React.createElement("input", { type: "text",
							placeholder: "Username",
							value: this.state.userKey,
							onChange: this.handleNewKeyChange }),
						React.createElement("input", { type: "password",
							placeholder: "Password",
							value: this.state.userPasscode,
							onChange: this.handlePasswordChange }),
						React.createElement(
							"div",
							{ className: "login-button" },
							React.createElement("input", { type: "submit", value: "Login" })
						)
					)
				)
			);
		}
	});

	// <h2>Login</h2>
	// <p>
	// 	If you do not have a username and password, register for a new user <Link to="/register">here</Link>.
	// </p>

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = React.createClass({
		displayName: 'Register',

		contextTypes: {
			userKey: React.PropTypes.any,
			setUserKey: React.PropTypes.func,
			history: React.PropTypes.object
		},

		getInitialState: function () {
			return { username: null, pw: null, phone: null,
				registerFail: false, noUsername: false,
				noPhone: false };
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
		handlePhoneChange: function (e) {
			this.setState({ phone: e.target.value });
		},
		handleRegisterFail: function () {
			console.log("handleRegisterFail");
			this.setState({ registerFail: true });
		},
		handleNoUsername: function () {
			console.log("handleRegisterFail");
			this.setState({ noUsername: true });
		},
		handleNoPhone: function () {
			console.log("handlePhoneFail");
			this.setState({ noPhone: true });
		},
		handleNewKeySubmit: function (e) {
			e.preventDefault();
			var key;
			if (this.state.username) {
				key = this.state.username.trim();
			}

			var phone;
			if (this.state.phone) {
				phone = this.state.phone.trim();
			}

			if (!key) {
				this.handleNoUsername();
				return;
			}
			if (!phone) {
				this.handleNoPhone();
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
					} else {
						this.handleRegisterFail();
					}
				}).bind(this),
				error: (function (ehx, status, err) {
					console.log(this.props.url, status, err.toString());
				}).bind(this)
			});
		},
		render: function () {
			var registerFailMsg = null;
			if (this.state.registerFail) {
				registerFailMsg = React.createElement(
					"div",
					{ className: "login-fail" },
					React.createElement(
						"p",
						null,
						"This username is taken."
					)
				);
			} else if (this.state.noUsername) {
				registerFailMsg = React.createElement(
					"div",
					{ className: "login-fail" },
					React.createElement(
						"p",
						null,
						"Please enter a username."
					)
				);
			} else if (this.state.noPhone) {
				registerFailMsg = React.createElement(
					"div",
					{ className: "login-fail" },
					React.createElement(
						"p",
						null,
						"We need your phone number notify you of reponses."
					)
				);
			}
			return React.createElement(
				"div",
				{ className: "login main tk-anonymous-pro" },
				React.createElement(
					"div",
					{ className: "login-user-area" },
					registerFailMsg,
					React.createElement(
						"form",
						{ className: "logInForm", onSubmit: this.handleNewKeySubmit },
						React.createElement("input", { type: "text",
							placeholder: "Username",
							value: this.state.userKey,
							onChange: this.handleNewKeyChange }),
						React.createElement("input", { type: "password",
							placeholder: "Password",
							value: this.state.userPasscode,
							onChange: this.handlePasswordChange }),
						React.createElement("input", { type: "phone",
							placeholder: "Phone #",
							value: this.state.phone,
							onChange: this.handlePhoneChange }),
						React.createElement(
							"div",
							{ className: "login-button" },
							React.createElement("input", { type: "submit", value: "Register" })
						)
					)
				)
			);
		}
	});

	// <h2>Choose a username and password</h2>
	// <p>
	// 	This will remain anonymous.
	// </p>

/***/ }
/******/ ]);