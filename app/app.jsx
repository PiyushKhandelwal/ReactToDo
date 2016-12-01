var React = require("react");
var ReactDOM = require("react-dom");
var TodoApp = require("TodoApp");

require('style!css!bootstrap/dist/css/bootstrap.min.css');
require('style!css!sass!public/css/app.scss');

ReactDOM.render(
	<TodoApp />,
	document.getElementById("root")
);