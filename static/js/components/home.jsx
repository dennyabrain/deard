var Link = ReactRouter.Link

module.exports = React.createClass({
	displayName: 'Home',

	render: function() {
		return (
			<div className="home main">
				<div className="home-logo center">
					<img className="center" src="/static/img/key-black.svg" width="55"/>
					<img className="center" src="/static/img/logo-deard.svg" width="200"/>
				</div>
				<p className="center">
					Hey there, dear d. is a smart diary that responds to you and helps you track your mood.
				</p>
				<div className="home-phone-imgs">
					<img className="center" src="https://s3.amazonaws.com/deard-assets/static/img/home-phone1.png" width="70%" />
					<img className="center" src="https://s3.amazonaws.com/deard-assets/static/img/home-phone3.png" width="70%" />
					<img className="center" src="https://s3.amazonaws.com/deard-assets/static/img/home-phone2.png" width="70%" />
				</div>
				<Link to="/register"><button type="text" value="register"><h2>Sign up</h2></button></Link>
				<p className="center text-bottom">Get started by creating a new account.</p>
				<p className="home-footer-text center text-bottom">Made with {ReactEmoji.emojify("<3")} by <a href="http://fromjia.com">Jia</a> and <a href="">Denny</a></p>
			</div>
		)
	}
});

// <Link to="/register">
// 	<button className="tk-anonymous-pro">Create new account</button>
// </Link>

// Dear friend, dear d. is a smart diary that responds to you and let you track your mood. 
// Get started by creating a new account.