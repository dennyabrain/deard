var Link = ReactRouter.Link

module.exports = React.createClass({
	displayName: 'Login',

	contextTypes : {
		userKey : React.PropTypes.any,
		setUserKey : React.PropTypes.func,
		history : React.PropTypes.object
	},

	getInitialState: function() {
		return {userKey: null, password: null, 
				loginFail: false};
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
	handleLoginFail: function() {
		console.log("handleLoginFail");
		this.setState({loginFail: true});
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
				} else {
					this.handleLoginFail();
				}

			}.bind(this),
			error: function(ehx, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		var loginFailMsg = null;
		if (this.state.loginFail) {
			loginFailMsg = (
				<div className="login-fail">
					<p>Wrong username or password</p>
				</div>
			);
		}
		return (
			<div className="login main tk-anonymous-pro">
				<div className="login-user-area">	
					{loginFailMsg}				
					<form className="logInForm" onSubmit={this.handleNewKeySubmit}>
						<input type="text" 
						  placeholder="Username" 
						  value={this.state.userKey}
				  		  onChange={this.handleNewKeyChange} />
				  		<input type="password" 
						  placeholder="Password" 
						  value={this.state.userPasscode}
				  		  onChange={this.handlePasswordChange} />
						<div className="login-button">
							<input type="submit" value="Login" />
						</div>
					</form>
				</div>
			</div>
		)
	}
});

// <h2>Login</h2>
// <p>
// 	If you do not have a username and password, register for a new user <Link to="/register">here</Link>.
// </p>