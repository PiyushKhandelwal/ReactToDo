var $ = require("jquery");
module.exports = {
	setTodoCardList: function(todoCardList){
		if($.isArray(todoCardList)){
			localStorage.setItem("todoCardList", JSON.stringify(todoCardList));
			return todoCardList;
		}
	},

	getTodoCardList: function(){
		var stringTodoList = localStorage.getItem("todoCardList");
		var todoList = [];
		try{
			todoList = JSON.parse(stringTodoList);
		}catch(e){

		}
		return $.isArray(todoList) ? todoList : [];
	},

	removeAllCard:function(){
		localStorage.removeItem("todoCardList");
	},

	filterTodoList:function(todoList, showCompleted, searchText){
		var filteredTodoList = todoList;

		filteredTodoList = filteredTodoList.filter(function(todo){
			return !todo.completed || showCompleted;
		});

		filteredTodoList = filteredTodoList.filter(function(todo){
			return !searchText || (searchText.length >0 && todo.task.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
		});

		// show completed tasks towards end

		filteredTodoList.sort((a, b) => {
			if(!a.completed && b.completed){
				return -1;
			}else if(a.completed && !b.completed){
				return 1;
			}else{
				return 0;
			}
		});
		return filteredTodoList;
	},

	setFilterCriteria: function(showCompleted, searchText){
		if(typeof showCompleted === 'boolean'){
			localStorage.setItem("showCompleted", showCompleted+'');
		}
		if(typeof searchText === 'string'){
			localStorage.setItem("searchText", searchText);
		}
	},

	getShowCompleted: function(){
		var showCompleted = localStorage.getItem('showCompleted');
		if(typeof showCompleted === 'undefined') {
			return true;
		}
		return showCompleted === 'true';
	},

	setCardName: function(name){
		if(typeof name === 'string' && name.length>0){
			localStorage.setItem("cardName", name);
		}
	},

	getCardName: function(){
		var cardName = localStorage.getItem('cardName');
		return cardName || "TODO";
	}
}