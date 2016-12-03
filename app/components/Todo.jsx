var React = require("react");

var Todo = React.createClass({

	render : function (){
		var {id, task, completed, onToggle} = this.props;

		 var renderListItems = function(){
		 	if(completed){
		 		return (<div className="checkbox">
					<input type="checkbox" checked={completed} onClick={()=>{
						onToggle(id);
					}}/><s>{task}</s>
				</div>)
		 	}else{
		 		return (<div className="checkbox">
					<input type="checkbox" checked={completed} onClick={()=>{
						onToggle(id);
					}}/>{task}
				</div>)
		 	}
		 };

		return (
			<li className="list-group-item">
				{renderListItems()}
			</li>
		);
	}
});


module.exports = Todo;