var React = require("react");

var Todo = React.createClass({
	render : function (){
		var {id, task} = this.props;
		return (
			<li className="list-group-item">{task}</li>
		);
	}
});


module.exports = Todo;