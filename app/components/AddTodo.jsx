var React = require("react");

var AddTodo = React.createClass({

	addTodo: function(e) {
		e.preventDefault();
		var todo = this.refs.todotask.value;
		if(todo && todo.length>0){
			this.refs.todotask.value = "";
			this.props.onAddTodo(todo);
		}
	},

	render : function (){
		return (
			<form onSubmit={this.addTodo}>
				<div className="input-group">
					<input type="text" className="form-control" ref="todotask" placeholder="Enter Task"/>
					<span className="input-group-btn">
				        <button className="btn btn-default" type="button" onClick={this.addTodo}>Add!</button>
				    </span>
				</div>
			</form>
		);
	}
});


module.exports = AddTodo;