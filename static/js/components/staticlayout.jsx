var Header = require('./header')

module.exports = React.createClass({
	displayName: 'StaticLayout',

	contextTypes : {
		location : React.PropTypes.object
	},
	render: function() {
		var name = this.context.location.pathname
		
		var key = name.replace(/^\//, '')
		//.replace(/\//, '-') || ‘home’
		console.log("STATIC LAYOUT")
		console.log("layout-static page-" + key)
		return(
			<div className={"layout-static page-" + key}>
				<div className="container">
					<Header headerType="static"/> 
					{this.props.children}
				</div>
			</div>
		)
	}
});