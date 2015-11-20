// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var Component = React.createClass({
	render: function(){
		return <div>Hello {this.props.name}! </div>;
	}
});

React.render(<Component name="John" />, document.body);