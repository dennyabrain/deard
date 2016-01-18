var Link = ReactRouter.Link

module.exports = React.createClass({
	displayName: 'Home',

	render: function() {
		return (
			<div className="home main">
				<h2 className="tk-anonymous-pro">
					Hey there! Thanks for testing this out. 
					dear d. is a smart diary that responds to you. 
					Get started by creating a new account.
				</h2>
				<Link to="/register">
					<button className="tk-anonymous-pro">Create new account</button>
				</Link>
			</div>
		)
	}
});