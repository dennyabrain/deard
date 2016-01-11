
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var Router = ReactRouter.Router
var BrowserHistory = History.createHistory
var IndexRoute = ReactRouter.IndexRoute

var App = require('./components/app')
var DiaryLayout = require('./components/diarylayout')
var Content = require('./components/content')
var UserData = require('./components/userdata')
var StaticLayout = require('./components/staticlayout')
var Home = require('./components/home')
var Login = require('./components/login')
var Register = require('./components/register')
//var Header = require('./header')



ReactDOM.render((
	<Router history={BrowserHistory()}>
		<Route path="/" component={App}>
			<Route path="comments" component={DiaryLayout}>
				<IndexRoute component={Content} />
				<Route path="data" component={UserData} />
			</Route>
			<Route component={StaticLayout}>
				<IndexRoute component={Home} />
				<Route path="login" component={Login} />
				<Route path="register" component={Register} />
			</Route>
		</Route>
	</Router>
), document.getElementById('app'));

// <Route path="comments" component={DiaryLayout}>

