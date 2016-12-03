var React = require("react");
var TodoList = require("TodoList");
var AddTodo = require("AddTodo");
var Filter = require("Filter");
var TodoApi = require("TodoApi");

var TodoApp = React.createClass({
	getInitialState: function(){
		return {
			todoList: TodoApi.getTodoList()
		}
	},

	componentDidUpdate: function(prevProps, prevState){
		TodoApi.setTodoList(this.state.todoList);
	},

	handleAddTodo: function(todo){
		this.setState({
			todoList: [
				{
					id: this.state.todoList.length + 1,
					task: todo,
					completed: false
				},
				...this.state.todoList
			]
		});
	},

	handleFilter: function(){

	},

	handleToggle: function(id){
		var updatedTodList = this.state.todoList.map((todo)=>{
			if(todo.id === id) todo.completed = !todo.completed;
			return todo;
		});
		this.setState({
			todoList : updatedTodList
		});
	},

	render : function (){
		return (
			<div className="container todo-app">
				<div className="panel panel-default">
					<div className="panel-heading">TODO App</div>
  					<div className="panel-body">
    					<AddTodo onAddTodo={this.handleAddTodo} />
  					</div>
    				<TodoList todoList={this.state.todoList} onToggle={this.handleToggle}/>
    				<div className="panel-footer">
    					<Filter onfilter={this.handleFilter}/>
    				</div>
				</div>
			</div>
		);
	}
});


module.exports = TodoApp;