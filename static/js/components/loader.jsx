module.exports = React.createClass({
	displayName: 'Loader',

	render: function() {
		return (
			<div className="loader">
				<span className="star"><img src="/static/img/load-star-black.svg" width="18" height="18"/></span>
				<span className="star"><img src="/static/img/load-star-black.svg" width="15" height="15"/></span>
				<span className="star"><img src="/static/img/load-star-black.svg" width="12" height="12"/></span>
			</div>
		)
	}
});