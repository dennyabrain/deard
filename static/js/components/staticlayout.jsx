var Header = require('./header')

module.exports = React.createClass({
	displayName: 'StaticLayout',
	render: function() {
		return(
			<div className="layout-static">
				<div className="container">
					<Header /> 
					{this.props.children}
				</div>
			</div>
		)
	}
});