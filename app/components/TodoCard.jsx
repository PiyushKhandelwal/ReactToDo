var React = require("react");
var uuid = require('node-uuid');
var {RIEInput} = require('riek');

var TodoList = require("TodoList");
var AddTodo = require("AddTodo");
var Filter = require("Filter");
var TodoApi = require("TodoApi");

var TodoCard = React.createClass({

	handleAddTodo: function(todo){
		var {id, onAddTodo}= this.props;
		onAddTodo(todo, id);
	},

	handleFilter: function(searchText, showCompleted){
		var {id, onFilter}= this.props;
		onFilter(searchText, showCompleted, id);
	},

	handleToggle: function(childId){
		var {id, onToggle}= this.props;
		onToggle(id, childId);
	},

	handleDelete: function(childId){
		var {id, onDelete}= this.props;
		onDelete(id, childId);
	},

	handleEdit: function(data, childId){
		var {id, onEdit}= this.props;
		onEdit(data, id, childId);
	},

	changeCardName: function(data){
		var {id, onChangeCardName}= this.props;
		onChangeCardName(data, id);
	},

	handelOpenModal: function(childId){
		var {id, onOpenModal}= this.props;
		onOpenModal(id, childId);
	},

	render : function (){
		//var {showCompleted, searchText, todoList, cardName} = this.state;
		var {showCompleted, searchText, todoList, cardName, id} = this.props;
		var filtteredTodoList = TodoApi.filterTodoList(todoList, showCompleted, searchText);
		return (
			<div className="col-sm-3 col-md-6 col-lg-3">
				<div className="panel panel-default">
					<div className="panel-heading">
						<RIEInput value={cardName} propName="cardName" validate={(cardName) => cardName.length>0} classInvalid="has-error" classEditing="form-control"  change={this.changeCardName}/>
					</div>
  					<div className="panel-body">
    					<AddTodo onAddTodo={this.handleAddTodo} />
  					</div>
    				<TodoList todoList={filtteredTodoList} onToggle={this.handleToggle} onEdit={this.handleEdit} onDelete={this.handleDelete} onOpenModal={this.handelOpenModal} />
    				<div className="panel-footer">
    					<Filter onFilter={this.handleFilter} showCompleted={showCompleted}/>
    				</div>
				</div>
			</div>
		);
	}
});


module.exports = TodoCard;