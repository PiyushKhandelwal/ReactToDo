var React = require("react");
var Modal = require('react-modal');
var {RIETextArea} = require('riek');
var {BlockPicker} = require('react-color');

var TodoModal = React.createClass({

	handleColorPicker : function(){
		var {isColorPickerOpen, onOpenColorPicker} = this.props;
		onOpenColorPicker(!isColorPickerOpen);
	},

	handleAddLabel: function(color){
		var {todo, card, onAddLabel} = this.props;
		onAddLabel(color.hex, card.id, todo.id);
	},

	renderColorPicker: function(){
		var {isColorPickerOpen} = this.props;
		const popover = {
	      position: 'absolute',
	      zIndex: '2',
	    }
	
		if(isColorPickerOpen) 
			return (<div style={ popover }>
			          <BlockPicker onChangeComplete={this.handleAddLabel}/>
			        </div>);
	},
	
	render : function (){
		var {isModalOpen, todo, card, onClose, onSave, onAddDescription} = this.props;
		var addDescription = function(data){
			onAddDescription(data.description, card.id, todo.id);
		};
		return (
			<Modal
		          className="Modal__Bootstrap modal-dialog"
		          closeTimeoutMS={150}
		          isOpen={isModalOpen}
		          onRequestClose={onClose}>
		          <div className="modal-content">
		            <div className="modal-header">
		              <button type="button" className="close" onClick={onClose}>
		                <span aria-hidden="true">&times;</span>
		                <span className="sr-only">Close</span>
		              </button>
		              <h4 className="modal-title">{todo.task}<small><h5>in list {card.cardName}</h5></small></h4>
		            </div>
		            <div className="modal-body">
		            	<div className="container-fluid">
		            		<div className="row">
		            			<div className="col-lg-10">
		            				<i className="glyphicon glyphicon-edit"></i>&nbsp;
		            				<RIETextArea value={todo.desc.length>0 ? todo.desc :"Add a description..."} 
		            					classEditing="form-control" 
		            					propName="description" change={addDescription}/>
		            			</div>
		            			<div className="col-lg-2">
		            				<div className="btn-group-vertical" role="group">
		            					<div className="btn-group">
			  								<button type="button" className="btn btn-default dropdown-toggle" onClick={this.handleColorPicker}><i className="glyphicon glyphicon-tag"></i> Labels<span class="caret"></span></button>
			  								{this.renderColorPicker()}
		            					</div>
			  							<button type="button" className="btn btn-default"><i className="glyphicon glyphicon-time"></i> Due Date</button>
									</div>
		            			</div>
		            		</div>
		            	</div>
		            </div>
		            <div className="modal-footer">
		              <button type="button" className="btn btn-default" onClick={onClose}>Close</button>
		              <button type="button" className="btn btn-primary" onClick={onSave}>Save changes</button>
		            </div>
		          </div>
			</Modal>
		);
	}
});


module.exports = TodoModal;