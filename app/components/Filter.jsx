var React = require("react");

var Filter = React.createClass({

	handleFilter: function(){
		var searchTodo = this.refs.searchTodo.value;
		var showCompleted = this.refs.showCompleted.checked;

		this.props.onFilter(searchTodo, showCompleted);
	},

	render : function (){
		return (
			<div>
				<form role="form">
					<div className="form-group">
						<input type="text" className="form-control" ref="searchTodo" placeholder="Enter text to search." onChange={this.handleFilter}/>
					</div>
					<div className="checkbox">
						<label>
							<input type="checkbox" ref="showCompleted" onChange={this.handleFilter}/> Show completed
						</label>
					</div>
				</form>
			</div>
		);
	}
});


module.exports = Filter;