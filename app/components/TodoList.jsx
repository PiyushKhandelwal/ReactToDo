var React = require("react");
var Todo = require("Todo");

var TodoList = React.createClass({
	render : function (){
		var {todoList, onToggle, onEdit, onDelete} = this.props;
		var renderTodos = function(){
			return todoList.map((todo)=>{
				return <Todo key={todo.id} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} {...todo} />;
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