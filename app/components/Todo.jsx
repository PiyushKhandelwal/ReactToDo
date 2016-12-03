var React = require("react");
var {RIETextArea} = require('riek');

var Todo = React.createClass({

	render : function (){
		var {id, task, completed, onToggle, onEdit, onDelete} = this.props;

		 var renderListItems = function(){
		 	if(completed){
		 		return (<div className="checkbox">
					<input type="checkbox" checked={completed} onClick={()=>{
						onToggle(id);
					}}/><s>{task}</s>
					<span className="glyphicon glyphicon-trash form-control-feedback" aria-hidden="true" onClick={() =>{
						onDelete(id);
					}}></span>
				</div>)
		 	}else{
		 		return (<div className="checkbox">
					<input type="checkbox" checked={completed} onClick={()=>{
						onToggle(id);
					}}/><RIETextArea value={task} propName="task" validate={(task) => task.length>0} classInvalid="has-error" classEditing="form-control" change={(data)=>{
						onEdit(data, id);
					}}/>
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