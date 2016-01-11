var Link = ReactRouter.Link

module.exports = React.createClass({
	displayName: 'Header',
	
	contextTypes: {
		showDate : React.PropTypes.any,
		userKey: React.PropTypes.any,
		setUserKey: React.PropTypes.func
	},
	getInitialState: function() {
		return {headerStatus: "chat"};
	},
	changeHeader: function() {
		if (this.state.headerStatus == "chat")
			this.setState({headerStatus: "mood"});
		else if (this.state.headerStatus == "mood")
			this.setState({headerStatus: "chat"});
		//console.log("HEADER TYPE CHANGED!")
	},
	logout: function() {
		this.context.setUserKey(null);
	},
	render: function() {
		<header></header>
		var header;
		switch(this.props.headerType) {
		    case "static":
		    	header = <StaticHeader />;
		        break;
		    case "chat":
		        header = <ChatHeader headerType={this.state.headerStatus} date={this.props.date} changeHeader={this.changeHeader} />;
		        break;
	        case "mood":
	        	header = <ChatHeader headerType={this.props.headerType} changeHeader={this.changeHeader} />;
	        break;
		    default:
		    	header = "";
		}
	

		return (
			<header className="container">
				{header}
			</header>
		)

	}
});

var StaticHeader = React.createClass({
	displayName: 'StaticHeader',

	render: function() {
		return (
			<div className="row">
				<div className="title col-xs-8">
					<img src="/static/img/key.svg" width="55"/>
					<img src="/static/img/logo-dear.svg" width="100"/>
					<img src="/static/img/logo-d-w.svg" width="22"/>
				</div>

				<div className="col-xs-4">
					<div className="right header-login">
						<Link to="/register">new account</Link>
					</div> 
					<div className="right header-login">					
						<Link to="/login">login</Link>						
					</div>	
				</div>
			</div>
		)
	}
});

var ChatHeader = React.createClass({
	displayName: 'ChatHeader',

	getInitialState: function() {
		return {headerStatus: this.props.headerType};
	},
	changeHeader: function() {
		if (this.state.headerStatus == "chat")
			this.setState({headerStatus: "mood"});
		else if (this.state.headerStatus == "mood")
			this.setState({headerStatus: "chat"});
		console.log("HEADER TYPE CHANGED!")
		console.log(this.state.headerStatus);
	},
	render: function() {
		//console.log("header status: "+this.props.headerStatus);
		var date = this.props.date;
		console.log(date);
		return (
			<div className="row">
				{this.state.headerStatus == "mood" ? (
					<span>
						<div className="logo-d col-xs-10">
							<p>This week</p>					
						</div>
						<div className="right logo-d col-xs-2">
							<Link to="/comments">
								<img src="/static/img/logo-d.svg" width="30" onClick={this.changeHeader} />
							</Link>					
						</div>	
					</span>
				):
				(
					<span>
						<div className="title-data col-xs-2">
							<Link to="/comments/data">
								<img src="/static/img/data-icon.svg" width="25" 
									onClick={this.changeHeader} />
							</Link>
						</div>
						<div className="logo-d col-xs-8">
							<p>{date}</p>
						</div>
						<div className="right col-xs-2">
							<a href="/logout" onClick={this.logout}><img src="/static/img/logout.svg" width="10"/></a>					
						</div>	
					</span>
				)}
			</div>
		)
	}
});

