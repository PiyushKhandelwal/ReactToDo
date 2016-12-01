var React = require("react");
var Todo = require("Todo");

var TodoList = React.createClass({
	render : function (){
		var {todoList} = this.props;
		var renderTodos = function(){
			return todoList.map(function(todo){
				return <Todo key={todo.id} {...todo} />;
			});
		};

		return (
			<ul className="list-group">
				{renderTodos()}
			</ul>
		);
	}
});


module.exports = TodoList;