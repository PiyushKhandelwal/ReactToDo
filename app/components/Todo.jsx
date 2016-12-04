var React = require("react");
var uuid = require('node-uuid');
var {RIETextArea} = require('riek');

var Todo = React.createClass({

	render : function (){
		var {id, task, completed, onToggle, onEdit, onDelete, onOpenModal, labels} = this.props;

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
					<span className="glyphicon glyphicon-option-vertical form-control-feedback" aria-hidden="true" onClick={() =>{
						onOpenModal(id);
					}}></span>
				</div>)
		 	}
		 };

		 var renderLabels = function(){
		 	return labels.map((label)=>{
		 		return <span key={uuid()} className="label custom-label" style={{backgroundColor: label}}></span>
		 	})
		 };

		return (
			<li className="list-group-item">
				{renderLabels()}
				{renderListItems()}
			</li>
		);
	}
});


module.exports = Todo;