// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var Component = React.createClass({
	displayName: 'Component',

	render: function () {
		return React.createElement(
			'div',
			null,
			'Hello ',
			this.props.name,
			'! '
		);
	}
});

React.render(React.createElement(Component, { name: 'John' }), document.body);