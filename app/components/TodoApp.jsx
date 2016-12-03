var React = require("react");
var TodoList = require("TodoList");
var AddTodo = require("AddTodo");
var Filter = require("Filter");
var TodoApi = require("TodoApi");

var TodoApp = React.createClass({
	getInitialState: function(){
		return {
			showCompleted: TodoApi.getShowCompleted(),
			searchText : "",	
			todoList: TodoApi.getTodoList()
		}
	},

	componentDidUpdate: function(prevProps, prevState){
		TodoApi.setTodoList(this.state.todoList);
		TodoApi.setFilterCriteria(this.state.showCompleted, this.state.searchText);
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

	handleFilter: function(searchText, showCompleted){
		this.setState({
			showCompleted: showCompleted,
			searchText: searchText
		});
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
		var {showCompleted, searchText, todoList} = this.state;
		var filtteredTodoList = TodoApi.filterTodoList(todoList, showCompleted, searchText);
		return (
			<div className="container todo-app">
				<div className="panel panel-default">
					<div className="panel-heading">TODO App</div>
  					<div className="panel-body">
    					<AddTodo onAddTodo={this.handleAddTodo} />
  					</div>
    				<TodoList todoList={filtteredTodoList} onToggle={this.handleToggle}/>
    				<div className="panel-footer">
    					<Filter onFilter={this.handleFilter} showCompleted={showCompleted}/>
    				</div>
				</div>
			</div>
		);
	}
});


module.exports = TodoApp;