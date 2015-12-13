var Link = ReactRouter.Link

module.exports = React.createClass({
	displayName: 'Login',

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