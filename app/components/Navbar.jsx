var React = require("react");

var Navbar = React.createClass({
	render : function (){
		return (
			<nav className="navbar navbar-default" role="navigation">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#">Todo Dashboard</a>
					</div>
					<div className="collapse navbar-collapse navbar-ex1-collapse">
						<ul className="nav navbar-nav navbar-right">
							<li><a href="#" onClick={this.props.onAddTodoCard}>Add a card</a></li>
							<li><a href="#" onClick={this.props.onRemoveTodoCard}>Remove all cards</a></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
});


module.exports = Navbar;