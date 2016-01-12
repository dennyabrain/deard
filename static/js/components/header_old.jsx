var Link = ReactRouter.Link

module.exports = React.createClass({
	displayName: 'Header',
	
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
					<div className="title-data">
						{ this.props.showDate ?
							(<Link to="/comments/data">
								<img src="/static/img/data-icon.svg" width="25"/>
							</Link>
							) :
							""
						}
					</div>
					
					<div>
						{ this.props.logoIcon ?
							(	<span className="logo-d">
								<Link to="/comments">
									<img src="/static/img/logo-d.svg" width="30"/>
								</Link>
								</span>
							) :
							(	<span className="title">
									<img src="/static/img/key.svg" width="55"/>
									<img src="/static/img/logo-dear.svg" width="100"/>
									<img src="/static/img/logo-d-w.svg" width="22"/>
								</span>
							)
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

var StaticHeader = React.createClass({
	displayName: 'StaticHeader',

	render: function() {
		return (
			<span>
				<span className="title">
					<img src="/static/img/key.svg" width="55"/>
					<img src="/static/img/logo-dear.svg" width="100"/>
					<img src="/static/img/logo-d-w.svg" width="22"/>
				</span>
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
			</span>
		)
	}
});

var ChatHeader = React.createClass({
	displayName: 'ChatHeader',

	render: function() {
		return (
			<span>
				<span className="title">
					<img src="/static/img/key.svg" width="55"/>
					<img src="/static/img/logo-dear.svg" width="100"/>
					<img src="/static/img/logo-d-w.svg" width="22"/>
				</span>
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
			</span>
		)
	}
});

var MoodHeader = React.createClass({
	displayName: 'MoodHeader',

	render: function() {
		return (
			<span>
				<span className="title">
					<img src="/static/img/key.svg" width="55"/>
					<img src="/static/img/logo-dear.svg" width="100"/>
					<img src="/static/img/logo-d-w.svg" width="22"/>
				</span>
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
			</span>
		)
	}
});