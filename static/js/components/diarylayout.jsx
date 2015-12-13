var Header = require('./header')

module.exports = React.createClass({
	displayName: 'DiaryLayout',
	render: function() {
		return(
			<div className="container layout-diary">
				<Header logoIcon={true} showDate={true}/> 
				{this.props.children}
			</div>
		)
	}
});