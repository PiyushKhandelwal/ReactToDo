var React = require("react");
var uuid = require('node-uuid');
var TodoModal = require('TodoModal');
var TodoApi = require("TodoApi");
var TodoCard = require("TodoCard");
var Navbar = require("Navbar");

var TodoApp = React.createClass({

	getInitialState: function(){
		return {
			dashboard: "Dashboard",
			todoCardList: TodoApi.getTodoCardList(),
			modalOpen: "-1",
			colorPickerOpen: false
		}
	},

	componentDidUpdate: function(prevProps, prevState){
		TodoApi.setTodoCardList(this.state.todoCardList);
	},

	addCard:function(){
		this.setState({
			todoCardList : [
				{
					id:uuid(),
					cardName: "TODO",
					showCompleted: true,
					searchText : "",	
					todoList: []
				},
				...this.state.todoCardList
			]
		});
	},

	removeAllCard: function(){
		this.setState({
			todoCardList :[]
		});
		TodoApi.removeAllCard();
	},

	handleAddTodo:function(todo, parentId){
		var updateTodoCards = this.state.todoCardList.map((todoCard) => {
			if(todoCard.id === parentId) {
				todoCard.todoList = [
					{
						id: uuid(),
						task: todo,
						completed: false,
						labels:[],
						desc :"",
						parentId: parentId
					},
					...todoCard.todoList
				]
			}
			return todoCard;
		});
		this.setState({
			todoCardList: updateTodoCards
		});
	},

	handleFilter:function(searchText, showCompleted, parentId){
		var updateTodoCards = this.state.todoCardList.map((todoCard) => {
			if(todoCard.id === parentId) {
				todoCard.showCompleted =showCompleted;
				todoCard.searchText = searchText;
			}
			return todoCard;
		});
		this.setState({
			todoCardList: updateTodoCards
		});		
	},

	handleDelete : function(parentId, childId){
		var updateTodoCards = this.state.todoCardList.map((todoCard) => {
			if(todoCard.id === parentId) {
				todoCard.todoList = todoCard.todoList.filter((todo)=>{
					return todo.id !== childId;
				});
			}
			return todoCard;
		});
		this.setState({
			todoCardList: updateTodoCards
		});	
	},

	handleEdit : function(data, parentId, childId){
		var updateTodoCards = this.state.todoCardList.map((todoCard) => {
			if(todoCard.id === parentId) {
				todoCard.todoList = todoCard.todoList.map((todo)=>{
					if(todo.id === childId) todo.task = data.task;
					return todo;
				});
			}
			return todoCard;
		});
		this.setState({
			todoCardList: updateTodoCards
		});
	},

	handleToggle: function(parentId, childId){
		var updateTodoCards = this.state.todoCardList.map((todoCard) => {
			if(todoCard.id === parentId) {
				todoCard.todoList = todoCard.todoList.map((todo)=>{
					if(todo.id === childId) todo.completed = !todo.completed;
					return todo;
				});
			}
			return todoCard;
		});
		this.setState({
			todoCardList: updateTodoCards
		});
	},

	handleChangeCardName: function(data, parentId){
		var updateTodoCards = this.state.todoCardList.map((todoCard) => {
			if(todoCard.id === parentId) {
				todoCard.cardName = data.cardName;
			}
			return todoCard;
		});
		this.setState({
			todoCardList: updateTodoCards
		});
	},

	handleOpenModal: function(parentId, childId){
		this.setState({
			modalOpen : parentId +"_&&_" + childId
		});
	},

	renderModal: function(){
		var that =this;
		if(this.state.modalOpen === "-1") return;
		var modelId = this.state.modalOpen.split("_&&_");
		var selectedTodo = undefined;
		var selectedCard = undefined;

		this.state.todoCardList.map((todoCard) => {
			if(todoCard.id === modelId[0]) {
				selectedCard = todoCard;
				selectedTodo = todoCard.todoList.find((todo)=>{
					return todo.id === modelId[1];
				});
			}
		});

		var handleModalCloseRequest=function(){
			that.setState({
				modalOpen : "-1",
				colorPickerOpen: false
			})
		};

		var handleSaveClicked =function(){
			that.setState({
				modalOpen : "-1"
			})
		};

		var handleAddDescription = function(description, parentId, childId){
			var updateCardList = that.state.todoCardList.map((todoCard)=>{
				if(todoCard.id === parentId){
					todoCard.todoList = todoCard.todoList.map((todo)=>{
						if(todo.id === childId) todo.desc = description;
						return todo;
					});
				}
				return todoCard;
			});

			that.setState({
				todoCardList: updateCardList
			});
		};

		var handleColorPickerOpen = function(isOpen){
			that.setState({
				colorPickerOpen : isOpen
			});
		};

		var handleAddLabel = function (label, parentId, childId){
			var updateCardList = that.state.todoCardList.map((todoCard)=>{
				if(todoCard.id === parentId){
					todoCard.todoList = todoCard.todoList.map((todo)=>{
						if(todo.id === childId && !todo.labels.includes(label)) todo.labels.push(label);
						return todo;
					});
				}
				return todoCard;
			});

			that.setState({
				todoCardList: updateCardList
			});
		};

		if(!selectedTodo) return;

		return (
			<TodoModal isModalOpen={this.state.modalOpen !== "-1"} onClose={handleModalCloseRequest}
					onAddDescription={handleAddDescription} 
					onSave={handleSaveClicked} todo={selectedTodo} card={selectedCard} 
					isColorPickerOpen= {that.state.colorPickerOpen} onOpenColorPicker={handleColorPickerOpen} onAddLabel={handleAddLabel}/>
		)
	},

	renderTodoCards:function(){
		return this.state.todoCardList.map((todocard)=>{
			return <TodoCard key={todocard.id} {...todocard} onAddTodo={this.handleAddTodo} onFilter={this.handleFilter} 
						onDelete={this.handleDelete} onEdit={this.handleEdit} onToggle={this.handleToggle}
						onOpenModal={this.handleOpenModal} onChangeCardName={this.handleChangeCardName}/>
		});
	},

	render : function (){
		return (
			<div>
				<Navbar onAddTodoCard={this.addCard} onRemoveTodoCard ={this.removeAllCard}/>
				<div className="container-fluid">
					<div className="row">
						{this.renderTodoCards()}
					</div>
				</div>
				{this.renderModal()}
			</div>
		);
	}
});


module.exports = TodoApp;