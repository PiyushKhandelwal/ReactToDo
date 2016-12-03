var React = require("react");
var Todo = require("Todo");

var TodoList = React.createClass({
	render : function (){
		var {todoList, onToggle} = this.props;
		var renderTodos = function(){
			return todoList.map((todo)=>{
				return <Todo key={todo.id} onToggle={onToggle} {...todo} />;
			});
		};

		return (
			<ul className="list-group todo-app-body">
				{renderTodos()}
			</ul>
		);
	}
});


module.exports = TodoList;