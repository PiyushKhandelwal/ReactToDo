var $ = require("jquery");
module.exports = {
	setTodoList: function(todoList){
		if($.isArray(todoList)){
			localStorage.setItem("todoList", JSON.stringify(todoList));
			return todoList;
		}
	},

	getTodoList: function(){
		var stringTodoList = localStorage.getItem("todoList");
		var todoList = [];
		try{
			todoList = JSON.parse(stringTodoList);
		}catch(e){

		}
		return $.isArray(todoList) ? todoList : [];
	}
}