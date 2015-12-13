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
					<div className="title">
						{ this.props.logoIcon ?
							(<img src="/static/img/logo-d.svg" width="30"/>) :
							(	<span>
									<img src="/static/img/key.svg" width="55"/>
									<img src="/static/img/logo-dear.svg" width="100"/>
									<img src="/static/img/logo-d-w.svg" width="22"/>
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