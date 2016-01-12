var Header = require('./header')

module.exports = React.createClass({
	displayName: 'DiaryLayout',
	componentWillMount : function() {
	   $('body').addClass('userData-mounted');
	}, 
	componentWillUnMount : function() {
	   $('body').removeClass('userData-mounted');
	},
	render: function() {
		return(
			<div className="container layout-diary">
					
				{this.props.children}
			</div>
		)
	}
});