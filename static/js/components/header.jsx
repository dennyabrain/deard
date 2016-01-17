var Link = ReactRouter.Link

module.exports = React.createClass({
	displayName: 'Header',
	
	contextTypes: {
		showDate : React.PropTypes.any,
		userKey: React.PropTypes.any,
		setUserKey: React.PropTypes.func,
		week : React.PropTypes.any,
		setWeek : React.PropTypes.func
	},
	getInitialState: function() {
		return {headerStatus: "chat"};
	},
	changeHeader: function() {
		if (this.state.headerStatus == "chat")
			this.setState({headerStatus: "mood"});
		else if (this.state.headerStatus == "mood")
			this.setState({headerStatus: "chat"});
	},
	logout: function() {
		this.context.setUserKey(null);
	},
	render: function() {
		var month = new Array();
		month[0] = "Jan"; month[1] = "Feb"; 
		month[2] = "Mar"; month[3] = "Apr"; 
		month[4] = "May"; month[5] = "Jun"; 
		month[6] = "Jul"; month[7] = "Aug"; 
		month[8] = "Sep"; month[9] = "Oct"; 
		month[10] = "Nov"; month[11] = "Dec"; 
		//var m = month[this.props.date.getMonth()];
		//var d = this.props.date.getDate();
		//console.log("THIS PROPS DATE OBJECT")
		//console.log(this.props.date);
		var header, m, d;
		switch(this.props.headerType) {
		    case "static":
		    	header = <StaticHeader />;
		        break;
		    case "chat":
				m = month[this.props.date.getMonth()];
				d = this.props.date.getDate();
		        header = <ChatHeader headerType={this.state.headerStatus} month={m} date={d} changeHeader={this.changeHeader} />;
		        break;
	        case "mood":
	        	header = <ChatHeader headerType={this.props.headerType} changeHeader={this.changeHeader} 
	        				weekNum={this.props.showWeekNum} today={this.props.today} />;
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

	contextTypes: {
		week : React.PropTypes.any,
		setWeek : React.PropTypes.func
	},
	getInitialState: function() {
		return {headerStatus: this.props.headerType, 
				weekNum: this.props.weekNum,
				weekDate: this.props.today};
	},
	changeHeader: function() {
		if (this.state.headerStatus == "chat") {
			this.setState({headerStatus: "mood"});
		}
		else if (this.state.headerStatus == "mood")
			this.setState({headerStatus: "chat"});
	},
	backWeek: function() {
		//   /userstats?range=7&startdate=2015-12-01
		var oneWeekAgo = new Date();
		oneWeekAgo.setDate(this.state.weekDate.getDate() - 7);
		this.setState({weekDate: oneWeekAgo,
						weekNum: this.state.weekNum-1});
		var range = "?range=7&startdate=" +
						oneWeekAgo.getFullYear() + "-" +
						(oneWeekAgo.getMonth() + 1) + "-" +
						oneWeekAgo.getDate(); 
		this.context.setWeek(range, oneWeekAgo);
	},
	nextWeek: function() {
		var oneWeekLater = new Date();
		this.props.weekNum++;
		oneWeekLater.setDate(this.state.weekDate.getDate() + 7);
		this.setState({weekDate: oneWeekLater,
						weekNum: this.state.weekNum+1});
		var range = "?range=7&startdate=" +
						oneWeekLater.getFullYear() + "-" +
						(oneWeekLater.getMonth() + 1) + "-" +
						oneWeekLater.getDate(); 
		this.context.setWeek(range, oneWeekLater);
	},
	render: function() {
		
		if (this.state.weekDate) {
			var firstDay = new Date();
			firstDay.setDate(this.state.weekDate.getDate() - 7);
			var headerDate = (firstDay.getMonth()+1) +"/"+ firstDay.getDate() +" - "+ 
							(this.state.weekDate.getMonth()+1) +"/"+ this.state.weekDate.getDate();
			console.log("HEADER DATE: "+this.state.weekDate);
		}		
		


		return (
			<div className="row">
				{this.state.headerStatus == "mood" ? (
					<span>
						<div className="logo-d col-xs-2"></div>
						<div className="mood-title logo-d col-xs-8">	
							{ 
								this.state.weekNum == 0 ? (
									<div className="row">
										<div className="mood-back col-xs-2">
											<button onClick={this.backWeek}>back</button> 
										</div>
										<div className="center col-xs-8">
											<p>This week</p> 
										</div>					
										<div className="right col-xs-2" style={{backgroundColor: "transparent"}}></div>
									</div>
								)
								:
								(	<div className="row">
										<div className="mood-back col-xs-2">
											<button onClick={this.backWeek}>back</button> 
										</div>
										<div className="center col-xs-8">
											<p>{headerDate}</p>
										</div>
										<div className="mood-next col-xs-2">
											<button onClick={this.nextWeek}>next</button> 
										</div>
									</div>
								) 
							}				
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
								<img src="/static/img/data-icon2.svg" width="25" 
									onClick={this.changeHeader} />
							</Link>
						</div>
						<div className="logo-d col-xs-8">
							<p>{this.props.month} {this.props.date}</p>
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

