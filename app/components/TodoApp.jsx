var React = require("react");
var TodoList = require("TodoList");
var AddTodo = require("AddTodo");

var TodoApp = React.createClass({
	getInitialState: function(){
		return {
			todoList: [
				
			]
		}
	},

	handleAddTodo: function(todo){
		this.setState({
			todoList: [
				{
					id: this.state.todoList.length + 1,
					task: todo
				},
				...this.state.todoList
			]
		});
	},

	render : function (){
		return (
			<div className="container todo-app">
				<div className="panel panel-default todo-app-body">
					<div className="panel-heading">TODO App</div>
  					<div className="panel-body">
    					<AddTodo onAddTodo={this.handleAddTodo} />
  					</div>
    				<TodoList todoList={this.state.todoList} />
				</div>
			</div>
		);
	}
});


module.exports = TodoApp;