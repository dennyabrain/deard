module.exports = React.createClass({
	displayName: 'Register',

	contextTypes : {
		userKey : React.PropTypes.any,
		setUserKey : React.PropTypes.func,
		history : React.PropTypes.object
	},

	getInitialState: function() {
		return {username: null, pw: null, phone: null,
				registerFail: false, noUsername: false,
			    noPhone: false, badPhoneFormat: false,
				enteredNum: 0};
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
	handlePhoneChange: function(e) {

		this.setState({
					phone: e.target.value});
		//enteredNum: this.state.enteredNum + 1,
		// if (this.state.enteredNum == 3)
	},
	handleRegisterFail: function() {
		console.log("handleRegisterFail");
		this.setState({registerFail: true});
	},
	handleNoUsername: function() {
		console.log("handleRegisterFail");
		this.setState({noUsername: true});
	},
	handleNoPhone: function() {
		console.log("handlePhoneFail");
		this.setState({noPhone: true});
	},
	handleBadPhoneFormat: function() {
		console.log("handleBadPhoneFormat");
		this.setState({badPhoneFormat: true});
	},
	handleNewKeySubmit: function(e) {
		e.preventDefault();
		var key;
		var phoneRegex = "^(1\\-)?[0-9]{3}\\-?[0-9]{3}\\-?[0-9]{4}$";
		if (this.state.username){
			key = this.state.username.trim();
		}
		
		var phone;
		if (this.state.phone) {
			phone = this.state.phone.trim();
		} 
		console.log(phone);
		
		if (!key) {
			this.handleNoUsername();
			return;
		}
		if (!phone) {
			this.handleNoPhone();
			return;
		}
		if (!phone.match(phoneRegex)) {
			this.handleBadPhoneFormat();
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
				} else {
					this.handleRegisterFail();
				}	

			}.bind(this),
			error: function(ehx, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		var registerFailMsg = null;
		if (this.state.registerFail) {
			registerFailMsg = (
				<div className="login-fail">
					<p>This username is taken.</p>
				</div>
			);
		} else if (this.state.noUsername) {
			registerFailMsg = (
				<div className="login-fail">
					<p>Please enter a username.</p>
				</div>
			);
		} else if (this.state.noPhone) {
			registerFailMsg = (
				<div className="login-fail">
					<p>We need your phone number notify you of reponses.</p>
				</div>
			);
		} else if (this.state.badPhoneFormat) {
			registerFailMsg = (
				<div className="login-fail">
					<p>Please enter your phone # in this format 1234567890.</p>
				</div>
			);
		}
		return (
			<div className="login main tk-anonymous-pro">
				<div className="login-user-area">
					{registerFailMsg}
					<form className="logInForm" onSubmit={this.handleNewKeySubmit}>
						<input type="text"
						  placeholder="Username" 
						  value={this.state.userKey}
				  		  onChange={this.handleNewKeyChange} />
				  		<input type="password" 
						  placeholder="Password" 
						  value={this.state.userPasscode}
				  		  onChange={this.handlePasswordChange} />
				  		<input type="phone"
						  placeholder="Phone #" 
						  value={this.state.phone}
				  		  onChange={this.handlePhoneChange} />
						<div className="login-button">
							<input type="submit" value="Register" />
						</div>
					</form>
				</div>
			</div>
		)
	}
});

// <h2>Choose a username and password</h2>
// <p>
// 	This will remain anonymous.
// </p>
