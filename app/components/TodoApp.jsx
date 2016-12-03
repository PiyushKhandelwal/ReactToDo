var React = require("react");
var uuid = require('node-uuid');
var {RIEInput} = require('riek');

var TodoList = require("TodoList");
var AddTodo = require("AddTodo");
var Filter = require("Filter");
var TodoApi = require("TodoApi");

var TodoApp = React.createClass({
	getInitialState: function(){
		return {
			cardName: TodoApi.getCardName(),
			showCompleted: TodoApi.getShowCompleted(),
			searchText : "",	
			todoList: TodoApi.getTodoList()
		}
	},

	componentDidUpdate: function(prevProps, prevState){
		TodoApi.setTodoList(this.state.todoList);
		TodoApi.setFilterCriteria(this.state.showCompleted, this.state.searchText);
		if(this.state.cardName !== prevState.cardName){
			TodoApi.setCardName(this.state.cardName);
		}
	},

	handleAddTodo: function(todo){
		this.setState({
			todoList: [
				{
					id: uuid(),
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

	handleDelete: function(id){
		var updatedTodList = this.state.todoList.filter((todo)=>{
			 return todo.id !== id;
		});
		this.setState({
			todoList : updatedTodList
		});

	},

	handleEdit: function(data, id){
		var updatedTodList = this.state.todoList.map((todo)=>{
			if(todo.id === id) todo.task = data.task;
			return todo;
		});
		this.setState({
			todoList : updatedTodList
		});
	},

	changeCardName: function(data){
		data.cardName && this.setState(data);
	},	

	render : function (){
		var {showCompleted, searchText, todoList, cardName} = this.state;
		var filtteredTodoList = TodoApi.filterTodoList(todoList, showCompleted, searchText);
		return (
			<div className="container todo-app">
				<div className="panel panel-default">
					<div className="panel-heading">
						<RIEInput value={cardName} propName="cardName" change={this.changeCardName}/>
					</div>
  					<div className="panel-body">
    					<AddTodo onAddTodo={this.handleAddTodo} />
  					</div>
    				<TodoList todoList={filtteredTodoList} onToggle={this.handleToggle} onEdit={this.handleEdit} onDelete={this.handleDelete} />
    				<div className="panel-footer">
    					<Filter onFilter={this.handleFilter} showCompleted={showCompleted}/>
    				</div>
				</div>
			</div>
		);
	}
});


module.exports = TodoApp;